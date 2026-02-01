import * as Crypto from "expo-crypto";
import { GlucoseMeasurement } from "../../../types";
import { dbManager } from "../DatabaseManager";

export class GlucoseRepository {
  private static readonly VITAL_TYPE = "glucose";

  private static mapRowToGlucose(row: any): GlucoseMeasurement {
    return {
      id: row.id,
      userId: row.userId,
      value: row.value,
      unit: row.unit || "mg/dL",
      tag: row.tag || "other",
      insulinDose: row.insulinDose || undefined,
      insulinType: undefined,
      notes: row.notes || undefined,
      measuredAt: row.measuredAt,
      createdAt: row.createdAt,
    };
  }

  static async create(
    userId: string,
    data: Omit<GlucoseMeasurement, "id" | "createdAt">,
  ): Promise<GlucoseMeasurement> {
    const id = Crypto.randomUUID();
    const now = new Date().toISOString();

    await dbManager.insert(
      `
      INSERT INTO vital_measurements (
        id, userId, type, value, unit, tag, insulinDose, notes, measuredAt, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        userId,
        this.VITAL_TYPE,
        data.value,
        data.unit,
        data.tag || "",
        data.insulinDose || null,
        data.notes || "",
        data.measuredAt,
        now,
      ],
    );

    return { id, ...data, userId, createdAt: now };
  }

  static async getByUserId(userId: string): Promise<GlucoseMeasurement[]> {
    const rows = await dbManager.getAll<any>(
      `SELECT * FROM vital_measurements WHERE userId = ? AND type = ? ORDER BY measuredAt DESC`,
      [userId, this.VITAL_TYPE],
    );
    return rows.map(this.mapRowToGlucose);
  }

  static async getRecent(
    userId: string,
    days: number = 7,
  ): Promise<GlucoseMeasurement[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoff = cutoffDate.toISOString();

    const rows = await dbManager.getAll<any>(
      `SELECT * FROM vital_measurements WHERE userId = ? AND type = ? AND measuredAt >= ? ORDER BY measuredAt DESC`,
      [userId, this.VITAL_TYPE, cutoff],
    );
    return rows.map(this.mapRowToGlucose);
  }

  static async getById(id: string): Promise<GlucoseMeasurement | null> {
    const row = await dbManager.getOne<any>(
      `SELECT * FROM vital_measurements WHERE id = ? AND type = ?`,
      [id, this.VITAL_TYPE],
    );
    if (!row) return null;
    return this.mapRowToGlucose(row);
  }

  static async update(
    id: string,
    data: Partial<Omit<GlucoseMeasurement, "id" | "userId" | "createdAt">>,
  ): Promise<GlucoseMeasurement> {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.value !== undefined) {
      fields.push("value = ?");
      values.push(data.value);
    }
    if (data.unit !== undefined) {
      fields.push("unit = ?");
      values.push(data.unit);
    }
    if (data.tag !== undefined) {
      fields.push("tag = ?");
      values.push(data.tag);
    }
    if (data.insulinDose !== undefined) {
      fields.push("insulinDose = ?");
      values.push(data.insulinDose);
    }
    if (data.notes !== undefined) {
      fields.push("notes = ?");
      values.push(data.notes);
    }
    if (data.measuredAt !== undefined) {
      fields.push("measuredAt = ?");
      values.push(data.measuredAt);
    }

    if (fields.length > 0) {
      values.push(id);
      await dbManager.update(
        `UPDATE vital_measurements SET ${fields.join(", ")} WHERE id = ?`,
        values,
      );
    }

    return (await this.getById(id))!;
  }

  static async delete(id: string): Promise<boolean> {
    await dbManager.execute(`DELETE FROM vital_measurements WHERE id = ?`, [
      id,
    ]);
    return true;
  }
}
