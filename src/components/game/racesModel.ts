import { pool } from '../../database/database';
import { race } from './types';

export const getRaces = async (): Promise<{ races: race[]; error: string; }> => {
  try {
    const { rows: races } = await pool.query(
      `SELECT id, title, min_weight as 'minWeight', max_weight as 'maxWeight', min_height as 'minHeight', max_height as 'maxHeight', 
       min_edge_bmi as 'minEdgeBMI', max_edge_bmi as 'maxEdgeBMI', initial_strength as 'initialStrength', 
       initial_endurance as 'initialEndurance', initial_agility as 'initialAgility', initial_speed as 'initialSpeed', description 
       FROM Races`
    ) as unknown as {rows: race[]};

    return {
      races,
      error: ''
    }
  } catch (error) {
    console.error(`Error whe try to load races, ${error}`);

    return {
      races: [],
      error: 'Load game data error'
    }
  }
}