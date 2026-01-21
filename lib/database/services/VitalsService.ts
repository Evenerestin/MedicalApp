import { VitalMeasurement, VitalType } from "../../../types";
import { VitalsRepository } from "../repositories";

export class VitalsService {
  static async create(
    userId: string,
    data: Omit<VitalMeasurement, "id" | "createdAt">,
  ): Promise<VitalMeasurement> {
    return await VitalsRepository.create(userId, data);
  }

  static async getAll(userId: string): Promise<VitalMeasurement[]> {
    return await VitalsRepository.getByUserId(userId);
  }

  static async getRecent(
    userId: string,
    days: number = 7,
  ): Promise<VitalMeasurement[]> {
    return await VitalsRepository.getRecent(userId, days);
  }

  static async getById(id: string): Promise<VitalMeasurement | null> {
    return await VitalsRepository.getById(id);
  }

  static async update(
    id: string,
    data: Partial<Omit<VitalMeasurement, "id" | "userId" | "createdAt">>,
  ): Promise<VitalMeasurement> {
    return await VitalsRepository.update(id, data);
  }

  static async delete(id: string): Promise<boolean> {
    return await VitalsRepository.delete(id);
  }

  static async getByType(
    userId: string,
    type: VitalType,
  ): Promise<VitalMeasurement[]> {
    const all = await VitalsRepository.getByUserId(userId);
    return all.filter((measurement) => measurement.type === type);
  }

  static async getByDateRange(
    userId: string,
    startDate: string,
    endDate: string,
  ): Promise<VitalMeasurement[]> {
    const all = await VitalsRepository.getByUserId(userId);
    return all.filter(
      (m) => m.measuredAt >= startDate && m.measuredAt <= endDate,
    );
  }

  static async getLatestByType(
    userId: string,
  ): Promise<Record<VitalType, VitalMeasurement | null>> {
    const all = await VitalsRepository.getByUserId(userId);

    const types: VitalType[] = ["blood_pressure", "weight", "glucose"];

    const result: Record<string, VitalMeasurement | null> = {};

    types.forEach((type) => {
      const measurements = all.filter((m) => m.type === type);
      if (measurements.length > 0) {
        result[type] = measurements[0];
      } else {
        result[type] = null;
      }
    });

    return result as Record<VitalType, VitalMeasurement | null>;
  }

  static async getAverageByType(
    userId: string,
    type: VitalType,
    days: number = 7,
  ): Promise<number> {
    const recent = await this.getRecent(userId, days);
    const filtered = recent.filter((m) => m.type === type);

    if (filtered.length === 0) return 0;

    const sum = filtered.reduce((acc, m) => acc + m.value, 0);
    return Math.round(sum / filtered.length);
  }
}
