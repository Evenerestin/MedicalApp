/**
 * Vitals Repository
 */

import { v4 as uuidv4 } from "uuid";
import { VitalMeasurement } from "../../../types";
import { dbManager } from "../DatabaseManager";

export class VitalsRepository {
  static async create(
    userId: string,
    data: Omit<VitalMeasurement, "id" | "createdAt">
  ): Promise<VitalMeasurement> {
    const id = uuidv4();
    const now = new Date().toISOString();

    await dbManager.insert(
      `
      INSERT INTO vital_measurements (
        id, userId, type, value, unit, notes, timestamp, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        userId,
        data.type,
        data.value,
        data.unit || "",
        data.notes || "",
        data.measuredAt,
        now,
      ]
    );

    return { id, ...data, userId, createdAt: now };
  }

  static async getByUserId(userId: string): Promise<VitalMeasurement[]> {
    const measurements = await dbManager.getAll<any>(
      "SELECT * FROM vital_measurements WHERE userId = ? ORDER BY timestamp DESC",
      [userId]
    );
    return measurements;
  }

  static async getByType(
    userId: string,
    type: string
  ): Promise<VitalMeasurement[]> {
    const measurements = await dbManager.getAll<any>(
      "SELECT * FROM vital_measurements WHERE userId = ? AND type = ? ORDER BY timestamp DESC",
      [userId, type]
    );
    return measurements;
  }

  static async getRecent(
    userId: string,
    days: number = 30
  ): Promise<VitalMeasurement[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const measurements = await dbManager.getAll<any>(
      "SELECT * FROM vital_measurements WHERE userId = ? AND timestamp >= ? ORDER BY timestamp DESC",
      [userId, startDate.toISOString()]
    );
    return measurements;
  }

  static async getById(id: string): Promise<VitalMeasurement | null> {
    return await dbManager.getOne<VitalMeasurement>(
      "SELECT * FROM vital_measurements WHERE id = ?",
      [id]
    );
  }

  static async update(
    id: string,
    data: Partial<Omit<VitalMeasurement, "id" | "userId" | "createdAt">>
  ): Promise<VitalMeasurement> {
    const updates: string[] = [];
    const params: (string | number)[] = [];

    if (data.type !== undefined) {
      updates.push("type = ?");
      params.push(data.type);
    }
    if (data.value !== undefined) {
      updates.push("value = ?");
      params.push(data.value);
    }
    if (data.unit !== undefined) {
      updates.push("unit = ?");
      params.push(data.unit);
    }
    if (data.notes !== undefined) {
      updates.push("notes = ?");
      params.push(data.notes);
    }
    if (data.measuredAt !== undefined) {
      updates.push("timestamp = ?");
      params.push(data.measuredAt);
    }

    params.push(id);

    await dbManager.update(
      `UPDATE vital_measurements SET ${updates.join(", ")} WHERE id = ?`,
      params
    );

    const updated = await this.getById(id);
    if (!updated) throw new Error("Vital measurement not found");
    return updated;
  }

  static async delete(id: string): Promise<boolean> {
    const changes = await dbManager.delete(
      "DELETE FROM vital_measurements WHERE id = ?",
      [id]
    );
    return changes > 0;
  }
}
