import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
import { DB_VERSION, INDICES, SCHEMA } from "./schema";

const DB_NAME = "medicalapp.db";
const DB_VERSION_KEY = "db_version";

export class DatabaseManager {
  private db: SQLite.SQLiteDatabase | null = null;
  private isInitialized = false;

  async initialize(): Promise<SQLite.SQLiteDatabase> {
    if (this.isInitialized && this.db) {
      return this.db;
    }

    this.db = await SQLite.openDatabaseAsync(DB_NAME);
    await this.runMigrations();
    this.isInitialized = true;
    return this.db;
  }

  private async runMigrations(): Promise<void> {
    const storedVersion = await AsyncStorage.getItem(DB_VERSION_KEY);
    const currentVersion = DB_VERSION;

    if (!storedVersion || parseInt(storedVersion) < currentVersion) {
      const tableNames = Object.keys(SCHEMA) as Array<keyof typeof SCHEMA>;
      for (const tableName of tableNames) {
        await this.db!.execAsync(SCHEMA[tableName]);
      }

      for (const indexSql of INDICES) {
        await this.db!.execAsync(indexSql);
      }

      await AsyncStorage.setItem(DB_VERSION_KEY, currentVersion.toString());
    }
  }

  getDatabase(): SQLite.SQLiteDatabase {
    if (!this.db) {
      throw new Error("Database not initialized. Call initialize() first.");
    }
    return this.db;
  }

  async execute(
    sql: string,
    params: (string | number | boolean)[] = [],
  ): Promise<void> {
    try {
      await this.db!.execAsync(sql);
    } catch (error) {
      console.error("❌ Query execution failed:", sql, error);
      throw error;
    }
  }

  async getOne<T = any>(
    sql: string,
    params: (string | number | boolean)[] = [],
  ): Promise<T | null> {
    const statement = await this.db!.prepareAsync(sql);
    const result = await statement.executeAsync<T>(params);
    const row = await result.getFirstAsync();
    await statement.finalizeAsync();
    return row ?? null;
  }

  async getAll<T = any>(
    sql: string,
    params: (string | number | boolean)[] = [],
  ): Promise<T[]> {
    const statement = await this.db!.prepareAsync(sql);
    const result = await statement.executeAsync<T>(params);
    const rows = await result.getAllAsync();
    await statement.finalizeAsync();
    return rows;
  }

  async insert(
    sql: string,
    params: (string | number | boolean)[] = [],
  ): Promise<number> {
    const statement = await this.db!.prepareAsync(sql);
    const result = await statement.executeAsync(params);
    await statement.finalizeAsync();
    return result.lastInsertRowId as number;
  }

  async update(
    sql: string,
    params: (string | number | boolean)[] = [],
  ): Promise<number> {
    const statement = await this.db!.prepareAsync(sql);
    const result = await statement.executeAsync(params);
    await statement.finalizeAsync();
    return result.changes;
  }

  async delete(
    sql: string,
    params: (string | number | boolean)[] = [],
  ): Promise<number> {
    const statement = await this.db!.prepareAsync(sql);
    const result = await statement.executeAsync(params);
    await statement.finalizeAsync();
    return result.changes;
  }

  async beginTransaction(): Promise<void> {
    await this.db!.execAsync("BEGIN TRANSACTION");
  }

  async commit(): Promise<void> {
    await this.db!.execAsync("COMMIT");
  }

  async rollback(): Promise<void> {
    await this.db!.execAsync("ROLLBACK");
  }

  async withTransaction<T>(operation: () => Promise<T>): Promise<T> {
    try {
      await this.beginTransaction();
      const result = await operation();
      await this.commit();
      return result;
    } catch (error) {
      await this.rollback();
      throw error;
    }
  }

  async clearAllData(): Promise<void> {
    const tables = Object.keys(SCHEMA);
    for (const table of tables) {
      await this.db!.execAsync(`DELETE FROM ${table}`);
    }
  }
}

export const dbManager = new DatabaseManager();
