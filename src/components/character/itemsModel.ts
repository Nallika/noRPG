import Db from "../../database/db";

export const getItems = (): { weapons: any; armor: any; error: boolean } => {

  const db = Db.getInstance();
  const { result: weapons, error: weaponsError } = db.all('SELECT id, title FROM Weapons');
  const { result: armor, error: armorError } = db.all('SELECT id, title  FROM Armor');

  return {
    weapons,
    armor,
    error: weaponsError || armorError
  }
}