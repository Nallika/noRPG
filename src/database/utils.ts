import { pool } from './database';

export const fillBaseTables = async (): Promise<void>  => {
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

  try {
    await pool.query('INSERT INTO Weapons (title, min_damage, max_damage, base_hit, description) VALUES ($1, $2, $3, $4, $5)', 
      ['Unarmed', 1, 2, 60, weaponDescriptions[0]]);
    await pool.query('INSERT INTO Weapons (title, min_damage, max_damage, base_hit, description) VALUES ($1, $2, $3, $4, $5)',
      ['Sword', 1, 5, 50, weaponDescriptions[1]]);
    await pool.query('INSERT INTO Weapons (title, min_damage, max_damage, base_hit, description) VALUES ($1, $2, $3, $4, $5)',
      ['Mace', 3, 5, 40, weaponDescriptions[2]]);
    await pool.query('INSERT INTO Weapons (title, min_damage, max_damage, base_hit, description) VALUES ($1, $2, $3, $4, $5)',
      ['Spear', 2, 4, 45, weaponDescriptions[3]]);

    await pool.query('INSERT INTO Armor (title, armor_value, base_dodge, description) VALUES ($1, $2, $3, $4)',
      ['No armor', 0, 30, armorDescriptions[0]]);
    await pool.query('INSERT INTO Armor (title, armor_value, base_dodge, description) VALUES ($1, $2, $3, $4)',
      ['Light', 5, 20, armorDescriptions[1]]);
    await pool.query('INSERT INTO Armor (title, armor_value, base_dodge, description) VALUES ($1, $2, $3, $4)',
      ['Medium', 10, 10, armorDescriptions[2]]);
    await pool.query('INSERT INTO Armor (title, armor_value, base_dodge, description) VALUES ($1, $2, $3, $4)',
      ['Heavy', 20, 5, armorDescriptions[3]]);

    await pool.query(
      `INSERT INTO Races (title, min_height, max_height, min_weight, max_weight, min_edge_bmi, max_edge_bmi, initial_strength, initial_endurance , initial_agility, initial_speed, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`
    , ['Human', 160, 210, 50, 200, 20, 30, 2, 1, 4, 3, raceDescription[0]]
    );
    await pool.query(
      `INSERT INTO Races (title, min_height, max_height, min_weight, max_weight, min_edge_bmi, max_edge_bmi, initial_strength, initial_endurance , initial_agility, initial_speed, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`
    , ['Elf', 180, 250, 50, 200, 15, 25, 1, 2, 3, 4, raceDescription[1]]
    );
    await pool.query(
      `INSERT INTO Races (title, min_height, max_height, min_weight, max_weight, min_edge_bmi, max_edge_bmi, initial_strength, initial_endurance , initial_agility, initial_speed, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`
    , ['Orc', 140, 210, 50, 200, 20, 28, 4, 3, 1, 2, raceDescription[2]]
    );
    await pool.query(
      `INSERT INTO Races (title, min_height, max_height, min_weight, max_weight, min_edge_bmi, max_edge_bmi, initial_strength, initial_endurance , initial_agility, initial_speed, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`
    , ['Dwarf', 130, 180, 50, 180, 18, 35, 3, 4, 2, 1, raceDescription[3]]
    );
  } catch (error) {
    console.error('ERROR WHEN FILL GAME DATA ')
  }
}