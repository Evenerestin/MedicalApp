/**
 * Allergy Service
 * Handles all allergy-related database operations
 */

import { Allergy, AllergyCategory, AllergySeverity } from "../../../types";
import { AllergyRepository } from "../repositories";

export class AllergyService {
  /**
   * Add a new allergy
   */
  static async create(
    userId: string,
    data: Omit<Allergy, "id" | "createdAt" | "updatedAt">
  ): Promise<Allergy> {
    return await AllergyRepository.create(userId, data);
  }

  /**
   * Get all allergies for a user
   */
  static async getAll(userId: string): Promise<Allergy[]> {
    return await AllergyRepository.getByUserId(userId);
  }

  /**
   * Get a single allergy by ID
   */
  static async getById(id: string): Promise<Allergy | null> {
    return await AllergyRepository.getById(id);
  }

  /**
   * Update an existing allergy
   */
  static async update(
    id: string,
    data: Partial<Omit<Allergy, "id" | "userId" | "createdAt">>
  ): Promise<Allergy> {
    return await AllergyRepository.update(id, data);
  }

  /**
   * Delete an allergy
   */
  static async delete(id: string): Promise<boolean> {
    return await AllergyRepository.delete(id);
  }

  /**
   * Get allergies by category
   */
  static async getByCategory(
    userId: string,
    category: AllergyCategory
  ): Promise<Allergy[]> {
    const all = await AllergyRepository.getByUserId(userId);
    return all.filter((allergy) => allergy.category === category);
  }

  /**
   * Get allergies by severity
   */
  static async getBySeverity(
    userId: string,
    severity: AllergySeverity
  ): Promise<Allergy[]> {
    const all = await AllergyRepository.getByUserId(userId);
    return all.filter((allergy) => allergy.severity === severity);
  }

  /**
   * Get critical allergies (severe only)
   */
  static async getCritical(userId: string): Promise<Allergy[]> {
    return await this.getBySeverity(userId, "severe");
  }

  /**
   * Get allergies grouped by category
   */
  static async getGroupedByCategory(
    userId: string
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

  /**
   * Search allergies by name
   */
  static async search(userId: string, query: string): Promise<Allergy[]> {
    const all = await AllergyRepository.getByUserId(userId);
    const lowerQuery = query.toLowerCase();

    return all.filter((allergy) =>
      allergy.name.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Get medication allergies (important for prescriptions)
   */
  static async getMedicationAllergies(userId: string): Promise<Allergy[]> {
    return await this.getByCategory(userId, "medication");
  }
}
