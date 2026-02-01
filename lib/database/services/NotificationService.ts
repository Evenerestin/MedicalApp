// @ts-ignore - expo-crypto is a valid package
import * as Crypto from "expo-crypto";
import { AppNotification } from "../../../types";
import { dbManager } from "../DatabaseManager";

interface NotificationRow {
  id: string;
  userId: string;
  title: string;
  message: string | null;
  type: string | null;
  referenceId: string | null;
  scheduledFor: string;
  sentAt: string | null;
  read: number;
  readAt: string | null;
  createdAt: string;
}

export class NotificationService {
  private static mapRowToNotification(row: NotificationRow): AppNotification {
    return {
      id: row.id,
      userId: row.userId,
      title: row.title,
      message: row.message || "",
      type: (row.type as AppNotification["type"]) || "appointment",
      referenceId: row.referenceId || undefined,
      scheduledFor: row.scheduledFor,
      sentAt: row.sentAt || undefined,
      isRead: row.read === 1,
      readAt: row.readAt || undefined,
      createdAt: row.createdAt,
    };
  }

  static async create(
    userId: string,
    data: Omit<
      AppNotification,
      "id" | "userId" | "createdAt" | "isRead" | "readAt" | "sentAt"
    >,
  ): Promise<AppNotification> {
    const db = await dbManager.initialize();
    const id = Crypto.randomUUID();
    const now = new Date().toISOString();

    await db.runAsync(
      `INSERT INTO app_notifications (id, userId, title, message, type, referenceId, scheduledFor, read, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        userId,
        data.title,
        data.message || null,
        data.type || "appointment",
        data.referenceId || null,
        data.scheduledFor,
        0,
        now,
      ],
    );

    return {
      id,
      userId,
      title: data.title,
      message: data.message,
      type: data.type || "appointment",
      referenceId: data.referenceId,
      scheduledFor: data.scheduledFor,
      isRead: false,
      createdAt: now,
    };
  }

  static async getAll(userId: string): Promise<AppNotification[]> {
    const db = await dbManager.initialize();
    const rows = await db.getAllAsync<NotificationRow>(
      `SELECT * FROM app_notifications WHERE userId = ? ORDER BY createdAt DESC`,
      [userId],
    );
    return rows.map(this.mapRowToNotification);
  }

  static async getUnread(userId: string): Promise<AppNotification[]> {
    const db = await dbManager.initialize();
    const rows = await db.getAllAsync<NotificationRow>(
      `SELECT * FROM app_notifications WHERE userId = ? AND read = 0 ORDER BY createdAt DESC`,
      [userId],
    );
    return rows.map(this.mapRowToNotification);
  }

  static async markAsRead(id: string): Promise<boolean> {
    const db = await dbManager.initialize();
    const now = new Date().toISOString();
    const result = await db.runAsync(
      `UPDATE app_notifications SET read = 1, readAt = ? WHERE id = ?`,
      [now, id],
    );
    return result.changes > 0;
  }

  static async markAllAsRead(userId: string): Promise<void> {
    const db = await dbManager.initialize();
    const now = new Date().toISOString();
    await db.runAsync(
      `UPDATE app_notifications SET read = 1, readAt = ? WHERE userId = ? AND read = 0`,
      [now, userId],
    );
  }

  static async delete(id: string): Promise<boolean> {
    const db = await dbManager.initialize();
    const result = await db.runAsync(
      `DELETE FROM app_notifications WHERE id = ?`,
      [id],
    );
    return result.changes > 0;
  }

  static async deleteAll(userId: string): Promise<void> {
    const db = await dbManager.initialize();
    await db.runAsync(`DELETE FROM app_notifications WHERE userId = ?`, [
      userId,
    ]);
  }

  static async getUnreadCount(userId: string): Promise<number> {
    const db = await dbManager.initialize();
    const result = await db.getFirstAsync<{ count: number }>(
      `SELECT COUNT(*) as count FROM app_notifications WHERE userId = ? AND read = 0`,
      [userId],
    );
    return result?.count || 0;
  }
}
