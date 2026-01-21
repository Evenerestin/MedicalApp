/**
 * Database Type Definitions
 * Extends main types with database-specific fields
 */

export interface Medication {
  id: string;
  userId: string;
  name: string;
  dosage: string;
  frequency: string;
  route?: string;
  reason?: string;
  startDate?: string;
  endDate?: string;
  active: boolean;
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

export interface GlucoseMeasurement {
  id: string;
  userId: string;
  value: number;
  unit: string;
  mealTime?: string;
  insulinDose?: number;
  notes?: string;
  timestamp: string;
  createdAt: string;
}

export interface VitalMeasurement {
  id: string;
  userId: string;
  type: string;
  value: number;
  secondaryValue?: number;
  tertiaryValue?: number;
  unit?: string;
  notes?: string;
  timestamp: string;
  createdAt: string;
}

export interface Allergy {
  id: string;
  userId: string;
  allergen: string;
  category: string;
  severity: string;
  symptoms?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
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

export interface ICEProfile {
  id: string;
  userId: string;
  bloodType?: string;
  organDonor?: boolean;
  medicalConditions?: string;
  currentMedications?: string;
  allergies?: string;
  emergencyContact1Name?: string;
  emergencyContact1Phone?: string;
  emergencyContact1Relation?: string;
  emergencyContact2Name?: string;
  emergencyContact2Phone?: string;
  emergencyContact2Relation?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  bloodType?: string;
  createdAt: string;
  updatedAt: string;
}
