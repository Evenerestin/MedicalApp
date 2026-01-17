/**
 * Medication Repository
 * CRUD operations for medications
 */

import { v4 as uuidv4 } from "uuid";
import { Medication } from "../../../types";
import { dbManager } from "../DatabaseManager";

export class MedicationRepository {
  /**
   * Create new medication
   */
  static async create(
    userId: string,
    data: Omit<Medication, "id" | "createdAt" | "updatedAt">
  ): Promise<Medication> {
    const id = uuidv4();
    const now = new Date().toISOString();

    await dbManager.insert(
      `
      INSERT INTO medications (
        id, userId, name, dosage, frequency, route, reason,
        startDate, endDate, active, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        userId,
        data.name,
        data.dosage,
        data.frequency,
        "", // route - not in type
        "", // reason - not in type
        data.startDate || "",
        data.endDate || "",
        data.isActive ? 1 : 0,
        now,
        now,
      ]
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

  /**
   * Get medication by ID
   */
  static async getById(id: string): Promise<Medication | null> {
    const medication = await dbManager.getOne<any>(
      "SELECT * FROM medications WHERE id = ?",
      [id]
    );

    return medication ? this.formatMedication(medication) : null;
  }

  /**
   * Get all medications for user
   */
  static async getByUserId(userId: string): Promise<Medication[]> {
    const medications = await dbManager.getAll<any>(
      "SELECT * FROM medications WHERE userId = ? ORDER BY createdAt DESC",
      [userId]
    );

    return medications.map((m: any) => this.formatMedication(m));
  }

  /**
   * Get active medications for user
   */
  static async getActiveMedications(userId: string): Promise<Medication[]> {
    const medications = await dbManager.getAll<any>(
      "SELECT * FROM medications WHERE userId = ? AND active = 1 ORDER BY name ASC",
      [userId]
    );

    return medications.map((m: any) => this.formatMedication(m));
  }

  /**
   * Update medication
   */
  static async update(
    id: string,
    data: Partial<Omit<Medication, "id" | "userId" | "createdAt">>
  ): Promise<Medication> {
    const updates: string[] = [];
    const params: (string | number)[] = [];

    if (data.name !== undefined) {
      updates.push("name = ?");
      params.push(data.name);
    }
    if (data.dosage !== undefined) {
      updates.push("dosage = ?");
      params.push(data.dosage);
    }
    if (data.frequency !== undefined) {
      updates.push("frequency = ?");
      params.push(data.frequency);
    }
    if (data.startDate !== undefined) {
      updates.push("startDate = ?");
      params.push(data.startDate);
    }
    if (data.endDate !== undefined) {
      updates.push("endDate = ?");
      params.push(data.endDate);
    }
    if (data.isActive !== undefined) {
      updates.push("active = ?");
      params.push(data.isActive ? 1 : 0);
    }

    updates.push("updatedAt = ?");
    params.push(new Date().toISOString());

    params.push(id);

    await dbManager.update(
      `UPDATE medications SET ${updates.join(", ")} WHERE id = ?`,
      params
    );

    const updated = await this.getById(id);
    if (!updated) throw new Error("Medication not found");
    return updated;
  }

  /**
   * Delete medication
   */
  static async delete(id: string): Promise<boolean> {
    const changes = await dbManager.delete(
      "DELETE FROM medications WHERE id = ?",
      [id]
    );
    return changes > 0;
  }

  /**
   * Format medication from database
   */
  private static formatMedication(medication: any): Medication {
    return {
      ...medication,
      active: Boolean(medication.active),
    };
  }
}
