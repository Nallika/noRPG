import fs from 'node:fs';
import Database from 'better-sqlite3';
import rootPath from 'app-root-path';
import path from 'node:path';

export const TYPES_MAP: {[key: string]: string | string[];} = {
  number: 'INTEGER',
  string: ['VARCHAR', 'TEXT']
}

class Db {
  static instance: any;
  private db: any;

  static getInstance(): Db {
    if (!Db.instance) {
      Db.instance = new Db();
    }

    return Db.instance;
  }

  public init(): void {
    this.db = new Database(path.resolve(rootPath.path, 'src/database/database.db'), { verbose: console.log });
  }

  private fillDatabase(): void {
    const initSql = fs.readFileSync(path.resolve(rootPath.path, 'src/database/init.sql'), "utf-8");
    this.db.exec(initSql);
    this.run('INSERT INTO Weapons (title, minDamage, maxDamage) VALUES (?, ?, ?)', 'Sword', 1, 5);
    this.run('INSERT INTO Armor (title, armor) VALUES (?, ?)', 'Light', 1);
    this.run(
      `INSERT INTO Races (title, minHeight, maxHeight, minWeight, maxWeight, initialStrength, initialEndurance , initialAgility, initialspeed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    , 'Human', 150, 210, 50, 200, 1, 1, 3, 2
    );
  }

  private getStatement(sqlComand: string): any {
    try {
      return this.db.prepare(sqlComand);
    } catch (error) {
      console.error(`Error "${error}" when create statement from "${sqlComand}"`);
      return null;
    }
  }

  public run(sqlComand: string, ...data: any): {changes: number, lastInsertRowid: number, error: boolean } {
    const statement = this.getStatement(sqlComand);
    const errorResult = {
      changes: 0,
      lastInsertRowid: 0,
      error: true
    };

    if (!statement) {
      return errorResult;
    }

    try {
      const {changes, lastInsertRowid} = statement.run(...data);

      return { changes, lastInsertRowid, error: false};
    } catch (error) {
      console.error(`Error: "${error}" when run command "${sqlComand}", with attrs: ${data}`);

      return errorResult;
    }
  }

  public get(sqlComand: string, ...data: any): {result: {[key: string]: string | number;}, error: boolean } {
    const statement = this.getStatement(sqlComand);
    const errorResult = {
      result: {'': ''},
      error: true
    };

    if (!statement) {
      return errorResult;
    }

    try {
      const result = statement.get(data);

      return { result, error: false};
    } catch (error) {
      console.error(`Error "${error}" when get from database command "${sqlComand}", with attrs: ${data}`);

      return errorResult;
    }
  }

  public all(sqlComand: string, ...data: any): {result: {[key: string]: string | number;}, error: boolean } {
    const statement = this.getStatement(sqlComand);
    const errorResult = {
      result: {'': ''},
      error: true
    };

    if (!statement) {
      return errorResult;
    }

    try {
      const result = statement.all(data);

      return { result, error: false};
    } catch (error) {
      console.error(`Error "${error}" when get all from database command "${sqlComand}", with attrs: ${data}`);

      return errorResult;
    }
  }

  public validate(tableName: string, ...data: any): {isValid: boolean, error: string} {
    const result = {
      isValid: false,
      error: ''
    };
  
    const columns = Object.keys(data);
    const statement = this.getStatement(`PRAGMA table_info(${tableName});`);
    // Get table info
    const tableScheme = statement.all();
  
    // Check table
    if (!tableScheme || !tableScheme.length) {
      result.error = `no such table: ${tableName}`;
      return result;
    }
  
    // If no columns passed return true
    if (!columns) {
      result.isValid = true;
      return result;
    }
  
    let tableFieldsTypesMap: {[key: string]: string;} = {};
    tableScheme.forEach(({name, type}: {name: string, type: string}) => tableFieldsTypesMap[name] = type);
  
    // Check columns and values
    columns.forEach((column) => {
      const columnType = tableFieldsTypesMap[column];
  
      if (!columnType) {
        result.error = `try to access wrong column: ${column}, from table: ${tableName}`;
        return;
      }
  
      // If no values return true
      if (!data[column]) {
        result.isValid = true;
        return;
      }
  
      const value = data[column];
  
      // check type
      if (!this.checkType(typeof value, columnType)) {
        result.error = `attempt to insert data: ${value} in column: ${column}, from table: ${tableName}`;
        return;
      }
  
      // if all checks passed return true
      result.isValid = true;
    });
  
    return result;
  }

  /**
   * Compare js type of requested field with type from db
   */
  checkType (type: string, columnType: string): boolean {
    const dataType: string | string[] = TYPES_MAP[type];

    if (Array.isArray(dataType)) {
      return dataType.some((typeItem) => columnType.startsWith(typeItem));
    }

    return columnType.startsWith(dataType);
  }
}

export default Db;
