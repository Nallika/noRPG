import Db from "../../database/db";

export const getRaces = (): { races: any; error: boolean } => {

  const db = Db.getInstance();
  const { result: races, error } = db.all('SELECT id, title, minWeight, maxWeight, initialStrength, initialEndurance, initialAgility, initialspeed FROM Races GROUP BY title');

  return {
    races,
    error
  }
}