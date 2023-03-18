import Db from './db';
import { addNewPlayer } from '../components/player/playerModel';
import { addNewCharacter } from '../components/character/charModel';
import { charData } from '../components/character/types';

export const fillBaseTables = (): void  => {
  const weaponDescriptions = [
    'Sword have better hit chanse that other weapons',
    'Mace have worst hit chance',
    'Spear has average hit chance',
  ];

  const armorDescriptions = [
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
  db.run('INSERT INTO Weapons (title, minDamage, maxDamage, hitMultiplier, description) VALUES (?, ?, ?, ?, ?)', 'Sword', 1, 5, 1.1, weaponDescriptions[0]);
  db.run('INSERT INTO Weapons (title, minDamage, maxDamage, hitMultiplier, description) VALUES (?, ?, ?, ?, ?)', 'Mace', 3, 5, 0.8, weaponDescriptions[1]);
  db.run('INSERT INTO Weapons (title, minDamage, maxDamage, hitMultiplier, description) VALUES (?, ?, ?, ?, ?)', 'Spear', 2, 4, 1, weaponDescriptions[2]);
  db.run('INSERT INTO Armor (title, armorValue, dodgeMultiplier, description) VALUES (?, ?, ?, ?)', 'Light', 5, 1.2, armorDescriptions[0]);
  db.run('INSERT INTO Armor (title, armorValue, dodgeMultiplier, description) VALUES (?, ?, ?, ?)', 'Medium', 10, 0.8, armorDescriptions[1]);
  db.run('INSERT INTO Armor (title, armorValue, dodgeMultiplier, description) VALUES (?, ?, ?, ?)', 'Heavy', 20, 0.5, armorDescriptions[2]);
  db.run(
    `INSERT INTO Races (title, minHeight, maxHeight, minWeight, maxWeight, minEdgeBMI, maxEdgeBMI, initialStrength, initialEndurance , initialAgility, initialspeed, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  , 'Human', 150, 210, 50, 200, 20, 30, 2, 1, 4, 3, raceDescription[0]
  );
  db.run(
    `INSERT INTO Races (title, minHeight, maxHeight, minWeight, maxWeight, minEdgeBMI, maxEdgeBMI, initialStrength, initialEndurance , initialAgility, initialspeed, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  , 'Elf', 150, 250, 50, 200, 15, 25, 1, 2, 3, 4, raceDescription[1]
  );
  db.run(
    `INSERT INTO Races (title, minHeight, maxHeight, minWeight, maxWeight, minEdgeBMI, maxEdgeBMI, initialStrength, initialEndurance , initialAgility, initialspeed, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  , 'Orc', 150, 210, 50, 250, 20, 25, 4, 3, 1, 2, raceDescription[2]
  );
  db.run(
    `INSERT INTO Races (title, minHeight, maxHeight, minWeight, maxWeight, minEdgeBMI, maxEdgeBMI, initialStrength, initialEndurance , initialAgility, initialspeed, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  , 'Dwarf', 120, 175, 50, 200, 15, 40, 3, 4, 2, 1, raceDescription[3]
  );
}

export const fillPlayers = (): void  => {
  addNewPlayer('Ivan', 'ivan@test.com', '1111');
  addNewPlayer('Petro', 'petro@test.com', '1111');
  addNewPlayer('Inga', 'inga@test.com', '1111');
}

export const listPlayers = (): void  => {
  const db = Db.getInstance();
  const {result: players} = db.all('SELECT * FROM Players');

  console.log(players);
}

export const fillCharacters = (): void  => {

  addNewCharacter({
    playerId: 1,
    playerNick: 'Ivan',
    ...generateChar('killerJoe'),
  });
  addNewCharacter({
    playerId: 1,
    playerNick: 'Ivan',
    ...generateChar('joker'),
  });
  addNewCharacter({
    playerId: 2,
    playerNick: 'Petro',
    ...generateChar('SuperSatan'),
  });
  addNewCharacter({
    playerId: 2,
    playerNick: 'Ivan',
    ...generateChar('killa')
  });
  addNewCharacter({
    playerId: 3,
    playerNick: 'Inga',
    ...generateChar('Dolly'),
  });
  addNewCharacter({
    playerId: 3,
    playerNick: 'Ivan',
    ...generateChar('casper'),
  });
}

const generateChar = (name: string): charData => {
  return {
    name,
    raceId: randomIntFromInterval(1, 4),
    weaponId: randomIntFromInterval(1, 3),
    armorId: randomIntFromInterval(1, 3),
    height: randomIntFromInterval(150, 175),
    weight: randomIntFromInterval(50, 200),
    strength: randomIntFromInterval(3, 7),
    agility: randomIntFromInterval(3, 7),
    endurance: randomIntFromInterval(3, 7),
    speed: randomIntFromInterval(3, 7),
  }
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
