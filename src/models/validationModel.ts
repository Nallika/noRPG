import Db from "../database/db";

const VALIDATION_MAP: {[key: string]: string} = {
  nick: 'Players',  
  email: 'Players',  
  name: 'Characters',  
}

export const validateField = (item: {[key: string]: string}): { result: boolean; error: boolean; } => {
  const field = Object.keys(item)[0];
  const value = item[field];
  const tamleName = VALIDATION_MAP[field];

  if (!tamleName) {
    return {
      result: false,
      error: true
    }
  }

  const db = Db.getInstance();
  const { result, error } = db.get(`SELECT id FROM ${tamleName} WHERE ${field} = ?`, value);

  return {
    result: result === undefined,
    error
  }
}