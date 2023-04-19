import { raceEnum } from "../types/gameTypes";

export const raceMock_1 = {
  id: 1,
  title: raceEnum.Human,
  minWeight: 50,
	maxWeight: 200,
	minHeight: 150,
	maxHeight: 220,
	initialStrength: 2,
	initialEndurance: 1,
	initialAgility: 4,
	initialSpeed: 3,
  description: 'Human is human',
}

export const raceMock_2 = {
  id: 2,
  title: raceEnum.Elf,
  minWeight: 50,
	maxWeight: 200,
	minHeight: 150,
	maxHeight: 220,
	initialStrength: 1,
	initialEndurance: 2,
	initialAgility: 3,
	initialSpeed: 4,
  description: 'Elf is high',
}

export const characterMock = {
  raceId: 1,
  height: 200,
  weight: 100,
  strength: 8,
  agility: 8,
  stamina: 8,
  speed: 8,
  name: 'Aragorn',
  armorId: 1,
  weaponId: 1
}

export const characterStatMock = {
  strength: 6,
  agility: 6,
  stamina: 6,
  speed: 6,
}

export const changedCharacterStatMock = {
  strength: 7,
  agility: 7,
  stamina: 7,
  speed: 7,
}

export const resultCharacterMock = {
  name: 'Aragorn',
  weapon: 'Sword',
  armor: 'Medium armor',
  race: 'Human',
  height: 190,
  weight: 100,
  damage: '25-32',
  dodgeChanse: 25,
  health: 150,
  hitChanse: 68,
  initiative: 6,
  mitigation: 15,
  ...characterStatMock,
};

export const armorMock = {
  id: 1,
  title: 'Heavy armor',
  description: 'Heavy armor is heavy',
  armorValue: 20,
};

export const weaponMock = {
  id: 1,
  title: 'Sword',
  description: 'Sword is sharp',
  minDamage: 2,
	maxDamage: 4,
};

export const getLadderMock = (part: string) => 
  Array.from({length: 20}, (_, index) => ({
    name: `char-${part}-${index}`,
    playerNick: `player-${part}-${index}`,
    raceId: '1',
    score: 100+index
  }));