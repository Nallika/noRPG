PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS Players (
	id INTEGER PRIMARY KEY ASC,
	nick VARCHAR(40) UNIQUE,
	email VARCHAR(40) UNIQUE,
	token VARCHAR(40),
	password VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS Races (
	id INTEGER PRIMARY KEY ASC,
	title VARCHAR(40) UNIQUE,
	description VARCHAR(40),
	minWeight INTEGER,
	maxWeight INTEGER,
	minHeight INTEGER,
	maxHeight INTEGER,
	minEdgeBMI INTEGER,
	maxEdgeBMI INTEGER,
	initialStrength INTEGER,
	initialEndurance INTEGER,
	initialAgility INTEGER,
	initialspeed INTEGER
);

CREATE TABLE IF NOT EXISTS Weapons (
	id INTEGER PRIMARY KEY ASC,
	title VARCHAR(40) UNIQUE,
	description VARCHAR(40),
	minDamage INTEGER,
	maxDamage INTEGER,
	hitMultiplier INTEGER
);

CREATE TABLE IF NOT EXISTS Armor (
	id INTEGER PRIMARY KEY ASC,
	title VARCHAR(40) UNIQUE,
	description VARCHAR(40),
	armorValue INTEGER,
	dodgePenalty INTEGER
);

CREATE TABLE IF NOT EXISTS Characters (
	id INTEGER PRIMARY KEY ASC,
	playerId INTEGER,
	name VARCHAR(40) UNIQUE,
	createDate TEXT DEFAULT (datetime('now','localtime')),
	raceId INTEGER,
	weaponId INTEGER,
	armorId INTEGER,
	weight INTEGER,
	height INTEGER,
	strength INTEGER,
	endurance INTEGER,
	agility INTEGER,
	speed INTEGER,

	FOREIGN KEY (playerId) REFERENCES Players(id),
	FOREIGN KEY (raceId) REFERENCES Races(id),
	FOREIGN KEY (weaponId) REFERENCES Weapons(id),
	FOREIGN KEY (armorId) REFERENCES Armor(id)
);

CREATE TABLE IF NOT EXISTS Ladder (
	id INTEGER PRIMARY KEY ASC,
	characterId INTEGER,
	playerNick VARCHAR(40),
	name VARCHAR(40) UNIQUE,
	raceId INTEGER,
	score INTEGER,

  FOREIGN KEY (raceId) REFERENCES Races(id),
	FOREIGN KEY (characterId) REFERENCES Characters(id)
);