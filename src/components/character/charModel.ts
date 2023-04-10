import Db from '../../database/db';
import { addToLadder } from '../ladder/ladderModel';
import { addNewCharResult, charData } from './types';
import { scoreCalculator } from '../scoreCalculator/scoreCalculator';
import { validateCharacterData } from './characterValidator';
import { getRaces } from '../game/racesModel';
import { race } from '../game/types';
import Character from './Character';

export const addNewCharacter = async (charData: charData, player: {id: number, nickname: string}): Promise<addNewCharResult> => {

  const { races } = getRaces();
  const race = races.find(({id}) => id === charData.raceId) as race;

  const { isValid, error: validationError } = validateCharacterData(charData, race);

  if (!isValid) {
    return {
      error: validationError
    }
  }

  const { id: playerId, nickname } = player;

  const char = new Character(charData);
  await char.init();

  const {
    name,
    raceId,
    weaponId,
    armorId,
    height,
    weight,
    strength,
    agility,
    stamina,
    speed,
  } = charData;

  let errorMessage = '';
  let charId = 0;

  try {
    const db = Db.getInstance();

    const { changes: characterChanges, lastInsertRowid: characterId } = db.run(
      `INSERT INTO Characters (
        playerId,
        name,
        raceId,
        weaponId,
        armorId,
        height,
        weight,
        strength,
        agility,
        stamina,
        speed
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      playerId,
      name,
      raceId,
      weaponId,
      armorId,
      height,
      weight,
      strength,
      agility,
      stamina,
      speed,
    );
  
    if (!characterChanges) {
      errorMessage = 'Char insert error';
    }

    charId = characterId;
  
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

  const score = scoreCalculator(char);

  addToLadder({
    nickname,
    name,
    raceId,
    score,
    characterId: charId
  });

  return {
    result: {
      character: char.getOutput(),
      score
    }
  }
}

const deleteCharacter = (charId: number): void => {
  try {
    const db = Db.getInstance();

    db.run(`DELETE FROM CharacterStats WHERE characterId = ${charId}`);
    db.run(`DELETE FROM Characters WHERE id = ${charId}`);
  } catch (error) {
    console.error(`Error when delete character ${error}`);
  }
  
}