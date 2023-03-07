import Db from "../../database/db";
import { calculateSecodaryStats } from "./charCalculations";
import { validateChar } from "./charValidation";
import { char, fullChar } from '../../types/types'

export const addNewCharacter = (data: char & { playerId: number }): {result: fullChar | null; error: string} => {

  const { isValid, error: validationError } = validateChar(data);

  if (!isValid) {
    return {
      result: null,
      error: validationError
    }
  }

  const {
    playerId,
    name,
    raceId,
    weaponId,
    armorId,
    height,
    weight,
    strength,
    agility,
    endurance,
    speed,
  } = data;

  const secondaryStats = calculateSecodaryStats(data);

  const {
    health,
    hitChanse,
    damage: {minDamage, maxDamage},
    dodgeChanse,
    mitigation,
  } = secondaryStats

  const db = Db.getInstance();

  const { changes, lastInsertRowid: characterId } = db.run(
    'INSERT INTO Characters (playerId, name) VALUES (?, ?)',
    playerId, name
  );

  if (!characterId) {
    return {
      result: null,
      error: 'Char insert error'
    }
  }

  const { lastInsertRowid: statId } = db.run(
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

  if (!statId) {
    return {
      result: null,
      error: 'Char stat insert error'
    }
  }

  const { lastInsertRowid: calcId } = db.run(
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

  if (!calcId) {
    return {
      result: null,
      error: 'Char calcs insert error'
    }
  }

  return {
    result: {
      ...data,
      ...secondaryStats
    },
    error: ''
  }
}