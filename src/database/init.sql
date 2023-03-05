PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS Players (
	id INTEGER PRIMARY KEY ASC,
	nick VARCHAR(40) UNIQUE,

	email VARCHAR(40) UNIQUE,
	password VARCHAR(40) UNIQUE
);

CREATE TABLE IF NOT EXISTS Races (
	id INTEGER PRIMARY KEY ASC,
	title VARCHAR(40) UNIQUE,

	minWeight INTEGER,
	maxWeight INTEGER,

	minHeight INTEGER,
	maxHeight INTEGER,

	initialStrength INTEGER,
	initialEndurance INTEGER,
	initialAgility INTEGER,
	initialInitiative INTEGER
);

CREATE TABLE IF NOT EXISTS Weapons (
	id INTEGER PRIMARY KEY ASC,
	title VARCHAR(40) UNIQUE,

	minDamage INTEGER,
	maxDamage INTEGER
);

CREATE TABLE IF NOT EXISTS Armor (
	id INTEGER PRIMARY KEY ASC,
	title VARCHAR(40) UNIQUE,

	armor INTEGER
);

CREATE TABLE IF NOT EXISTS Characters (
	id INTEGER PRIMARY KEY ASC,
	playerId INTEGER,
	name VARCHAR(40) UNIQUE,

	raceId INTEGER,
	weaponId INTEGER,
	armorId INTEGER,

	age INTEGER,
	weight INTEGER,
	height INTEGER,

	strength INTEGER,
	endurance INTEGER,
	agility INTEGER,
	initiative INTEGER,

	health INTEGER,
	hitChanse INTEGER,
	dodgeChanse INTEGER,
	minDamage INTEGER,
	maxDamage INTEGER,

	createDate TEXT DEFAULT (datetime('now','localtime')),

	FOREIGN KEY (playerId) REFERENCES Players(id),
	FOREIGN KEY (raceId) REFERENCES Races(id),
	FOREIGN KEY (weaponId) REFERENCES Weapons(id),
	FOREIGN KEY (armorId) REFERENCES Armor(id)
);