import Db from '../../database/db';
import { addToLadder } from '../ladder/ladderModel';
import Character from './Character';
import { addNewCharResult, charData } from './types'

export const addNewCharacter = (data: charData & { playerId: number, playerNick: string }): addNewCharResult => {

  const { playerId, playerNick, name } = data;
  const char = new Character(data);

  const {isValid, error: validationError} = char.validate();

  if (!isValid) {
    return {
      error: validationError
    }
  }

  const {
    raceId,
    weaponId,
    armorId,
    height,
    weight,
    strength,
    agility,
    endurance,
    speed,
    health,
    mitigation,
    hitChanse,
    dodgeChanse,
    damage: {minDamage, maxDamage}
  } = char.getCharData();

  let errorMessage = '';
  let charId = 0;

  try {
    const db = Db.getInstance();

    const { changes: characterChanges, lastInsertRowid: characterId } = db.run(
      'INSERT INTO Characters (playerId, name) VALUES (?, ?)',
      playerId, name
    );
  
    if (!characterId || !characterChanges) {
      errorMessage = 'Char insert error';
    }

    charId = characterId;
  
    const { changes: statChanges, error: statError } = db.run(
      `INSERT INTO CharacterStats (
        characterId,
        raceId,
        weaponId,
        armorId,
        height,
        weight,
        strength,
        agility,
        endurance,
        speed)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        characterId,
        raceId,
        weaponId,
        armorId,
        height,
        weight,
        strength,
        agility,
        endurance,
        speed
    );
  
    if (!statChanges) {
      errorMessage = `Char stat insert error ${statError}`;
    }
  
    const { changes: calcChanegs, error: calcError } = db.run(
      `INSERT INTO CharacterCalculations 
       (characterId,
        health,
        hitChanse,
        dodgeChanse,
        minDamage,
        maxDamage,
        mitigation)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
        characterId,
        health,
        mitigation,
        hitChanse,
        dodgeChanse,
        minDamage,
        maxDamage,
    );

    if (!calcChanegs) {
      errorMessage = `Char calcs insert error ${calcError}`;
    }
  } catch (error) {
      console.error(`Error when add character ${error}`);
      if (charId) {
        deleteCharacter(charId);
      }
  }

  if (!!errorMessage) {
    if (charId) {
      deleteCharacter(charId);
    }

    return {
      error: errorMessage
    }
  }

  const rating = char.rating;

  addToLadder({
    playerNick,
    name,
    raceId,
    score: rating,
    characterId: charId
  });

  return {
    character: char.getCharData(),
    rating
  }
}

const deleteCharacter = (charId: number): void => {
  try {
    const db = Db.getInstance();

    const { changes: calculationsChanges } = db.run(`DELETE FROM CharacterCalculations WHERE characterId = ${charId}`);
    const { changes: statsChanges } = db.run(`DELETE FROM CharacterStats WHERE characterId = ${charId}`);
    const { changes: characterChanges } = db.run(`DELETE FROM Characters WHERE id = ${charId}`);
  } catch (error) {
    console.error(`Error when delete character ${error}`);
  }
  
}