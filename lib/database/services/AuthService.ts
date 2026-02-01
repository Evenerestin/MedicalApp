import * as Crypto from "expo-crypto";
import { User } from "../../../types";
import { dbManager } from "../DatabaseManager";

interface UserRow {
  id: string;
  email: string;
  passwordHash: string;
  name: string | null;
  dateOfBirth: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
}

function mapRowToUser(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    name: row.name || "",
    dateOfBirth: row.dateOfBirth || undefined,
    phone: row.phone || undefined,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export class AuthService {
  private static async hashPassword(password: string): Promise<string> {
    const salt = "MedicalApp_Salt_2026_";
    const salted = salt + password;
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      salted,
    );
    return hash;
  }

  private static async verifyPassword(
    password: string,
    storedHash: string,
  ): Promise<boolean> {
    const hash = await this.hashPassword(password);
    return hash === storedHash;
  }

  static async register(data: {
    password: string;
    name: string;
  }): Promise<User> {
    const db = await dbManager.initialize();

    const existing = await db.getFirstAsync<{ id: string }>(
      `SELECT id FROM users LIMIT 1`,
    );

    if (existing) {
      throw new Error("User already exists. Please login instead.");
    }

    const id = Crypto.randomUUID();
    const now = new Date().toISOString();
    const passwordHash = await this.hashPassword(data.password);

    await db.runAsync(
      `INSERT INTO users (id, email, passwordHash, name, createdAt, updatedAt) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, "", passwordHash, data.name.trim(), now, now],
    );

    return {
      id,
      email: "",
      name: data.name.trim(),
      createdAt: now,
      updatedAt: now,
    };
  }

  static async login(password: string): Promise<User | null> {
    const db = await dbManager.initialize();

    const result = await db.getFirstAsync<UserRow>(
      `SELECT * FROM users LIMIT 1`,
    );

    if (!result) {
      return null;
    }

    const isValid = await this.verifyPassword(password, result.passwordHash);

    if (!isValid) {
      return null;
    }

    return mapRowToUser(result);
  }

  static async getUserById(id: string): Promise<User | null> {
    const db = await dbManager.initialize();

    const result = await db.getFirstAsync<UserRow>(
      `SELECT * FROM users WHERE id = ?`,
      [id],
    );

    if (!result) {
      return null;
    }

    return mapRowToUser(result);
  }

  static async updateProfile(
    id: string,
    data: Partial<Pick<User, "name" | "dateOfBirth" | "phone">>,
  ): Promise<User> {
    const db = await dbManager.initialize();
    const now = new Date().toISOString();

    const updates: string[] = [];
    const values: (string | null)[] = [];

    if (data.name !== undefined) {
      updates.push("name = ?");
      values.push(data.name);
    }
    if (data.dateOfBirth !== undefined) {
      updates.push("dateOfBirth = ?");
      values.push(data.dateOfBirth || null);
    }
    if (data.phone !== undefined) {
      updates.push("phone = ?");
      values.push(data.phone || null);
    }

    updates.push("updatedAt = ?");
    values.push(now);
    values.push(id);

    await db.runAsync(
      `UPDATE users SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );

    const user = await this.getUserById(id);
    if (!user) {
      throw new Error("User not found after update");
    }

    return user;
  }

  static async changePassword(
    id: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    const db = await dbManager.initialize();

    const result = await db.getFirstAsync<{ passwordHash: string }>(
      `SELECT passwordHash FROM users WHERE id = ?`,
      [id],
    );

    if (!result) {
      throw new Error("User not found");
    }

    const isValid = await this.verifyPassword(
      currentPassword,
      result.passwordHash,
    );

    if (!isValid) {
      return false;
    }

    const newHash = await this.hashPassword(newPassword);
    const now = new Date().toISOString();

    await db.runAsync(
      `UPDATE users SET passwordHash = ?, updatedAt = ? WHERE id = ?`,
      [newHash, now, id],
    );

    return true;
  }

  static async deleteAccount(id: string): Promise<boolean> {
    const db = await dbManager.initialize();

    const result = await db.runAsync(`DELETE FROM users WHERE id = ?`, [id]);

    return result.changes > 0;
  }
}
