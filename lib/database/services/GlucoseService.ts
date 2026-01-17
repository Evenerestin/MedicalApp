/**
 * Glucose Service
 * Handles all glucose measurement database operations
 */

import { GlucoseMeasurement, GlucoseTag } from "../../../types";
import { GlucoseRepository } from "../repositories";

export class GlucoseService {
  /**
   * Add a new glucose measurement
   */
  static async create(
    userId: string,
    data: Omit<GlucoseMeasurement, "id" | "createdAt">
  ): Promise<GlucoseMeasurement> {
    return await GlucoseRepository.create(userId, data);
  }

  /**
   * Get all glucose measurements for a user
   */
  static async getAll(userId: string): Promise<GlucoseMeasurement[]> {
    return await GlucoseRepository.getByUserId(userId);
  }

  /**
   * Get recent glucose measurements
   */
  static async getRecent(
    userId: string,
    days: number = 7
  ): Promise<GlucoseMeasurement[]> {
    return await GlucoseRepository.getRecent(userId, days);
  }

  /**
   * Get a single measurement by ID
   */
  static async getById(id: string): Promise<GlucoseMeasurement | null> {
    return await GlucoseRepository.getById(id);
  }

  /**
   * Update a glucose measurement
   */
  static async update(
    id: string,
    data: Partial<Omit<GlucoseMeasurement, "id" | "userId" | "createdAt">>
  ): Promise<GlucoseMeasurement> {
    return await GlucoseRepository.update(id, data);
  }

  /**
   * Delete a glucose measurement
   */
  static async delete(id: string): Promise<boolean> {
    return await GlucoseRepository.delete(id);
  }

  /**
   * Get measurements by tag (fasting, before_meal, etc.)
   */
  static async getByTag(
    userId: string,
    tag: GlucoseTag
  ): Promise<GlucoseMeasurement[]> {
    const all = await GlucoseRepository.getByUserId(userId);
    return all.filter((measurement) => measurement.tag === tag);
  }

  /**
   * Get measurements within a date range
   */
  static async getByDateRange(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<GlucoseMeasurement[]> {
    const all = await GlucoseRepository.getByUserId(userId);
    return all.filter(
      (m) => m.measuredAt >= startDate && m.measuredAt <= endDate
    );
  }

  /**
   * Calculate average glucose for a period
   */
  static async getAverage(userId: string, days: number = 7): Promise<number> {
    const measurements = await GlucoseRepository.getRecent(userId, days);
    if (measurements.length === 0) return 0;

    const sum = measurements.reduce((acc, m) => acc + m.value, 0);
    return Math.round(sum / measurements.length);
  }

  /**
   * Get highest and lowest readings
   */
  static async getMinMax(
    userId: string,
    days: number = 7
  ): Promise<{ min: number; max: number }> {
    const measurements = await GlucoseRepository.getRecent(userId, days);
    if (measurements.length === 0) return { min: 0, max: 0 };

    const values = measurements.map((m) => m.value);
    return {
      min: Math.min(...values),
      max: Math.max(...values),
    };
  }
}
