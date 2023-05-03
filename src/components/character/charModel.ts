import { pool } from '../../database/database';
import { addToLadder } from '../ladder/ladderModel';
import { addNewCharResult, charData } from './types';
import { scoreCalculator } from '../scoreCalculator/scoreCalculator';
import { validateCharacterData } from './characterValidator';
import { getRaces } from '../game/racesModel';
import { race } from '../game/types';
import Character from './Character';

export const addNewCharacter = async (charData: charData, player: {id: number, nickname: string}): Promise<addNewCharResult> => {

  const { races } = await getRaces();
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
    const { rowCount, rows } = await pool.query(
      `INSERT INTO Characters (
        player_id,
        name,
        race_id,
        weapon_id,
        armor_id,
        height,
        weight,
        strength,
        agility,
        stamina,
        speed
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
      [ playerId, name, raceId, weaponId, armorId, height, weight, strength, agility, stamina, speed ]
    );

    if (rowCount === 0) {
      errorMessage = 'Char insert error';
    }

    charId = rows[0].id;
  
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

  const result = addToLadder({
    playerNick: nickname,
    name,
    raceId,
    score,
    characterId: charId
  });

  if (!result) {
    errorMessage = 'Error when add character to ladder';

    if (charId) {
      deleteCharacter(charId);
    }

    return {
      error: errorMessage
    }
  }

  return {
    result: {
      character: char.getOutput(),
      score
    }
  }
}

const deleteCharacter = async (charId: number): Promise<void> => {
  try {
    await pool.query(`DELETE FROM CharacterStats WHERE character_id = ${charId}`);
    await pool.query(`DELETE FROM Characters WHERE id = ${charId}`);
  } catch (error) {
    console.error(`Error when delete character ${error}`);
  }
  
}