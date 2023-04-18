import { pool } from '../../database/database';
import { ladderChar } from "./types";

const LIMIT = 20;

export const getLadder = async (page: number): Promise<{ ladder: ladderChar[]; isFull: boolean; error: string; }> => {
  try {
    const offset = (page - 1) *  LIMIT;

    const { rows } = await pool.query(`SELECT count(*) as count FROM Ladder`);

    const isFull = offset + LIMIT >= Number(rows[0].count);

    const { rows: ladder } = await pool.query(
      `SELECT player_nick as "playerNick", name, race_id as "raceId", score FROM Ladder ORDER BY score DESC LIMIT ${LIMIT} OFFSET ${offset}`
    ) as unknown as {rows: ladderChar[]};

      
    return {
      ladder,
      isFull,
      error: ''
    }
  } catch (error) {
    console.error(`Error whe try to load ladder, ${error}`);

    return {
      ladder: [],
      isFull: false,
      error: 'Load ladder error'
    }
  }
}

export const addToLadder = async (char: ladderChar & {characterId: number}): Promise<boolean> => {

  const {
    characterId,
    name,
    playerNick,
    raceId,
    score
  } = char;

  const { rowCount } = await pool.query(
    'INSERT INTO Ladder (character_id, name, player_nick, race_id, score) VALUES ($1, $2, $3, $4, $5)',
    [ characterId, name, playerNick, raceId, score ]
  );

  return rowCount > 0;
}