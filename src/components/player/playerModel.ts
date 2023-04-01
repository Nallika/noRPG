import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Db from '../../database/db';
import { player } from './types';

/**
 * Inser player in db
 */
export const addNewPlayer = async (nickname: string, email: string, password: string): Promise<{ player: player | null; error: boolean; }> => {

  const encryptedPassword = await bcrypt.hash(password, 10);

  const db = Db.getInstance();
  const { lastInsertRowid, error } = db.run(
    'INSERT INTO Players (nick, email, password) VALUES (?, ?, ?)',
    nickname,
    email.toLowerCase(),
    encryptedPassword,
  );

  if (error) {
    return {
      player: null,
      error
    }
  }

  const { token } = saveToken(lastInsertRowid, nickname);

  return {
    player: {
      nickname,
      token
    },
    error: false
  }
}

/**
 * Login player with provided credentials, return player nick and token, or error
 */
export const loginPlayer = async (email: string, password: string): Promise<{ player: player; error: string }> => {

  const db = Db.getInstance();
  const { result, error } = db.get('SELECT id, password, nick FROM Players WHERE email = ?', email);

  if (!result) {
    return {
      player: {nickname: '', token: ''},
      error: 'Player not found'
    } 
  }

  const hashPassword = result?.password as string;
  const isPassRight = bcrypt.compare(password, hashPassword);

  if (error || !isPassRight) {
    return {
      player: {nickname: '', token: ''},
      error: 'Email and pass didn\'t match, check data'
    } 
  }

  const { nick: nickname, id } = result as {nick: string, id: number};
  const { token } = saveToken(id, nickname);

  return {
    player: {nickname, token},
    error: ''
  }
}

/**
 * Autenticate player by provided token, return  player nick and new generated token, or error
 */
export const authPlayer = (token: string): { player: player; error: boolean } => {
  try {
    const { nickname, id } = jwt.verify(token, process.env.TOKEN_KEY as string) as { nickname: string, id: number};
    const { token: newToken, error } = saveToken(id, nickname);

    if (error) {
      throw new Error('Save token error');
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

/**
 * Save token to player table
 */
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
