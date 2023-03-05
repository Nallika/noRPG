import Db from "../database/db";

export const addNewPlayer = async (nickname: string, email: string, password: string): Promise<{ result: any; error: boolean; }> => {

  const db = Db.getInstance();
  const { changes, lastInsertRowid, error } = db.run(
    'INSERT INTO Players (nick, email, password) VALUES (?, ?, ?)',
    nickname, email, password
  );

  console.log('addNewPlayer ', {
    changes, lastInsertRowid, error
  });

  return {
    result: true,
    error
  }
}

export const loginPlayer = async (email: string, password: string): Promise<{ result: any; error: boolean }> => {

  const db = Db.getInstance();
  const { result, error } = db.get(
    'SELECT id FROM Players WHERE email = ? AND password = ?',
    email, password
  );

  console.log('loginPlayer ', {
    result, error
  });

  return {
    result,
    error
  }
}