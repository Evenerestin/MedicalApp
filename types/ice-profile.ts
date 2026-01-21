type BloodType = "A" | "B" | "AB" | "O";
type RhType = "-" | "+";

export interface ICEProfile {
  id: string;
  userId: string;
  bloodType?: BloodType;
  RhType?: RhType;
  allergies: string[];
  medications: string[];
  medicalConditions: string[];
  emergencyContacts: EmergencyContact[];
  organDonor?: boolean;
  additionalInformation?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isPrimary: boolean;
}
