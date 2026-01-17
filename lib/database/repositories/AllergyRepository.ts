/**
 * Allergy Repository
 */

import { v4 as uuidv4 } from "uuid";
import { Allergy } from "../../../types";
import { dbManager } from "../DatabaseManager";

export class AllergyRepository {
  static async create(
    userId: string,
    data: Omit<Allergy, "id" | "createdAt" | "updatedAt">
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
      ]
    );

    return { id, ...data, userId, createdAt: now, updatedAt: now };
  }

  static async getByUserId(userId: string): Promise<Allergy[]> {
    const allergies = await dbManager.getAll<any>(
      "SELECT * FROM allergies WHERE userId = ? ORDER BY category, allergen",
      [userId]
    );
    return allergies;
  }

  static async getByCategory(
    userId: string,
    category: string
  ): Promise<Allergy[]> {
    const allergies = await dbManager.getAll<any>(
      "SELECT * FROM allergies WHERE userId = ? AND category = ? ORDER BY allergen",
      [userId, category]
    );
    return allergies;
  }

  static async update(
    id: string,
    data: Partial<Omit<Allergy, "id" | "userId" | "createdAt">>
  ): Promise<Allergy> {
    const updates: string[] = [];
    const params: (string | number)[] = [];

    if (data.name !== undefined) {
      updates.push("allergen = ?");
      params.push(data.name);
    }
    if (data.category !== undefined) {
      updates.push("category = ?");
      params.push(data.category);
    }
    if (data.severity !== undefined) {
      updates.push("severity = ?");
      params.push(data.severity);
    }
    if (data.symptoms !== undefined) {
      updates.push("symptoms = ?");
      params.push(JSON.stringify(data.symptoms));
    }
    if (data.notes !== undefined) {
      updates.push("notes = ?");
      params.push(data.notes);
    }

    updates.push("updatedAt = ?");
    params.push(new Date().toISOString());
    params.push(id);

    await dbManager.update(
      `UPDATE allergies SET ${updates.join(", ")} WHERE id = ?`,
      params
    );

    const updated = await this.getById(id);
    if (!updated) throw new Error("Allergy not found");
    return updated;
  }

  static async delete(id: string): Promise<boolean> {
    const changes = await dbManager.delete(
      "DELETE FROM allergies WHERE id = ?",
      [id]
    );
    return changes > 0;
  }

  static async getById(id: string): Promise<Allergy | null> {
    return await dbManager.getOne<Allergy>(
      "SELECT * FROM allergies WHERE id = ?",
      [id]
    );
  }
}
