type MedicationUnit = "mg" | "ml" | "g" | "units" | "tablets" | "drops";

type MedicationFrequency =
  | "once_daily"
  | "twice_daily"
  | "three_times_daily"
  | "four_times_daily"
  | "weekly"
  | "as_needed";

interface MedicationDose {
  id: string;
  medicationId: string;
  scheduledTime: string;
  takenAt?: string;
  skipped: boolean;
  notes?: string;
}

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
