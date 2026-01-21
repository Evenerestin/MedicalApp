import { Allergy, AllergyCategory, AllergySeverity } from "../../../types";
import { AllergyRepository } from "../repositories";

export class AllergyService {
  static async create(
    userId: string,
    data: Omit<Allergy, "id" | "createdAt" | "updatedAt">,
  ): Promise<Allergy> {
    return await AllergyRepository.create(userId, data);
  }

  static async getAll(userId: string): Promise<Allergy[]> {
    return await AllergyRepository.getByUserId(userId);
  }

  static async getById(id: string): Promise<Allergy | null> {
    return await AllergyRepository.getById(id);
  }

  static async update(
    id: string,
    data: Partial<Omit<Allergy, "id" | "userId" | "createdAt">>,
  ): Promise<Allergy> {
    return await AllergyRepository.update(id, data);
  }

  static async delete(id: string): Promise<boolean> {
    return await AllergyRepository.delete(id);
  }

  static async getByCategory(
    userId: string,
    category: AllergyCategory,
  ): Promise<Allergy[]> {
    const all = await AllergyRepository.getByUserId(userId);
    return all.filter((allergy) => allergy.category === category);
  }

  static async getBySeverity(
    userId: string,
    severity: AllergySeverity,
  ): Promise<Allergy[]> {
    const all = await AllergyRepository.getByUserId(userId);
    return all.filter((allergy) => allergy.severity === severity);
  }

  static async getCritical(userId: string): Promise<Allergy[]> {
    return await this.getBySeverity(userId, "severe");
  }

  static async getGroupedByCategory(
    userId: string,
  ): Promise<Record<AllergyCategory, Allergy[]>> {
    const all = await AllergyRepository.getByUserId(userId);

    const grouped: Record<string, Allergy[]> = {
      food: [],
      medication: [],
      environmental: [],
      chemical: [],
    };

    all.forEach((allergy) => {
      grouped[allergy.category].push(allergy);
    });

    return grouped as Record<AllergyCategory, Allergy[]>;
  }

  static async search(userId: string, query: string): Promise<Allergy[]> {
    const all = await AllergyRepository.getByUserId(userId);
    const lowerQuery = query.toLowerCase();

    return all.filter((allergy) =>
      allergy.name.toLowerCase().includes(lowerQuery),
    );
  }

  static async getMedicationAllergies(userId: string): Promise<Allergy[]> {
    return await this.getByCategory(userId, "medication");
  }
}
