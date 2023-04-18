-- Players table
CREATE TABLE IF NOT EXISTS players (
	id SERIAL PRIMARY KEY,
	nick VARCHAR(40) UNIQUE,
	email VARCHAR(40) UNIQUE,
	token VARCHAR(512),
	password VARCHAR(256)
);

-- Races table
CREATE TABLE IF NOT EXISTS races (
	id SERIAL PRIMARY KEY,
	title VARCHAR(40) UNIQUE,
	description VARCHAR(256),
	min_weight INTEGER,
	max_weight INTEGER,
	min_height INTEGER,
	max_height INTEGER,
	min_edge_bmi INTEGER,
	max_edge_bmi INTEGER,
	initial_strength INTEGER,
	initial_endurance INTEGER,
	initial_agility INTEGER,
	initial_speed INTEGER
);

-- Weapons table
CREATE TABLE IF NOT EXISTS weapons (
	id SERIAL PRIMARY KEY,
	title VARCHAR(40) UNIQUE,
	description VARCHAR(256),
	min_damage INTEGER,
	max_damage INTEGER,
	base_hit INTEGER
);

-- Armor table
CREATE TABLE IF NOT EXISTS armor (
	id SERIAL PRIMARY KEY,
	title VARCHAR(40) UNIQUE,
	description VARCHAR(256),
	armor_value INTEGER,
	base_dodge INTEGER
);

-- Characters table
CREATE TABLE IF NOT EXISTS characters (
	id SERIAL PRIMARY KEY,
	player_id INTEGER,
	name VARCHAR(40) UNIQUE,
	create_date TIMESTAMP DEFAULT NOW(),
	race_id INTEGER,
	weapon_id INTEGER,
	armor_id INTEGER,
	weight INTEGER,
	height INTEGER,
	strength INTEGER,
	stamina INTEGER,
	agility INTEGER,
	speed INTEGER,

	FOREIGN KEY (player_id) REFERENCES players(id),
	FOREIGN KEY (race_id) REFERENCES races(id),
	FOREIGN KEY (weapon_id) REFERENCES weapons(id),
	FOREIGN KEY (armor_id) REFERENCES armor(id)
);

-- Ladder table
CREATE TABLE IF NOT EXISTS ladder (
	id SERIAL PRIMARY KEY,
	character_id INTEGER,
	player_nick VARCHAR(40),
	name VARCHAR(40) UNIQUE,
	race_id INTEGER,
	score INTEGER,

	FOREIGN KEY (race_id) REFERENCES races(id),
	FOREIGN KEY (character_id) REFERENCES characters(id)
);
