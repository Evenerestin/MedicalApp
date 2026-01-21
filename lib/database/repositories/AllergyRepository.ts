import { v4 as uuidv4 } from "uuid";
import { Allergy } from "../../../types";
import { dbManager } from "../DatabaseManager";

export class AllergyRepository {
  static async create(
    userId: string,
    data: Omit<Allergy, "id" | "createdAt" | "updatedAt">,
  ): Promise<Allergy> {
    const id = uuidv4();
    const now = new Date().toISOString();

    await dbManager.insert(
      `
      INSERT INTO allergies (
        id, userId, allergen, category, severity, symptoms, notes, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        userId,
        data.name,
        data.category,
        data.severity,
        JSON.stringify(data.symptoms || []),
        data.notes || "",
        now,
        now,
      ],
    );

    return { id, ...data, userId, createdAt: now, updatedAt: now };
  }

  static async getByUserId(userId: string): Promise<Allergy[]> {
    const results = await dbManager.getAll(
      "SELECT * FROM allergies WHERE userId = ? ORDER BY createdAt DESC",
      [userId],
    );
    return results.map((row: any) => ({
      id: row.id,
      userId: row.userId,
      name: row.allergen,
      category: row.category,
      severity: row.severity,
      symptoms: JSON.parse(row.symptoms || "[]"),
      notes: row.notes,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));
  }

  static async getById(id: string): Promise<Allergy | null> {
    const results = await dbManager.getAll(
      "SELECT * FROM allergies WHERE id = ?",
      [id],
    );
    if (results.length === 0) return null;
    const row = results[0];
    return {
      id: row.id,
      userId: row.userId,
      name: row.allergen,
      category: row.category,
      severity: row.severity,
      symptoms: JSON.parse(row.symptoms || "[]"),
      notes: row.notes,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  static async update(
    id: string,
    data: Partial<Omit<Allergy, "id" | "userId" | "createdAt">>,
  ): Promise<Allergy> {
    const now = new Date().toISOString();
    const updates: string[] = [];
    const values: any[] = [];

    if (data.name !== undefined) {
      updates.push("allergen = ?");
      values.push(data.name);
    }
    if (data.category !== undefined) {
      updates.push("category = ?");
      values.push(data.category);
    }
    if (data.severity !== undefined) {
      updates.push("severity = ?");
      values.push(data.severity);
    }
    if (data.symptoms !== undefined) {
      updates.push("symptoms = ?");
      values.push(JSON.stringify(data.symptoms));
    }
    if (data.notes !== undefined) {
      updates.push("notes = ?");
      values.push(data.notes);
    }

    updates.push("updatedAt = ?");
    values.push(now);
    values.push(id);

    await dbManager.update(
      `UPDATE allergies SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );

    const updated = await this.getById(id);
    if (!updated) throw new Error("Allergy not found after update");
    return updated;
  }

  static async delete(id: string): Promise<boolean> {
    await dbManager.delete("DELETE FROM allergies WHERE id = ?", [id]);
    return true;
  }
}
