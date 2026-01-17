import {
  Allergy,
  Appointment,
  GlucoseMeasurement,
  Medication,
  User,
  VitalMeasurement,
} from "../../types";
import { dbManager } from "./DatabaseManager";
import {
  AllergyService,
  AppointmentService,
  GlucoseService,
  MedicationService,
  VitalsService,
} from "./services";

export class DatabaseService {
  static async initializeDatabase(): Promise<void> {
    await dbManager.initialize();
  }

  static async registerUser(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<User> {
    const id = Math.random().toString(36).substring(2, 15);
    const now = new Date().toISOString();
    const user: User = {
      id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      createdAt: now,
      updatedAt: now,
    };

    const db = await dbManager.initialize();
    await db.runAsync(
      `INSERT INTO users (id, email, firstName, lastName, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user.id,
        user.email,
        user.firstName,
        user.lastName,
        user.createdAt,
        user.updatedAt,
      ],
    );
    return user;
  }

  static async loginUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const db = await dbManager.initialize();
    const result = await db.getFirstAsync<User>(
      `SELECT * FROM users WHERE email = ?`,
      [email],
    );
    if (!result) return null;

    return {
      id: result.id,
      email: result.email,
      firstName: result.firstName,
      lastName: result.lastName,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  static async loadUserData(userId: string) {
    const [
      appointments,
      medications,
      vitalMeasurements,
      glucoseMeasurements,
      allergies,
    ] = await Promise.all([
      AppointmentService.getAll(userId),
      MedicationService.getAll(userId),
      VitalsService.getAll(userId),
      GlucoseService.getAll(userId),
      AllergyService.getAll(userId),
    ]);

    return {
      appointments,
      medications,
      vitalMeasurements,
      glucoseMeasurements,
      allergies,
    };
  }

  static async addMedication(
    userId: string,
    data: Omit<Medication, "id" | "createdAt" | "updatedAt">,
  ): Promise<Medication> {
    return await MedicationService.create(userId, data);
  }

  static async updateMedication(
    id: string,
    data: Partial<Omit<Medication, "id" | "userId" | "createdAt">>,
  ): Promise<Medication> {
    return await MedicationService.update(id, data);
  }

  static async deleteMedication(id: string): Promise<boolean> {
    return await MedicationService.delete(id);
  }

  static async getActiveMedications(userId: string): Promise<Medication[]> {
    return await MedicationService.getActive(userId);
  }

  static async addAppointment(
    userId: string,
    data: Omit<Appointment, "id" | "createdAt" | "updatedAt">,
  ): Promise<Appointment> {
    return await AppointmentService.create(userId, data);
  }

  static async updateAppointment(
    id: string,
    data: Partial<Omit<Appointment, "id" | "userId" | "createdAt">>,
  ): Promise<Appointment> {
    return await AppointmentService.update(id, data);
  }

  static async deleteAppointment(id: string): Promise<boolean> {
    return await AppointmentService.delete(id);
  }

  static async getUpcomingAppointments(userId: string): Promise<Appointment[]> {
    return await AppointmentService.getUpcoming(userId);
  }

  static async addGlucoseMeasurement(
    userId: string,
    data: Omit<GlucoseMeasurement, "id" | "createdAt">,
  ): Promise<GlucoseMeasurement> {
    return await GlucoseService.create(userId, data);
  }

  static async getRecentGlucose(
    userId: string,
    days?: number,
  ): Promise<GlucoseMeasurement[]> {
    return await GlucoseService.getRecent(userId, days);
  }

  static async addVitalMeasurement(
    userId: string,
    data: Omit<VitalMeasurement, "id" | "createdAt">,
  ): Promise<VitalMeasurement> {
    return await VitalsService.create(userId, data);
  }

  static async getRecentVitals(
    userId: string,
    days?: number,
  ): Promise<VitalMeasurement[]> {
    return await VitalsService.getRecent(userId, days);
  }

  static async addAllergy(
    userId: string,
    data: Omit<Allergy, "id" | "createdAt" | "updatedAt">,
  ): Promise<Allergy> {
    return await AllergyService.create(userId, data);
  }

  static async getAllergies(userId: string): Promise<Allergy[]> {
    return await AllergyService.getAll(userId);
  }

  static async updateAllergy(
    id: string,
    data: Partial<Omit<Allergy, "id" | "userId" | "createdAt">>,
  ): Promise<Allergy> {
    return await AllergyService.update(id, data);
  }

  static async deleteAllergy(id: string): Promise<boolean> {
    return await AllergyService.delete(id);
  }

  static async clearAllData(): Promise<void> {
    return await dbManager.clearAllData();
  }
}
