/**
 * Appointment Repository
 */

import { v4 as uuidv4 } from "uuid";
import { Appointment } from "../../../types";
import { dbManager } from "../DatabaseManager";

export class AppointmentRepository {
  static async create(
    userId: string,
    data: Omit<Appointment, "id" | "createdAt" | "updatedAt">,
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
      ],
    );

    return { id, ...data, userId, createdAt: now, updatedAt: now };
  }
}
