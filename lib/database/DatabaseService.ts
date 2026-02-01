import {
  Allergy,
  AppNotification,
  Appointment,
  GlucoseMeasurement,
  ICEProfile,
  Medication,
  MenstrualCycle,
  User,
  VitalMeasurement,
} from "../../types";
import { dbManager } from "./DatabaseManager";
import {
  AllergyService,
  AppointmentService,
  AuthService,
  GlucoseService,
  ICEProfileService,
  MedicationService,
  MenstrualService,
  NotificationService,
  VitalsService,
} from "./services";

export class DatabaseService {
  static async initializeDatabase(): Promise<void> {
    await dbManager.initialize();
  }

  // =====================
  // Authentication Methods
  // =====================
  static async registerUser(data: {
    password: string;
    name: string;
  }): Promise<User> {
    return await AuthService.register(data);
  }

  static async loginUser(password: string): Promise<User | null> {
    return await AuthService.login(password);
  }

  static async updateUserProfile(
    userId: string,
    data: Partial<Pick<User, "name" | "email" | "dateOfBirth" | "phone">>,
  ): Promise<User | null> {
    return await AuthService.updateProfile(userId, data);
  }

  static async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    return await AuthService.changePassword(
      userId,
      currentPassword,
      newPassword,
    );
  }

  static async deleteAccount(userId: string): Promise<boolean> {
    return await AuthService.deleteAccount(userId);
  }

  // =====================
  // Data Loading
  // =====================
  static async loadUserData(userId: string) {
    const [
      appointments,
      medications,
      vitalMeasurements,
      glucoseMeasurements,
      allergies,
      menstrualCycles,
      iceProfile,
      notifications,
    ] = await Promise.all([
      AppointmentService.getAll(userId),
      MedicationService.getAll(userId),
      VitalsService.getAll(userId),
      GlucoseService.getAll(userId),
      AllergyService.getAll(userId),
      MenstrualService.getAll(userId),
      ICEProfileService.get(userId),
      NotificationService.getAll(userId),
    ]);

    return {
      appointments,
      medications,
      vitalMeasurements,
      glucoseMeasurements,
      allergies,
      menstrualCycles,
      iceProfile,
      notifications,
    };
  }

  // =====================
  // Medication Methods
  // =====================

  static async addMedication(
    userId: string,
    data: Omit<Medication, "id" | "userId" | "createdAt" | "updatedAt">,
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

  // =====================
  // Menstrual Cycle Methods
  // =====================
  static async addMenstrualCycle(
    userId: string,
    data: Omit<MenstrualCycle, "id" | "createdAt" | "updatedAt">,
  ): Promise<MenstrualCycle> {
    return await MenstrualService.create(userId, data);
  }

  static async getMenstrualCycles(userId: string): Promise<MenstrualCycle[]> {
    return await MenstrualService.getAll(userId);
  }

  static async updateMenstrualCycle(
    id: string,
    data: Partial<Omit<MenstrualCycle, "id" | "userId" | "createdAt">>,
  ): Promise<MenstrualCycle> {
    return await MenstrualService.update(id, data);
  }

  static async deleteMenstrualCycle(id: string): Promise<boolean> {
    return await MenstrualService.delete(id);
  }

  // =====================
  // ICE Profile Methods
  // =====================
  static async getICEProfile(userId?: string): Promise<ICEProfile | null> {
    return await ICEProfileService.get(userId);
  }

  static async saveICEProfile(
    userId: string,
    data: Omit<ICEProfile, "id" | "userId" | "createdAt" | "updatedAt">,
  ): Promise<ICEProfile> {
    return await ICEProfileService.createOrUpdate(userId, data);
  }

  static async deleteICEProfile(userId: string): Promise<boolean> {
    return await ICEProfileService.delete(userId);
  }

  // =====================
  // Notification Methods
  // =====================
  static async addNotification(
    userId: string,
    data: Omit<
      AppNotification,
      "id" | "userId" | "createdAt" | "isRead" | "readAt"
    >,
  ): Promise<AppNotification> {
    return await NotificationService.create(userId, data);
  }

  static async getNotifications(userId: string): Promise<AppNotification[]> {
    return await NotificationService.getAll(userId);
  }

  static async getUnreadNotifications(
    userId: string,
  ): Promise<AppNotification[]> {
    return await NotificationService.getUnread(userId);
  }

  static async markNotificationAsRead(id: string): Promise<boolean> {
    return await NotificationService.markAsRead(id);
  }

  static async markAllNotificationsAsRead(userId: string): Promise<void> {
    return await NotificationService.markAllAsRead(userId);
  }

  static async deleteNotification(id: string): Promise<boolean> {
    return await NotificationService.delete(id);
  }

  static async getUnreadNotificationCount(userId: string): Promise<number> {
    return await NotificationService.getUnreadCount(userId);
  }

  // =====================
  // Utility Methods
  // =====================
  static async clearAllData(): Promise<void> {
    return await dbManager.clearAllData();
  }
}
