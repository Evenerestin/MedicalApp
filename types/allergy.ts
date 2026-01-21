type AllergyCategory = "food" | "medication" | "environmental" | "chemical";

type AllergySeverity = "mild" | "moderate" | "severe";

export interface Allergy {
  id: string;
  userId: string;
  allergyId: string;
  name: string;
  category: AllergyCategory;
  severity: AllergySeverity;
  symptoms?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
