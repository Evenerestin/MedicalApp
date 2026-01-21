type MenstrualSymptom =
  | "cramps"
  | "headache"
  | "bloating"
  | "fatigue"
  | "mood_swings"
  | "breast_tenderness"
  | "acne"
  | "back_pain";

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

export interface MenstrualPrediction {
  nextPeriodStart: string;
  nextPeriodEnd: string;
  fertileWindowStart: string;
  fertileWindowEnd: string;
  ovulationDate: string;
  averageCycleLength: number;
  averagePeriodLength: number;
}
