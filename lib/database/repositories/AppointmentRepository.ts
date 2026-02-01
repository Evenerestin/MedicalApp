import * as Crypto from "expo-crypto";
import { Appointment } from "../../../types";
import { dbManager } from "../DatabaseManager";

export class AppointmentRepository {
  static async create(
    userId: string,
    data: Omit<Appointment, "id" | "createdAt" | "updatedAt">,
  ): Promise<Appointment> {
    const id = Crypto.randomUUID();
    const now = new Date().toISOString();

    await dbManager.insert(
      `
      INSERT INTO appointments (
        id, userId, title, date, time, doctorName, address, reminders, notes,
        createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        userId,
        data.title,
        data.date,
        data.time,
        data.doctorName || "",
        data.address || "",
        JSON.stringify(data.reminders || []),
        data.description || "",
        now,
        now,
      ],
    );

    return { id, ...data, userId, createdAt: now, updatedAt: now };
  }

  static async getByUserId(userId: string): Promise<Appointment[]> {
    const rows = await dbManager.getAll<Appointment>(
      `SELECT * FROM appointments WHERE userId = ? ORDER BY date DESC`,
      [userId],
    );
    return rows.map((row) => ({
      ...row,
      reminders: row.reminders ? JSON.parse(row.reminders) : [],
    }));
  }

  static async getUpcoming(userId: string): Promise<Appointment[]> {
    const now = new Date().toISOString();
    const rows = await dbManager.getAll<Appointment>(
      `SELECT * FROM appointments WHERE userId = ? AND date >= ? ORDER BY date ASC`,
      [userId, now],
    );
    return rows.map((row) => ({
      ...row,
      reminders: row.reminders ? JSON.parse(row.reminders) : [],
    }));
  }

  static async getById(id: string): Promise<Appointment | null> {
    const row = await dbManager.getOne<Appointment>(
      `SELECT * FROM appointments WHERE id = ?`,
      [id],
    );
    if (!row) return null;
    return {
      ...row,
      reminders: row.reminders ? JSON.parse(row.reminders) : [],
    };
  }

  static async update(
    id: string,
    data: Partial<Omit<Appointment, "id" | "userId" | "createdAt">>,
  ): Promise<Appointment> {
    const now = new Date().toISOString();
    const fields = [];
    const values = [];
    for (const key in data) {
      if (key === "reminders") {
        fields.push(`${key} = ?`);
        values.push(JSON.stringify((data as any)[key]));
      } else {
        fields.push(`${key} = ?`);
        values.push((data as any)[key]);
      }
    }
    fields.push("updatedAt = ?");
    values.push(now);
    values.push(id);
    await dbManager.update(
      `UPDATE appointments SET ${fields.join(", ")} WHERE id = ?`,
      values,
    );
    return (await this.getById(id))!;
  }

  static async delete(id: string): Promise<boolean> {
    await dbManager.execute(`DELETE FROM appointments WHERE id = ?`, [id]);
    return true;
  }
}
