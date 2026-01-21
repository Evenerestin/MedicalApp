export type ChartPeriod = "week" | "month" | "year";

export interface ChartDataPoint {
  date: string;
  value: number;
  secondaryValue?: number;
}