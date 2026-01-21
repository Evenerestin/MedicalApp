import { ReminderType } from "./reminder";

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
