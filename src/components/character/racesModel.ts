import Db from "../../database/db";
import { race } from "./types";

export const getRaces = (): { races: race[]; error: boolean } => {

  const db = Db.getInstance();
  const { result: races, error } = db.all(
    `SELECT id, title, minWeight, maxWeight, minHeight, maxHeight, initialStrength, initialEndurance,
     initialAgility, initialspeed, description FROM Races GROUP BY title`
  ) as unknown as {result: race[], error: boolean};;

  return {
    races,
    error
  }
}