import { pool } from '../../database/database';
import { armor, weapon } from './types';

export const getItems = async (): Promise<{ weapons: weapon[]; armor: armor[]; error: string; }> => {
  try {
    const { rows: weapons } = 
      await pool.query(`SELECT id, title, min_damage as 'minDamage', max_damage as 'maxDamage', base_hit as 'baseHit', description FROM Weapons`) as unknown as {rows: weapon[]};
  
    const { rows: armor } = 
        await pool.query(`SELECT id, title, armor_value as 'armorValue', base_dodge as 'baseDodge', description FROM Armor`) as unknown as {rows: armor[]};

    return {
      weapons,
      armor,
      error: ''
    }
  } catch (error) {
    console.error(`Error whe try to load items, ${error}`);

    return {
      weapons: [],
      armor: [],
      error: 'Load game data error'
    }
  }
}
