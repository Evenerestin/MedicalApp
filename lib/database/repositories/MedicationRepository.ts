import * as Crypto from "expo-crypto";
import { Medication } from "../../../types";
import { dbManager } from "../DatabaseManager";

export class MedicationRepository {
  static async create(
    userId: string,
    data: Omit<Medication, "id" | "createdAt" | "updatedAt">,
  ): Promise<Medication> {
    const id = Crypto.randomUUID();
    const now = new Date().toISOString();

    await dbManager.insert(
      `
      INSERT INTO medications (
        id, userId, name, dosage, unit, frequency, times, remindersEnabled, notes,
        isActive, startDate, endDate, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        userId,
        data.name,
        data.dosage,
        data.unit || "tablets",
        data.frequency,
        JSON.stringify(data.times || []),
        data.remindersEnabled ? 1 : 0,
        data.notes || "",
        data.isActive ? 1 : 0,
        data.startDate || "",
        data.endDate || "",
        now,
        now,
      ],
    );

    return {
      id,
      ...data,
      userId,
      isActive: data.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    };
  }

  static async getByUserId(userId: string): Promise<Medication[]> {
    const results = await dbManager.getAll(
      "SELECT * FROM medications WHERE userId = ? ORDER BY createdAt DESC",
      [userId],
    );
    return results.map((row: any) => ({
      id: row.id,
      userId: row.userId,
      name: row.name,
      dosage: row.dosage,
      unit: row.unit || "tablets",
      frequency: row.frequency,
      startDate: row.startDate,
      endDate: row.endDate,
      isActive: row.isActive === 1,
      times: row.times ? JSON.parse(row.times) : [],
      remindersEnabled: row.remindersEnabled === 1,
      notes: row.notes || "",
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));
  }

  static async getActiveMedications(userId: string): Promise<Medication[]> {
    const results = await dbManager.getAll(
      "SELECT * FROM medications WHERE userId = ? AND isActive = 1 ORDER BY createdAt DESC",
      [userId],
    );
    return results.map((row: any) => ({
      id: row.id,
      userId: row.userId,
      name: row.name,
      dosage: row.dosage,
      unit: row.unit || "tablets",
      frequency: row.frequency,
      startDate: row.startDate,
      endDate: row.endDate,
      isActive: row.isActive === 1,
      times: row.times ? JSON.parse(row.times) : [],
      remindersEnabled: row.remindersEnabled === 1,
      notes: row.notes || "",
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));
  }

  static async getById(id: string): Promise<Medication | null> {
    const results = await dbManager.getAll(
      "SELECT * FROM medications WHERE id = ?",
      [id],
    );
    if (results.length === 0) return null;
    const row = results[0];
    return {
      id: row.id,
      userId: row.userId,
      name: row.name,
      dosage: row.dosage,
      unit: row.unit || "tablets",
      frequency: row.frequency,
      startDate: row.startDate,
      endDate: row.endDate,
      isActive: row.isActive === 1,
      times: row.times ? JSON.parse(row.times) : [],
      remindersEnabled: row.remindersEnabled === 1,
      notes: row.notes || "",
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  static async update(
    id: string,
    data: Partial<Omit<Medication, "id" | "userId" | "createdAt">>,
  ): Promise<Medication> {
    const now = new Date().toISOString();
    const updates: string[] = [];
    const values: any[] = [];

    if (data.name !== undefined) {
      updates.push("name = ?");
      values.push(data.name);
    }
    if (data.dosage !== undefined) {
      updates.push("dosage = ?");
      values.push(data.dosage);
    }
    if (data.unit !== undefined) {
      updates.push("unit = ?");
      values.push(data.unit);
    }
    if (data.frequency !== undefined) {
      updates.push("frequency = ?");
      values.push(data.frequency);
    }
    if (data.times !== undefined) {
      updates.push("times = ?");
      values.push(JSON.stringify(data.times));
    }
    if (data.remindersEnabled !== undefined) {
      updates.push("remindersEnabled = ?");
      values.push(data.remindersEnabled ? 1 : 0);
    }
    if (data.notes !== undefined) {
      updates.push("notes = ?");
      values.push(data.notes);
    }
    if (data.startDate !== undefined) {
      updates.push("startDate = ?");
      values.push(data.startDate);
    }
    if (data.endDate !== undefined) {
      updates.push("endDate = ?");
      values.push(data.endDate);
    }
    if (data.isActive !== undefined) {
      updates.push("isActive = ?");
      values.push(data.isActive ? 1 : 0);
    }

    updates.push("updatedAt = ?");
    values.push(now);
    values.push(id);

    await dbManager.update(
      `UPDATE medications SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );

    const updated = await this.getById(id);
    if (!updated) throw new Error("Medication not found after update");
    return updated;
  }

  static async delete(id: string): Promise<boolean> {
    await dbManager.delete("DELETE FROM medications WHERE id = ?", [id]);
    return true;
  }
}
