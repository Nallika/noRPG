import Db from "../../database/db";
import { ladderChar } from "./types";

export const getLadder = (): { result: any | null; error: boolean } => {

  const db = Db.getInstance();
  const { result, error } = db.all('SELECT playerNick, name, score FROM Ladder ORDER BY score DESC');
//   const { result: characters, error: charError } = db.all('SELECT * FROM Characters');
//   const { result: stat, error: statError } = db.all('SELECT * FROM CharacterStats');
//   const { result: calc, error: calcError } = db.all('SELECT * FROM CharacterCalculations');

// console.log('RESULTTT ', {
//   characters,
//   stat,
//   calc
// });

  return {
    result,
    error
  }
}

export const addToLadder = (char: ladderChar & {characterId: number}): boolean => {
  const {
    characterId,
    name,
    playerNick,
    raceId,
    score
  } = char;

  const db = Db.getInstance();
  const { changes } = db.run(
    'INSERT INTO Ladder (characterId, name, playerNick, raceId, score) VALUES (?, ?, ?, ?, ?)', characterId, name, playerNick, raceId, score
  );

  return !changes;
}