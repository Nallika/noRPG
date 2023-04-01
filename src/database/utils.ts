import Db from './db';
import { addNewPlayer } from '../components/player/playerModel';

export const fillBaseTables = (): void  => {
  const weaponDescriptions = [
    'With bare hands damage isn\'t good, but hit chance is the best',
    'Sword have better hit chanse that other weapons',
    'Mace have worst hit chance',
    'Spear has average hit chance',
  ];

  const armorDescriptions = [
    'Character receive bonus to dodge',
    'Light armor grant less damage reducion, but doesn\'t have big dodge penalty',
    'Medium armor grant less average damage reducion and dodge penalty',
    'Heavy armor grant best average damage reducion, but also huge dodge penalty',
  ];

  const raceDescription = [
    'Human is dexterous but vulnerable',
    'Elf fast but not weak',
    'Orc strong, but clumsy',
    'Dwarf tough, but slow',
  ];

  const db = Db.getInstance();
  db.run('INSERT INTO Weapons (title, minDamage, maxDamage, hitMultiplier, description) VALUES (?, ?, ?, ?, ?)', 'Unarmed', 1, 2, 1.5, weaponDescriptions[0]);
  db.run('INSERT INTO Weapons (title, minDamage, maxDamage, hitMultiplier, description) VALUES (?, ?, ?, ?, ?)', 'Sword', 1, 5, 1.1, weaponDescriptions[1]);
  db.run('INSERT INTO Weapons (title, minDamage, maxDamage, hitMultiplier, description) VALUES (?, ?, ?, ?, ?)', 'Mace', 3, 5, 0.8, weaponDescriptions[2]);
  db.run('INSERT INTO Weapons (title, minDamage, maxDamage, hitMultiplier, description) VALUES (?, ?, ?, ?, ?)', 'Spear', 2, 4, 1, weaponDescriptions[3]);
  
  db.run('INSERT INTO Armor (title, armorValue, dodgePenalty, description) VALUES (?, ?, ?, ?)', 'No armor', 0, 1.2, armorDescriptions[0]);
  db.run('INSERT INTO Armor (title, armorValue, dodgePenalty, description) VALUES (?, ?, ?, ?)', 'Light', 5, 0.8, armorDescriptions[1]);
  db.run('INSERT INTO Armor (title, armorValue, dodgePenalty, description) VALUES (?, ?, ?, ?)', 'Medium', 10, 0.6, armorDescriptions[2]);
  db.run('INSERT INTO Armor (title, armorValue, dodgePenalty, description) VALUES (?, ?, ?, ?)', 'Heavy', 20, 0.3, armorDescriptions[3]);
  db.run(
    `INSERT INTO Races (title, minHeight, maxHeight, minWeight, maxWeight, minEdgeBMI, maxEdgeBMI, initialStrength, initialEndurance , initialAgility, initialspeed, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  , 'Human', 160, 210, 50, 200, 20, 30, 2, 1, 4, 3, raceDescription[0]
  );
  db.run(
    `INSERT INTO Races (title, minHeight, maxHeight, minWeight, maxWeight, minEdgeBMI, maxEdgeBMI, initialStrength, initialEndurance , initialAgility, initialspeed, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  , 'Elf', 180, 250, 50, 200, 15, 25, 1, 2, 3, 4, raceDescription[1]
  );
  db.run(
    `INSERT INTO Races (title, minHeight, maxHeight, minWeight, maxWeight, minEdgeBMI, maxEdgeBMI, initialStrength, initialEndurance , initialAgility, initialspeed, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  , 'Orc', 140, 210, 50, 200, 20, 28, 4, 3, 1, 2, raceDescription[2]
  );
  db.run(
    `INSERT INTO Races (title, minHeight, maxHeight, minWeight, maxWeight, minEdgeBMI, maxEdgeBMI, initialStrength, initialEndurance , initialAgility, initialspeed, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  , 'Dwarf', 130, 180, 50, 180, 18, 35, 3, 4, 2, 1, raceDescription[3]
  );
}

export const fillPlayers = (): void  => {
  addNewPlayer('joy1', 'joy1@gmail.com', 'fuck111');
}

export const listPlayers = (): void  => {
  const db = Db.getInstance();
  const {result: players} = db.all('SELECT * FROM Players');

  console.log(players);
}
