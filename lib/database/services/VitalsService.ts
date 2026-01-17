/**
 * Vitals Service
 * Handles all vital measurement database operations
 */

import { VitalMeasurement, VitalType } from "../../../types";
import { VitalsRepository } from "../repositories";

export class VitalsService {
  /**
   * Add a new vital measurement
   */
  static async create(
    userId: string,
    data: Omit<VitalMeasurement, "id" | "createdAt">
  ): Promise<VitalMeasurement> {
    return await VitalsRepository.create(userId, data);
  }

  /**
   * Get all vital measurements for a user
   */
  static async getAll(userId: string): Promise<VitalMeasurement[]> {
    return await VitalsRepository.getByUserId(userId);
  }

  /**
   * Get recent vital measurements
   */
  static async getRecent(
    userId: string,
    days: number = 7
  ): Promise<VitalMeasurement[]> {
    return await VitalsRepository.getRecent(userId, days);
  }

  /**
   * Get a single measurement by ID
   */
  static async getById(id: string): Promise<VitalMeasurement | null> {
    return await VitalsRepository.getById(id);
  }

  /**
   * Update a vital measurement
   */
  static async update(
    id: string,
    data: Partial<Omit<VitalMeasurement, "id" | "userId" | "createdAt">>
  ): Promise<VitalMeasurement> {
    return await VitalsRepository.update(id, data);
  }

  /**
   * Delete a vital measurement
   */
  static async delete(id: string): Promise<boolean> {
    return await VitalsRepository.delete(id);
  }

  /**
   * Get measurements by type (blood_pressure, heart_rate, etc.)
   */
  static async getByType(
    userId: string,
    type: VitalType
  ): Promise<VitalMeasurement[]> {
    const all = await VitalsRepository.getByUserId(userId);
    return all.filter((measurement) => measurement.type === type);
  }

  /**
   * Get measurements within a date range
   */
  static async getByDateRange(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<VitalMeasurement[]> {
    const all = await VitalsRepository.getByUserId(userId);
    return all.filter(
      (m) => m.measuredAt >= startDate && m.measuredAt <= endDate
    );
  }

  /**
   * Get latest measurement of each type
   */
  static async getLatestByType(
    userId: string
  ): Promise<Record<VitalType, VitalMeasurement | null>> {
    const all = await VitalsRepository.getByUserId(userId);

    const types: VitalType[] = [
      "blood_pressure",
      "heart_rate",
      "temperature",
      "weight",
      "oxygen_saturation",
      "respiratory_rate",
    ];

    const result: Record<string, VitalMeasurement | null> = {};

    types.forEach((type) => {
      const measurements = all.filter((m) => m.type === type);
      if (measurements.length > 0) {
        result[type] = measurements[0]; // Already sorted by date DESC
      } else {
        result[type] = null;
      }
    });

    return result as Record<VitalType, VitalMeasurement | null>;
  }

  /**
   * Get average value for a specific vital type
   */
  static async getAverageByType(
    userId: string,
    type: VitalType,
    days: number = 7
  ): Promise<number> {
    const recent = await this.getRecent(userId, days);
    const filtered = recent.filter((m) => m.type === type);

    if (filtered.length === 0) return 0;

    const sum = filtered.reduce((acc, m) => acc + m.value, 0);
    return Math.round(sum / filtered.length);
  }
}
