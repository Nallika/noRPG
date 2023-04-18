import { Pool, PoolConfig } from 'pg';
import { parse } from 'pg-connection-string';
import fs from 'node:fs';
import rootPath from 'app-root-path';
import path from 'node:path';

const config = parse(process.env.DATABASE_URL as string);

export const pool = new Pool(config as PoolConfig);

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
