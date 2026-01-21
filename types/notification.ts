type ReminderType =
  | "appointment"
  | "medication"
  | "measurement"
  | "cycle_prediction";

export interface AppNotification {
  id: string;
  userId: string;
  type: ReminderType;
  title: string;
  message: string;
  referenceId?: string;
  scheduledFor: string;
  sentAt?: string;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}
