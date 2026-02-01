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

    try {
      console.log("📦 Initializing database...");
      this.db = await SQLite.openDatabaseAsync(DB_NAME);
      console.log("✅ Database opened successfully");

      await this.runMigrations();
      console.log("✅ Migrations completed successfully");

      this.isInitialized = true;
      return this.db;
    } catch (error) {
      console.error("❌ Database initialization failed:", error);
      throw new Error(`Failed to initialize database: ${error}`);
    }
  }

  private async runMigrations(): Promise<void> {
    try {
      const storedVersion = await AsyncStorage.getItem(DB_VERSION_KEY);
      const currentVersion = DB_VERSION;

      console.log(
        `📊 Stored DB version: ${storedVersion}, Current: ${currentVersion}`,
      );

      if (!storedVersion || parseInt(storedVersion) < currentVersion) {
        console.log("🔄 Running migrations...");

        if (storedVersion && parseInt(storedVersion) < 3) {
          console.log("  Migrating to version 3: Recreating medications table");
          await this.db!.execAsync("DROP TABLE IF EXISTS medications");
        }

        if (storedVersion && parseInt(storedVersion) < 4) {
          console.log("  Migrating to version 4: Consolidating schema");

          await this.db!.execAsync("DROP TABLE IF EXISTS glucose_measurements");
          await this.db!.execAsync(
            "DROP TABLE IF EXISTS environmental_allergies",
          );

          await this.db!.execAsync("DROP TABLE IF EXISTS vital_measurements");

          await this.db!.execAsync("DROP TABLE IF EXISTS allergies");

          await this.db!.execAsync("DROP TABLE IF EXISTS ice_profile");

          await this.db!.execAsync("DROP TABLE IF EXISTS app_notifications");

          await this.db!.execAsync("DROP TABLE IF EXISTS medications");
        }

        const tableNames = Object.keys(SCHEMA) as Array<keyof typeof SCHEMA>;

        for (const tableName of tableNames) {
          console.log(`  Creating/updating table: ${tableName}`);
          await this.db!.execAsync(SCHEMA[tableName]);
        }

        for (const indexSql of INDICES) {
          await this.db!.execAsync(indexSql);
        }

        await AsyncStorage.setItem(DB_VERSION_KEY, currentVersion.toString());
        console.log("✅ Migrations completed");
      } else {
        console.log("✅ Database already up to date");
      }
    } catch (error) {
      console.error("❌ Migration failed:", error);
      throw error;
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

  async close(): Promise<void> {
    if (this.db) {
      await this.db.closeAsync();
      this.db = null;
      this.isInitialized = false;
      console.log("✅ Database closed");
    }
  }

  async resetDatabase(): Promise<void> {
    try {
      console.log("🔄 Resetting database...");
      await this.close();

      try {
        await SQLite.deleteDatabaseAsync(DB_NAME);
      } catch (deleteError: any) {
        if (!deleteError.message?.includes("not found")) {
          throw deleteError;
        }
        console.log("ℹ️ Database file already deleted or not found");
      }

      await AsyncStorage.removeItem(DB_VERSION_KEY);
      console.log("✅ Database reset complete");
    } catch (error) {
      console.error("❌ Database reset failed:", error);
      throw error;
    }
  }
}

export const dbManager = new DatabaseManager();
