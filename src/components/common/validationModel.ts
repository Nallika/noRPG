import { pool } from '../../database/database';

const VALIDATION_MAP: {[key: string]: string} = {
  nick: 'Players',  
  email: 'Players',  
  name: 'Characters',  
}

/**
 * Validate is field exist in databse,
 * If return true then field isn't exist and validation success, false otherwise
 */
export const validateUniqField = async (field: string, value: string): Promise<{ result: boolean }> => {

  try {
    const tamleName = VALIDATION_MAP[field];

    if (!tamleName) {
      return {
        result: false
      }
    }

    const { rowCount } = await pool.query(`SELECT id FROM ${tamleName} WHERE ${field} = $1`, [value]);

    return {
      result: rowCount === 0
    }
  } catch (error) {
    return {
      result: false
    }
  }
}