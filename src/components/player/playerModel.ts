import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { pool } from '../../database/database';
import { player } from './types';

/**
 * Inser player in db
 */
export const addNewPlayer = async (nickname: string, email: string, password: string): Promise<{ player: player | null; error: string; }> => {

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const { rows } = await pool.query(
      'INSERT INTO Players (nick, email, password) VALUES ($1, $2, $3) RETURNING id',
     [ nickname, email.toLowerCase(), encryptedPassword ]
    );

    const { token } = await saveToken(rows[0].id, nickname);
  
    return {
      player: {
        nickname,
        token
      },
      error: ''
    }
  } catch (error) {
    console.error(`Error whe try to register player, ${error}`);

    return {
      player: {} as player,
      error: 'Registration error, please check data'
    }
  }
  
}

/**
 * Login player with provided credentials, return player nick and token, or error
 */
export const loginPlayer = async (email: string, password: string): Promise<{ player: player; error: string }> => {
  try {
    const { rows } = await pool.query('SELECT id, password, nick FROM Players WHERE email = $1', [email]);
  
    if (!rows.length) {
      return {
        player: {nickname: '', token: ''},
        error: 'Player not found'
      }
    }

    const hashPassword = rows[0].password as string;
    const isPassRight = bcrypt.compare(password, hashPassword);
  
    if (!isPassRight) {
      return {
        player: {nickname: '', token: ''},
        error: 'Email and pass didn\'t match, check data'
      } 
    }
  
    const { nick: nickname, id } = rows[0] as {nick: string, id: number};
    const { token } = await saveToken(id, nickname);
  
    return {
      player: {nickname, token},
      error: ''
    }
  } catch (error) {
    console.error(`Error whe try to login player, ${error}`);

    return {
      player: {nickname: '', token: ''},
      error: 'Unexpected error occured'
    }
  }
  
}

/**
 * Autenticate player by provided token, return  player nick and new generated token, or error
 */
export const authPlayer = async (token: string): Promise<{ player: player; error: string; }> => {
  try {
    const { nickname, id } = jwt.verify(token, process.env.TOKEN_KEY as string) as { nickname: string, id: number};
    const { token: newToken, error } = await saveToken(id, nickname);

    if (error) {
      throw new Error('Save token error');
    }

    return {
      player: {nickname, token: newToken},
      error: ''
    }
  } catch (error) {
    console.error(`Error whe try to authenticate player, ${error}`);

    return {
      player: {nickname: '', token: ''},
      error: 'Authentication error'
    }
  }
}

/**
 * Save token to player table
 */
const saveToken = async (id: number, nickname: string): Promise<{ token: string; error: boolean; }> => {
  try {
    const token = jwt.sign({ id, nickname }, process.env.TOKEN_KEY as string);

    const { rowCount } = await pool.query('UPDATE Players SET token = $1 WHERE id = $2', [token, id]);

    if (rowCount > 0) {
      return {
        token,
        error: false
      };
    }

    return {
      token: '',
      error: true
    }

  } catch (error) {
    console.error(`Error whe try to save token for player, ${error}`);

    return {
      token: '',
      error: true
    }
  }
}
