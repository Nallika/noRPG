import Db from "../../database/db";
import { armor, weapon } from "./types";

export const getItems = (): { weapons: weapon[]; armor: armor[]; error: boolean } => {

  const db = Db.getInstance();
  const { result: weapons, error: weaponsError } = db.all('SELECT id, title, minDamage, maxDamage, description FROM Weapons') as unknown as {result: weapon[], error: boolean};
  const { result: armor, error: armorError } = db.all('SELECT id, title, armorValue, description  FROM Armor') as unknown as {result: armor[], error: boolean};

  return {
    weapons,
    armor,
    error: weaponsError || armorError
  }
}