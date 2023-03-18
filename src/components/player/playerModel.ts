import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Db from "../../database/db";
import { player } from './types';

export const addNewPlayer = async (nickname: string, email: string, password: string): Promise<{ player: player | null; error: boolean; }> => {

  const encryptedPassword = await bcrypt.hash(password, 10);

  const db = Db.getInstance();
  const { changes, lastInsertRowid, error } = db.run(
    'INSERT INTO Players (nick, email, password) VALUES (?, ?, ?)',
    nickname,
    email.toLowerCase(),
    encryptedPassword,
  );

  if (changes && lastInsertRowid) {
    const { token } = saveToken(lastInsertRowid, nickname);

    return {
      player: {
        nickname,
        token
      },
      error: false
    }
  }

  return {
    player: null,
    error
  }
}

export const loginPlayer = async (email: string, password: string): Promise<{ player: player; error: boolean }> => {

  const db = Db.getInstance();

  const { result, error } = db.get('SELECT id, password, nick FROM Players WHERE email = ?', email);

  const hashPassword = result?.password as string;

  const isPassRight = bcrypt.compare(password, hashPassword);

  if (!result || error || !isPassRight) {
    return {
      player: {nickname: '', token: ''},
      error: true
    } 
  }

  const { nick: nickname, id } = result as {nick: string, id: number};
  const { token } = saveToken(id, nickname);

  return {
    player: {nickname, token},
    error: false
  }
}

export const authPlayer = (token: string): { player: player; error: boolean } => {
  try {
    const { nickname, id } = jwt.verify(token, process.env.TOKEN_KEY as string) as { nickname: string, id: number};
    const { token: newToken, error } = saveToken(id, nickname);

    if (error) {
      throw new Error("Save token error");
    }

    return {
      player: {nickname, token: newToken},
      error
    }
  } catch (error) {
    console.error(`Can't autenticate player ${error}`);

    return {
      player: {nickname: '', token: ''},
      error: true
    }
  }
}

const saveToken =  (id: number, nickname: string): {token: string, error: boolean} => {
  const token = jwt.sign({ id, nickname }, process.env.TOKEN_KEY as string);

  const db = Db.getInstance();
  const { changes, error } = db.run('UPDATE Players SET token = ? WHERE id = ?', token, id);

  if (error || !changes) {
    console.error(`Can't save token for user ${nickname} (id: ${id}), probaly it's wrong or ${error && error}`);

    return {
      token: '',
      error: true
    }
  }

  return {
    token,
    error: false
  };
}
