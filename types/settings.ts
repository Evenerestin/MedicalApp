export interface AppSettings {
  userId: string;
  notificationsEnabled: boolean;
  showMenstrualCalendar: boolean;
  showICEProfile: boolean;
  glucoseUnit: GlucoseUnit;
  theme: "light" | "dark" | "system";
  language: string;
}
