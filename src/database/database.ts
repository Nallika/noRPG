import { Pool } from 'pg';
import fs from 'node:fs';
import rootPath from 'app-root-path';
import path from 'node:path';

export const pool = new Pool({
  user: 'psyhodeal',
  host: 'localhost',
  database: 'norpg',
  password: 'fuckinJourney49',
  port: 5432,
});

async function executeSqlCommands(sqlCommands: string) {
  try {
    // Split the content by semicolon and filter out empty strings
    const commands = sqlCommands.split(';').filter((command) => command.trim());

    // Execute each command
    for (const command of commands) {
      await pool.query(command);
    }
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

export async function initDatabase() {
  const sqlCommands = fs.readFileSync(path.resolve(rootPath.path, 'src/database/init.sql'), "utf-8");
  await executeSqlCommands(sqlCommands);
}
