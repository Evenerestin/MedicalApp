/**
 * Appointment Repository
 */

import { v4 as uuidv4 } from "uuid";
import { Appointment } from "../../../types";
import { dbManager } from "../DatabaseManager";

export class AppointmentRepository {
  static async create(
    userId: string,
    data: Omit<Appointment, "id" | "createdAt" | "updatedAt">
  ): Promise<Appointment> {
    const id = uuidv4();
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
      ]
    );

    return { id, ...data, userId, createdAt: now, updatedAt: now };
  }

  static async getById(id: string): Promise<Appointment | null> {
    const appointment = await dbManager.getOne<any>(
      "SELECT * FROM appointments WHERE id = ?",
      [id]
    );
    return appointment ? this.formatAppointment(appointment) : null;
  }

  static async getByUserId(userId: string): Promise<Appointment[]> {
    const appointments = await dbManager.getAll<any>(
      "SELECT * FROM appointments WHERE userId = ? ORDER BY date DESC, time DESC",
      [userId]
    );
    return appointments.map((a) => this.formatAppointment(a));
  }

  static async getUpcoming(userId: string): Promise<Appointment[]> {
    const today = new Date().toISOString().split("T")[0];
    const appointments = await dbManager.getAll<any>(
      "SELECT * FROM appointments WHERE userId = ? AND date >= ? ORDER BY date ASC, time ASC",
      [userId, today]
    );
    return appointments.map((a) => this.formatAppointment(a));
  }

  static async update(
    id: string,
    data: Partial<Omit<Appointment, "id" | "userId" | "createdAt">>
  ): Promise<Appointment> {
    const updates: string[] = [];
    const params: (string | number)[] = [];

    Object.entries(data).forEach(([key, value]) => {
      if (key === "reminders") {
        updates.push("reminders = ?");
        params.push(JSON.stringify(value) as string);
      } else if (value !== undefined) {
        updates.push(`${key} = ?`);
        params.push(value as string | number);
      }
    });

    updates.push("updatedAt = ?");
    params.push(new Date().toISOString());
    params.push(id);

    await dbManager.update(
      `UPDATE appointments SET ${updates.join(", ")} WHERE id = ?`,
      params
    );

    const updated = await this.getById(id);
    if (!updated) throw new Error("Appointment not found");
    return updated;
  }

  static async delete(id: string): Promise<boolean> {
    const changes = await dbManager.delete(
      "DELETE FROM appointments WHERE id = ?",
      [id]
    );
    return changes > 0;
  }

  private static formatAppointment(appointment: any): Appointment {
    return {
      ...appointment,
      reminders: appointment.reminders ? JSON.parse(appointment.reminders) : [],
    };
  }
}
