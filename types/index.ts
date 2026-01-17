export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserRegistration extends UserCredentials {
  firstName: string;
  lastName: string;
}

export interface Appointment {
  id: string;
  userId: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  address?: string;
  doctorName?: string;
  reminders: ReminderType[];
  createdAt: string;
  updatedAt: string;
}

export type ReminderType = "day" | "week" | "month";

export interface Medication {
  id: string;
  userId: string;
  name: string;
  dosage: string;
  unit: MedicationUnit;
  frequency: MedicationFrequency;
  times: string[];
  isActive: boolean;
  startDate: string;
  endDate?: string;
  notes?: string;
  remindersEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export type MedicationUnit = "mg" | "ml" | "g" | "units" | "tablets" | "drops";

export type MedicationFrequency =
  | "once_daily"
  | "twice_daily"
  | "three_times_daily"
  | "four_times_daily"
  | "weekly"
  | "as_needed";

export interface MedicationDose {
  id: string;
  medicationId: string;
  scheduledTime: string;
  takenAt?: string;
  skipped: boolean;
  notes?: string;
}

export interface VitalMeasurement {
  id: string;
  userId: string;
  type: VitalType;
  value: number;
  secondaryValue?: number;
  unit: string;
  measuredAt: string;
  notes?: string;
  createdAt: string;
}

export type VitalType =
  | "blood_pressure"
  | "heart_rate"
  | "temperature"
  | "weight"
  | "oxygen_saturation"
  | "respiratory_rate";

export interface VitalTypeConfig {
  type: VitalType;
  label: string;
  unit: string;
  icon: string;
  minValue: number;
  maxValue: number;
  hasSecondaryValue?: boolean;
  secondaryLabel?: string;
}

export interface GlucoseMeasurement {
  id: string;
  userId: string;
  value: number;
  unit: GlucoseUnit;
  tag: GlucoseTag;
  insulinDose?: number;
  insulinType?: InsulinType;
  measuredAt: string;
  notes?: string;
  createdAt: string;
}

export type GlucoseUnit = "mg/dL" | "mmol/L";

export type GlucoseTag =
  | "fasting"
  | "before_meal"
  | "after_meal"
  | "before_sleep"
  | "night"
  | "other";

export type InsulinType = "rapid" | "short" | "intermediate" | "long" | "mixed";

// Allergies Types
export interface Allergy {
  id: string;
  userId: string;
  name: string;
  category: AllergyCategory;
  severity: AllergySeverity;
  symptoms?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type AllergyCategory =
  | "food"
  | "medication"
  | "environmental"
  | "chemical";

export type AllergySeverity = "mild" | "moderate" | "severe";

export interface EnvironmentalAllergyEntry {
  id: string;
  userId: string;
  allergyId: string;
  date: string;
  intensity: number;
  symptoms?: string;
  treatment?: string;
  createdAt: string;
}

export interface MenstrualCycle {
  id: string;
  userId: string;
  startDate: string;
  endDate?: string;
  cycleLength?: number;
  periodLength?: number;
  symptoms?: MenstrualSymptom[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type MenstrualSymptom =
  | "cramps"
  | "headache"
  | "bloating"
  | "fatigue"
  | "mood_swings"
  | "breast_tenderness"
  | "acne"
  | "back_pain";

export interface MenstrualPrediction {
  nextPeriodStart: string;
  nextPeriodEnd: string;
  fertileWindowStart: string;
  fertileWindowEnd: string;
  ovulationDate: string;
  averageCycleLength: number;
  averagePeriodLength: number;
}

export interface ICEProfile {
  id: string;
  userId: string;
  bloodType?: BloodType;
  allergies: string[];
  medications: string[];
  medicalConditions: string[];
  emergencyContacts: EmergencyContact[];
  organDonor?: boolean;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

export type BloodType =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-"
  | "unknown";

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  referenceId?: string;
  referenceType?: "appointment" | "medication" | "measurement";
  scheduledFor: string;
  sentAt?: string;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

export type NotificationType =
  | "appointment_reminder"
  | "medication_reminder"
  | "measurement_reminder"
  | "cycle_prediction"
  | "medication"
  | "appointment"
  | "vital"
  | "glucose"
  | "menstrual";

export interface AppSettings {
  userId: string;
  showMenstrualCalendar: boolean;
  notificationsEnabled: boolean;
  glucoseUnit: GlucoseUnit;
  theme: "light" | "dark" | "system";
  language: string;
}

export type ChartPeriod = "week" | "month" | "year";

export interface ChartDataPoint {
  date: string;
  value: number;
  secondaryValue?: number;
}
