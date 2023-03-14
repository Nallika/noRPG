import Db from './db';
import { addNewPlayer } from '../components/player/playerModel';
import { addNewCharacter } from '../components/character/charModel';
import { charData } from '../components/character/types';

export const fillBaseTables = (): void  => {
  const db = Db.getInstance();
  db.run('INSERT INTO Weapons (title, minDamage, maxDamage, hitMultiplier) VALUES (?, ?, ?, ?)', 'Sword', 1, 5, 1.1);
  db.run('INSERT INTO Weapons (title, minDamage, maxDamage, hitMultiplier) VALUES (?, ?, ?, ?)', 'Mace', 3, 5, 0.8);
  db.run('INSERT INTO Weapons (title, minDamage, maxDamage, hitMultiplier) VALUES (?, ?, ?, ?)', 'Spear', 2, 4, 1);
  db.run('INSERT INTO Armor (title, armor, dodgeMultiplier) VALUES (?, ?, ?)', 'Light', 5, 1.2);
  db.run('INSERT INTO Armor (title, armor, dodgeMultiplier) VALUES (?, ?, ?)', 'Medium', 10, 0.8);
  db.run('INSERT INTO Armor (title, armor, dodgeMultiplier) VALUES (?, ?, ?)', 'Heavy', 20, 0.5);
  db.run(
    `INSERT INTO Races (title, minHeight, maxHeight, minWeight, maxWeight, minEdgeBMI, maxEdgeBMI, initialStrength, initialEndurance , initialAgility, initialspeed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  , 'Human', 150, 210, 50, 200, 20, 30, 1, 1, 3, 2
  );
  db.run(
    `INSERT INTO Races (title, minHeight, maxHeight, minWeight, maxWeight, minEdgeBMI, maxEdgeBMI, initialStrength, initialEndurance , initialAgility, initialspeed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  , 'Elf', 150, 250, 50, 200, 15, 25, 1, 1, 3, 2
  );
  db.run(
    `INSERT INTO Races (title, minHeight, maxHeight, minWeight, maxWeight, minEdgeBMI, maxEdgeBMI, initialStrength, initialEndurance , initialAgility, initialspeed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  , 'Orc', 150, 210, 50, 250, 20, 25, 1, 1, 3, 2
  );
  db.run(
    `INSERT INTO Races (title, minHeight, maxHeight, minWeight, maxWeight, minEdgeBMI, maxEdgeBMI, initialStrength, initialEndurance , initialAgility, initialspeed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  , 'Dwarf', 120, 175, 50, 200, 15, 40, 1, 1, 3, 2
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
    strength: randomIntFromInterval(1, 10),
    agility: randomIntFromInterval(1, 10),
    endurance: randomIntFromInterval(1, 10),
    speed: randomIntFromInterval(1, 10),
  }
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
