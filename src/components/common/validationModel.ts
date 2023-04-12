import Db from "../../database/db";

const VALIDATION_MAP: {[key: string]: string} = {
  nick: 'Players',  
  email: 'Players',  
  name: 'Characters',  
}

export const validateField = (field: string, value: string): { result: boolean; error: boolean; } => {
  console.log('validateField ', {field, value});
  const tamleName = VALIDATION_MAP[field];

  if (!tamleName) {
    return {
      result: false,
      error: true
    }
  }

  const db = Db.getInstance();
  const { result, error } = db.get(`SELECT id FROM ${tamleName} WHERE ${field} = ?`, value);
  console.log('validateField result', result);
  return {
    result: result === undefined,
    error
  }
}