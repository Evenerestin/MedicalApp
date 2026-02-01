// @ts-ignore - expo-crypto is a valid package
import * as Crypto from "expo-crypto";
import { MenstrualCycle } from "../../../types";
import { dbManager } from "../DatabaseManager";

interface MenstrualCycleRow {
  id: string;
  userId: string;
  startDate: string;
  endDate: string | null;
  cycleDuration: number | null;
  flowIntensity: string | null;
  symptoms: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export class MenstrualService {
  private static mapRowToCycle(row: MenstrualCycleRow): MenstrualCycle {
    return {
      id: row.id,
      userId: row.userId,
      startDate: row.startDate,
      endDate: row.endDate || undefined,
      cycleLength: row.cycleDuration || undefined,
      periodLength: row.endDate
        ? Math.ceil(
            (new Date(row.endDate).getTime() -
              new Date(row.startDate).getTime()) /
              (1000 * 60 * 60 * 24),
          )
        : undefined,
      symptoms: row.symptoms ? JSON.parse(row.symptoms) : undefined,
      notes: row.notes || undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  static async create(
    userId: string,
    data: Omit<MenstrualCycle, "id" | "userId" | "createdAt" | "updatedAt">,
  ): Promise<MenstrualCycle> {
    const db = await dbManager.initialize();
    const id = Crypto.randomUUID();
    const now = new Date().toISOString();

    await db.runAsync(
      `INSERT INTO menstrual_cycles (id, userId, startDate, endDate, cycleDuration, flowIntensity, symptoms, notes, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        userId,
        data.startDate,
        data.endDate || null,
        data.cycleLength || null,
        null, 
        data.symptoms ? JSON.stringify(data.symptoms) : null,
        data.notes || null,
        now,
        now,
      ],
    );

    return {
      id,
      userId,
      ...data,
      createdAt: now,
      updatedAt: now,
    };
  }

  static async getAll(userId: string): Promise<MenstrualCycle[]> {
    const db = await dbManager.initialize();
    const rows = await db.getAllAsync<MenstrualCycleRow>(
      `SELECT * FROM menstrual_cycles WHERE userId = ? ORDER BY startDate DESC`,
      [userId],
    );
    return rows.map(this.mapRowToCycle);
  }

  static async getById(id: string): Promise<MenstrualCycle | null> {
    const db = await dbManager.initialize();
    const row = await db.getFirstAsync<MenstrualCycleRow>(
      `SELECT * FROM menstrual_cycles WHERE id = ?`,
      [id],
    );
    return row ? this.mapRowToCycle(row) : null;
  }

  static async update(
    id: string,
    data: Partial<Omit<MenstrualCycle, "id" | "userId" | "createdAt">>,
  ): Promise<MenstrualCycle> {
    const db = await dbManager.initialize();
    const now = new Date().toISOString();

    const updates: string[] = [];
    const values: (string | number | null)[] = [];

    if (data.startDate !== undefined) {
      updates.push("startDate = ?");
      values.push(data.startDate);
    }
    if (data.endDate !== undefined) {
      updates.push("endDate = ?");
      values.push(data.endDate || null);
    }
    if (data.cycleLength !== undefined) {
      updates.push("cycleDuration = ?");
      values.push(data.cycleLength || null);
    }
    if (data.symptoms !== undefined) {
      updates.push("symptoms = ?");
      values.push(data.symptoms ? JSON.stringify(data.symptoms) : null);
    }
    if (data.notes !== undefined) {
      updates.push("notes = ?");
      values.push(data.notes || null);
    }

    updates.push("updatedAt = ?");
    values.push(now);
    values.push(id);

    await db.runAsync(
      `UPDATE menstrual_cycles SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );

    const cycle = await this.getById(id);
    if (!cycle) {
      throw new Error("Menstrual cycle not found after update");
    }

    return cycle;
  }

  static async delete(id: string): Promise<boolean> {
    const db = await dbManager.initialize();
    const result = await db.runAsync(
      `DELETE FROM menstrual_cycles WHERE id = ?`,
      [id],
    );
    return result.changes > 0;
  }

  static async getRecent(
    userId: string,
    count: number = 6,
  ): Promise<MenstrualCycle[]> {
    const db = await dbManager.initialize();
    const rows = await db.getAllAsync<MenstrualCycleRow>(
      `SELECT * FROM menstrual_cycles WHERE userId = ? ORDER BY startDate DESC LIMIT ?`,
      [userId, count],
    );
    return rows.map(this.mapRowToCycle);
  }
}
