import * as Crypto from "expo-crypto";
import { ICEProfile } from "../../../types";
import { dbManager } from "../DatabaseManager";

interface ICEProfileRow {
  id: string;
  userId: string;
  bloodType: string | null;
  organDonor: number;
  medicalConditions: string | null;
  emergencyContact1Name: string | null;
  emergencyContact1Phone: string | null;
  emergencyContact1Relation: string | null;
  emergencyContact2Name: string | null;
  emergencyContact2Phone: string | null;
  emergencyContact2Relation: string | null;
  createdAt: string;
  updatedAt: string;
}

export class ICEProfileService {
  private static mapRowToProfile(
    row: ICEProfileRow,
    userId: string,
  ): ICEProfile {
    const emergencyContacts: ICEProfile["emergencyContacts"] = [];

    if (row.emergencyContact1Name && row.emergencyContact1Phone) {
      emergencyContacts.push({
        id: "contact-1",
        name: row.emergencyContact1Name,
        phone: row.emergencyContact1Phone,
        relationship: row.emergencyContact1Relation || "",
        isPrimary: true,
      });
    }

    if (row.emergencyContact2Name && row.emergencyContact2Phone) {
      emergencyContacts.push({
        id: "contact-2",
        name: row.emergencyContact2Name,
        phone: row.emergencyContact2Phone,
        relationship: row.emergencyContact2Relation || "",
        isPrimary: false,
      });
    }

    return {
      id: row.id,
      userId: userId,
      bloodType: (row.bloodType as ICEProfile["bloodType"]) || undefined,
      organDonor: row.organDonor === 1,
      medicalConditions: row.medicalConditions
        ? JSON.parse(row.medicalConditions)
        : [],
      medications: [],
      allergies: [],
      emergencyContacts,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  static async get(userId?: string): Promise<ICEProfile | null> {
    const db = await dbManager.initialize();

    const query = userId
      ? `SELECT * FROM ice_profile WHERE userId = ?`
      : `SELECT * FROM ice_profile LIMIT 1`;
    const params = userId ? [userId] : [];

    const row = await db.getFirstAsync<ICEProfileRow>(query, params);
    if (!row) return null;

    return this.mapRowToProfile(row, row.userId);
  }

  static async createOrUpdate(
    userId: string,
    data: Omit<ICEProfile, "id" | "userId" | "createdAt" | "updatedAt">,
  ): Promise<ICEProfile> {
    const db = await dbManager.initialize();
    const now = new Date().toISOString();

    const existing = await this.get(userId);

    const contact1 = data.emergencyContacts?.[0];
    const contact2 = data.emergencyContacts?.[1];

    if (existing) {
      await db.runAsync(
        `UPDATE ice_profile SET
          bloodType = ?,
          organDonor = ?,
          medicalConditions = ?,
          emergencyContact1Name = ?,
          emergencyContact1Phone = ?,
          emergencyContact1Relation = ?,
          emergencyContact2Name = ?,
          emergencyContact2Phone = ?,
          emergencyContact2Relation = ?,
          updatedAt = ?
        WHERE userId = ?`,
        [
          data.bloodType || null,
          data.organDonor ? 1 : 0,
          data.medicalConditions
            ? JSON.stringify(data.medicalConditions)
            : null,
          contact1?.name || null,
          contact1?.phone || null,
          contact1?.relationship || null,
          contact2?.name || null,
          contact2?.phone || null,
          contact2?.relationship || null,
          now,
          userId,
        ],
      );

      return {
        ...data,
        id: existing.id,
        userId,
        createdAt: existing.createdAt,
        updatedAt: now,
      };
    }

    const id = Crypto.randomUUID();

    await db.runAsync(
      `INSERT INTO ice_profile (
        id, userId, bloodType, organDonor, medicalConditions,
        emergencyContact1Name, emergencyContact1Phone, emergencyContact1Relation,
        emergencyContact2Name, emergencyContact2Phone, emergencyContact2Relation,
        createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        userId,
        data.bloodType || null,
        data.organDonor ? 1 : 0,
        data.medicalConditions ? JSON.stringify(data.medicalConditions) : null,
        contact1?.name || null,
        contact1?.phone || null,
        contact1?.relationship || null,
        contact2?.name || null,
        contact2?.phone || null,
        contact2?.relationship || null,
        now,
        now,
      ],
    );

    return { ...data, id, userId, createdAt: now, updatedAt: now };
  }

  static async delete(userId: string): Promise<boolean> {
    const db = await dbManager.initialize();
    const result = await db.runAsync(
      `DELETE FROM ice_profile WHERE userId = ?`,
      [userId],
    );
    return result.changes > 0;
  }
}
