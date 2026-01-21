import { v4 as uuidv4 } from "uuid";
import { VitalMeasurement } from "../../../types";
import { dbManager } from "../DatabaseManager";

export class VitalsRepository {
  static async create(
    userId: string,
    data: Omit<VitalMeasurement, "id" | "createdAt">,
  ): Promise<VitalMeasurement> {
    const id = uuidv4();
    const now = new Date().toISOString();

    await dbManager.insert(
      `
      INSERT INTO vital_measurements (
        id, userId, type, value, secondaryValue, tertiaryValue, unit, notes, timestamp, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        userId,
        data.type,
        data.value,
        data.secondaryValue ?? 0,
        data.tertiaryValue ?? 0,
        data.unit || "",
        data.notes || "",
        data.measuredAt,
        now,
      ],
    );

    return { id, ...data, userId, createdAt: now };
  }

  static async getByUserId(userId: string): Promise<VitalMeasurement[]> {
    const results = await dbManager.getAll(
      "SELECT * FROM vital_measurements WHERE userId = ? ORDER BY timestamp DESC",
      [userId],
    );
    return results.map((row: any) => ({
      id: row.id,
      userId: row.userId,
      type: row.type,
      value: row.value,
      secondaryValue:
        row.secondaryValue && row.secondaryValue !== 0
          ? row.secondaryValue
          : undefined,
      tertiaryValue:
        row.tertiaryValue && row.tertiaryValue !== 0
          ? row.tertiaryValue
          : undefined,
      unit: row.unit,
      notes: row.notes,
      measuredAt: row.timestamp,
      createdAt: row.createdAt,
    }));
  }

  static async getRecent(
    userId: string,
    days: number,
  ): Promise<VitalMeasurement[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoff = cutoffDate.toISOString();

    const results = await dbManager.getAll(
      "SELECT * FROM vital_measurements WHERE userId = ? AND timestamp >= ? ORDER BY timestamp DESC",
      [userId, cutoff],
    );
    return results.map((row: any) => ({
      id: row.id,
      userId: row.userId,
      type: row.type,
      value: row.value,
      secondaryValue:
        row.secondaryValue && row.secondaryValue !== 0
          ? row.secondaryValue
          : undefined,
      tertiaryValue:
        row.tertiaryValue && row.tertiaryValue !== 0
          ? row.tertiaryValue
          : undefined,
      unit: row.unit,
      notes: row.notes,
      measuredAt: row.timestamp,
      createdAt: row.createdAt,
    }));
  }

  static async getById(id: string): Promise<VitalMeasurement | null> {
    const results = await dbManager.getAll(
      "SELECT * FROM vital_measurements WHERE id = ?",
      [id],
    );
    if (results.length === 0) return null;
    const row = results[0];
    return {
      id: row.id,
      userId: row.userId,
      type: row.type,
      value: row.value,
      secondaryValue:
        row.secondaryValue && row.secondaryValue !== 0
          ? row.secondaryValue
          : undefined,
      tertiaryValue:
        row.tertiaryValue && row.tertiaryValue !== 0
          ? row.tertiaryValue
          : undefined,
      unit: row.unit,
      notes: row.notes,
      measuredAt: row.timestamp,
      createdAt: row.createdAt,
    };
  }

  static async update(
    id: string,
    data: Partial<Omit<VitalMeasurement, "id" | "userId" | "createdAt">>,
  ): Promise<VitalMeasurement> {
    const updates: string[] = [];
    const values: any[] = [];

    if (data.type !== undefined) {
      updates.push("type = ?");
      values.push(data.type);
    }
    if (data.value !== undefined) {
      updates.push("value = ?");
      values.push(data.value);
    }
    if (data.secondaryValue !== undefined) {
      updates.push("secondaryValue = ?");
      values.push(data.secondaryValue);
    }
    if (data.tertiaryValue !== undefined) {
      updates.push("tertiaryValue = ?");
      values.push(data.tertiaryValue);
    }
    if (data.unit !== undefined) {
      updates.push("unit = ?");
      values.push(data.unit);
    }
    if (data.notes !== undefined) {
      updates.push("notes = ?");
      values.push(data.notes);
    }
    if (data.measuredAt !== undefined) {
      updates.push("timestamp = ?");
      values.push(data.measuredAt);
    }

    values.push(id);

    await dbManager.update(
      `UPDATE vital_measurements SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );

    const updated = await this.getById(id);
    if (!updated) throw new Error("Vital measurement not found after update");
    return updated;
  }

  static async delete(id: string): Promise<boolean> {
    await dbManager.delete("DELETE FROM vital_measurements WHERE id = ?", [id]);
    return true;
  }
}
