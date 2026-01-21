import { v4 as uuidv4 } from "uuid";
import { Medication } from "../../../types";
import { dbManager } from "../DatabaseManager";

export class MedicationRepository {
  static async create(
    userId: string,
    data: Omit<Medication, "id" | "createdAt" | "updatedAt">,
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
        "",
        "",
        data.startDate || "",
        data.endDate || "",
        data.isActive ? 1 : 0,
        now,
        now,
      ],
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

  static async getByUserId(userId: string): Promise<Medication[]> {
    const results = await dbManager.getAll(
      "SELECT * FROM medications WHERE userId = ? ORDER BY createdAt DESC",
      [userId],
    );
    return results.map((row: any) => ({
      id: row.id,
      userId: row.userId,
      name: row.name,
      dosage: row.dosage,
      unit: "mg" as const,
      frequency: row.frequency,
      startDate: row.startDate,
      endDate: row.endDate,
      isActive: row.active === 1,
      times: [],
      remindersEnabled: false,
      notes: row.notes || "",
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));
  }

  static async getActiveMedications(userId: string): Promise<Medication[]> {
    const results = await dbManager.getAll(
      "SELECT * FROM medications WHERE userId = ? AND active = 1 ORDER BY createdAt DESC",
      [userId],
    );
    return results.map((row: any) => ({
      id: row.id,
      userId: row.userId,
      name: row.name,
      dosage: row.dosage,
      unit: "mg" as const,
      frequency: row.frequency,
      startDate: row.startDate,
      endDate: row.endDate,
      isActive: row.active === 1,
      times: [],
      remindersEnabled: false,
      notes: row.notes || "",
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));
  }

  static async getById(id: string): Promise<Medication | null> {
    const results = await dbManager.getAll(
      "SELECT * FROM medications WHERE id = ?",
      [id],
    );
    if (results.length === 0) return null;
    const row = results[0];
    return {
      id: row.id,
      userId: row.userId,
      name: row.name,
      dosage: row.dosage,
      unit: "mg" as const,
      frequency: row.frequency,
      startDate: row.startDate,
      endDate: row.endDate,
      isActive: row.active === 1,
      times: [],
      remindersEnabled: false,
      notes: row.notes || "",
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  static async update(
    id: string,
    data: Partial<Omit<Medication, "id" | "userId" | "createdAt">>,
  ): Promise<Medication> {
    const now = new Date().toISOString();
    const updates: string[] = [];
    const values: any[] = [];

    if (data.name !== undefined) {
      updates.push("name = ?");
      values.push(data.name);
    }
    if (data.dosage !== undefined) {
      updates.push("dosage = ?");
      values.push(data.dosage);
    }
    if (data.frequency !== undefined) {
      updates.push("frequency = ?");
      values.push(data.frequency);
    }
    if (data.startDate !== undefined) {
      updates.push("startDate = ?");
      values.push(data.startDate);
    }
    if (data.endDate !== undefined) {
      updates.push("endDate = ?");
      values.push(data.endDate);
    }
    if (data.isActive !== undefined) {
      updates.push("active = ?");
      values.push(data.isActive ? 1 : 0);
    }

    updates.push("updatedAt = ?");
    values.push(now);
    values.push(id);

    await dbManager.update(
      `UPDATE medications SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );

    const updated = await this.getById(id);
    if (!updated) throw new Error("Medication not found after update");
    return updated;
  }

  static async delete(id: string): Promise<boolean> {
    await dbManager.delete("DELETE FROM medications WHERE id = ?", [id]);
    return true;
  }
}
