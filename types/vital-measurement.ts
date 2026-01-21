type VitalType = "bp_rp" | "weight" | "glucose";

type GlucoseUnit = "mg/dL" | "mmol/L";

type GlucoseTag =
  | "fasting"
  | "before_meal"
  | "after_meal"
  | "before_sleep"
  | "night"
  | "other";

type InsulinType = "rapid" | "short" | "intermediate" | "long" | "mixed";

export interface VitalMeasurement {
  id: string;
  userId: string;
  type: VitalType;
  value: number;
  secondaryValue?: number;
  tertiaryValue?: number;
  unit: string;
  measuredAt: string;
  notes?: string;
  createdAt: string;
}

interface MeasurementTypeConfig {
  type: VitalType;
  label: string;
  unit: string;
  icon: string;
  minValue: number;
  maxValue: number;
  hasSecondaryValue?: boolean;
  secondaryLabel?: string;
}

interface GlucoseMeasurement {
  value: number;
  unit: GlucoseUnit;
  tag: GlucoseTag;
  insulinDose?: number;
  insulinType?: InsulinType;
  measuredAt: string;
  notes?: string;
  createdAt: string;
}
