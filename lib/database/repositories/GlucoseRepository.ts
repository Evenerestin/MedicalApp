/**
 * Glucose Measurement Repository
 */

import { v4 as uuidv4 } from "uuid";
import { GlucoseMeasurement } from "../../../types";
import { dbManager } from "../DatabaseManager";

export class GlucoseRepository {
  static async create(
    userId: string,
    data: Omit<GlucoseMeasurement, "id" | "createdAt">
  ): Promise<GlucoseMeasurement> {
    const id = uuidv4();
    const now = new Date().toISOString();

    await dbManager.insert(
      `
      INSERT INTO glucose_measurements (
        id, userId, value, unit, mealTime, insulinDose, notes, timestamp, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        userId,
        data.value,
        data.unit,
        "",
        data.insulinDose || 0,
        data.notes || "",
        data.measuredAt,
        now,
      ]
    );

    return { id, ...data, userId, createdAt: now };
  }

  static async getByUserId(userId: string): Promise<GlucoseMeasurement[]> {
    const measurements = await dbManager.getAll<any>(
      "SELECT * FROM glucose_measurements WHERE userId = ? ORDER BY timestamp DESC",
      [userId]
    );
    return measurements;
  }

  static async getRecent(
    userId: string,
    days: number = 30
  ): Promise<GlucoseMeasurement[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const measurements = await dbManager.getAll<any>(
      "SELECT * FROM glucose_measurements WHERE userId = ? AND timestamp >= ? ORDER BY timestamp DESC",
      [userId, startDate.toISOString()]
    );
    return measurements;
  }

  static async getById(id: string): Promise<GlucoseMeasurement | null> {
    return await dbManager.getOne<GlucoseMeasurement>(
      "SELECT * FROM glucose_measurements WHERE id = ?",
      [id]
    );
  }

  static async update(
    id: string,
    data: Partial<Omit<GlucoseMeasurement, "id" | "userId" | "createdAt">>
  ): Promise<GlucoseMeasurement> {
    const updates: string[] = [];
    const params: (string | number)[] = [];

    if (data.value !== undefined) {
      updates.push("value = ?");
      params.push(data.value);
    }
    if (data.unit !== undefined) {
      updates.push("unit = ?");
      params.push(data.unit);
    }
    if (data.insulinDose !== undefined) {
      updates.push("insulinDose = ?");
      params.push(data.insulinDose);
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
      `UPDATE glucose_measurements SET ${updates.join(", ")} WHERE id = ?`,
      params
    );

    const updated = await this.getById(id);
    if (!updated) throw new Error("Glucose measurement not found");
    return updated;
  }

  static async delete(id: string): Promise<boolean> {
    const changes = await dbManager.delete(
      "DELETE FROM glucose_measurements WHERE id = ?",
      [id]
    );
    return changes > 0;
  }
}
