/**
 * Database Type Definitions
 * Types that map directly to database tables
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  birthDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  userId: string;
  title: string;
  date: string;
  time: string;
  doctorName?: string;
  address?: string;
  reminders?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Medication {
  id: string;
  userId: string;
  name: string;
  dosage: string;
  unit: string;
  frequency: string;
  times?: string[];
  remindersEnabled: boolean;
  notes?: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VitalMeasurement {
  id: string;
  userId: string;
  type: "blood_pressure" | "weight" | "glucose";
  value: number;
  secondaryValue?: number;
  tertiaryValue?: number;
  unit?: string;
  tag?: string;
  insulinDose?: number;
  notes?: string;
  measuredAt: string;
  createdAt: string;
}

export interface MenstrualCycle {
  id: string;
  userId: string;
  startDate: string;
  endDate?: string;
  cycleDuration?: number;
  flowIntensity?: string;
  symptoms?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Allergy {
  id: string;
  userId: string;
  name: string;
  category: "food" | "medication" | "environmental" | "chemical";
  severity: "mild" | "moderate" | "severe";
  symptoms?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AllergyLog {
  id: string;
  userId: string;
  allergyId: string;
  date: string;
  intensity?: number;
  symptoms?: string;
  treatment?: string;
  notes?: string;
  createdAt: string;
}

export interface ICEProfile {
  id: string;
  userId: string;
  bloodType?: string;
  organDonor?: boolean;
  medicalConditions?: string;
  emergencyContact1Name?: string;
  emergencyContact1Phone?: string;
  emergencyContact1Relation?: string;
  emergencyContact2Name?: string;
  emergencyContact2Phone?: string;
  emergencyContact2Relation?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message?: string;
  type?: string;
  relatedId?: string;
  isRead: boolean;
  createdAt: string;
}
