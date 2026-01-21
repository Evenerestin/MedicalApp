/**
 * Glucose Measurement Repository
 */

import { v4 as uuidv4 } from "uuid";
import { GlucoseMeasurement } from "../../../types";
import { dbManager } from "../DatabaseManager";

export class GlucoseRepository {
  static async create(
    userId: string,
    data: Omit<GlucoseMeasurement, "id" | "createdAt">,
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
      ],
    );

    return { id, ...data, userId, createdAt: now };
  }
}
