import { pool } from "../../database/database";

const VALIDATION_MAP: {[key: string]: string} = {
  nick: 'Players',  
  email: 'Players',  
  name: 'Characters',  
}

export const validateField = async (field: string, value: string): Promise<{ result: boolean }> => {

  try {
    const tamleName = VALIDATION_MAP[field];

    if (!tamleName) {
      return {
        result: false
      }
    }

    const { rows } = await pool.query(`SELECT id FROM ${tamleName} WHERE ${field} = $1`, [value]);

    return {
      result: rows.length === 0
    }
  } catch (error) {
    console.error(`Error whe try to validate field ${field}, ${error}`);
    return {
      result: false
    }
  }
}