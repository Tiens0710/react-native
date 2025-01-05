// src/services/database.service.ts
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = "MainDB.db";
const database_version = "1.0";
const database_displayname = "SQLite Main Database";
const database_size = 200000;

interface DatabaseInitResult {
  success: boolean;
  error?: string;
}

export const DatabaseService = {
  initDatabase: async (): Promise<DatabaseInitResult> => {
    try {
      const db = await SQLite.openDatabase({
        name: database_name,
        location: 'default',
      });

      await db.transaction((tx) => {
        // Tạo bảng Users
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );`
        );
      });

      return { success: true };
    } catch (error) {
      console.error('Database init error:', error);
      return { success: false, error: String(error) };
    }
  },

  loginUser: async (username: string, password: string) => {
    try {
      const db = await SQLite.openDatabase({
        name: database_name,
        location: 'default',
      });

      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM Users WHERE username = ? AND password = ?',
            [username, password],
            (_, results) => {
              if (results.rows.length > 0) {
                resolve(results.rows.item(0));
              } else {
                resolve(null);
              }
            },
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      });
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  },

  registerUser: async (username: string, password: string) => {
    try {
      const db = await SQLite.openDatabase({
        name: database_name,
        location: 'default',
      });

      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            'INSERT INTO Users (username, password) VALUES (?, ?)',
            [username, password],
            (_, results) => {
              resolve(results.rowsAffected > 0);
            },
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      });
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  },

  checkUsername: async (username: string) => {
    try {
      const db = await SQLite.openDatabase({
        name: database_name,
        location: 'default',
      });

      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM Users WHERE username = ?',
            [username],
            (_, results) => {
              resolve(results.rows.length > 0);
            },
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      });
    } catch (error) {
      console.error('Check username error:', error);
      return false;
    }
  }
};