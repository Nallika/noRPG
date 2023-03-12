import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Db from "../../database/db";

export const addNewPlayer = async (nickname: string, email: string, password: string): Promise<{ result: any; error: boolean; }> => {

  const encryptedPassword = await bcrypt.hash(password, 10);

  const token = jwt.sign(
    { nickname, email },
    'fo28390fhjw',
    {
      expiresIn: "2h",
    }
  );

  const db = Db.getInstance();
  const { changes, lastInsertRowid, error } = db.run(
    'INSERT INTO Players (nick, email, password, token) VALUES (?, ?, ?, ?)',
    nickname,
    email.toLowerCase(),
    encryptedPassword,
    token
  );

  return {
    result: {
      nickname,
      token
    },
    error
  }
}

export const loginPlayer = async (email: string, password: string): Promise<{ result: any; error: boolean }> => {

  const db = Db.getInstance();
  const { result, error } = db.get(
    'SELECT id FROM Players WHERE email = ? AND password = ?',
    email, password
  );

  return {
    result,
    error
  }
}