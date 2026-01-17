import { Medication } from "../../../types";
import { MedicationRepository } from "../repositories";

export class MedicationService {
  static async create(
    userId: string,
    data: Omit<Medication, "id" | "createdAt" | "updatedAt">,
  ): Promise<Medication> {
    return await MedicationRepository.create(userId, data);
  }

  static async getAll(userId: string): Promise<Medication[]> {
    return await MedicationRepository.getByUserId(userId);
  }

  static async getActive(userId: string): Promise<Medication[]> {
    return await MedicationRepository.getActiveMedications(userId);
  }

  static async getById(id: string): Promise<Medication | null> {
    return await MedicationRepository.getById(id);
  }

  static async update(
    id: string,
    data: Partial<Omit<Medication, "id" | "userId" | "createdAt">>,
  ): Promise<Medication> {
    return await MedicationRepository.update(id, data);
  }

  static async toggleActive(
    id: string,
    isActive: boolean,
  ): Promise<Medication> {
    return await MedicationRepository.update(id, { isActive });
  }

  static async delete(id: string): Promise<boolean> {
    return await MedicationRepository.delete(id);
  }

  static async getByFrequency(
    userId: string,
    frequency: string,
  ): Promise<Medication[]> {
    const all = await MedicationRepository.getByUserId(userId);
    return all.filter((med) => med.frequency === frequency);
  }

  static async getMedicationsDueNow(
    userId: string,
    currentTime: string,
  ): Promise<Medication[]> {
    const active = await MedicationRepository.getActiveMedications(userId);
    return active.filter(
      (med) => med.remindersEnabled && med.times.includes(currentTime),
    );
  }
}
