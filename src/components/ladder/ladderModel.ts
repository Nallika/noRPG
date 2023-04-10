import Db from "../../database/db";
import { ladderChar } from "./types";

const LIMIT = 20;

export const getLadder = (page: number): { ladder: ladderChar[], isFull: boolean, error: boolean } => {

  const db = Db.getInstance();
  const ofset = (page - 1) *  LIMIT;

  const { result: {count} } = db.get(`SELECT count(*) as count FROM Ladder`);
  const isFull = ofset + LIMIT >= count;

  const { result: ladder, error } = 
    db.all(
      `SELECT playerNick, name, raceId, score FROM Ladder ORDER BY score DESC LIMIT ${LIMIT} OFFSET ${ofset}`
    ) as unknown as {result: ladderChar[], error: boolean};;
    
  return {
    ladder,
    isFull,
    error
  }
}

export const addToLadder = (char: ladderChar & {characterId: number}): boolean => {
  const {
    characterId,
    name,
    nickname,
    raceId,
    score
  } = char;

  const db = Db.getInstance();

  const { changes } = db.run(
    'INSERT INTO Ladder (characterId, name, playerNick, raceId, score) VALUES (?, ?, ?, ?, ?)', characterId, name, nickname, raceId, score
  );

  return !changes;
}