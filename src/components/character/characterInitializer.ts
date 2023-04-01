import { getItems } from "../game/itemsModel";
import { getRaces } from "../game/racesModel";
import { armor, race, weapon } from "../game/types";
import Character from "./Character";
import { charData } from "./types";

export const characterInitializer = (charData: charData): Character => {

  // TODO ADD CACHE !!!!!!!!
  const { races } = getRaces();
  const race = races.find(({id}) => id === charData.raceId) as race;

  const { weapons, armor: armorList } = getItems();
  const weapon = weapons.find(({id}) => id === charData.weaponId) as weapon;
  const armor = armorList.find(({id}) => id === charData.armorId) as armor;

  return new Character({...charData, race, weapon, armor});
}