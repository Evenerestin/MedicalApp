import type { Meta, StoryObj } from "@storybook/react";
import { Medication } from "../../../types";
import { MedicationCard } from "./MedicationCard";

const mockMedication: Medication = {
  id: "1",
  userId: "user1",
  name: "Aspirin",
  dosage: "100",
  unit: "mg",
  frequency: "twice_daily",
  times: ["08:00", "20:00"],
  isActive: true,
  startDate: "2024-01-01",
  remindersEnabled: true,
  notes: "Take with food",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
};

const meta: Meta<typeof MedicationCard> = {
  title: "Medications/MedicationCard",
  component: MedicationCard,
  argTypes: {
    onPress: { action: "pressed" },
    onToggleActive: { action: "toggleActive" },
    onEdit: { action: "edit" },
    onDelete: { action: "delete" },
  },
};

export default meta;

type Story = StoryObj<typeof MedicationCard>;

export const Active: Story = {
  args: {
    medication: mockMedication,
  },
};

export const Inactive: Story = {
  args: {
    medication: {
      ...mockMedication,
      isActive: false,
    },
  },
};

export const WithoutReminders: Story = {
  args: {
    medication: {
      ...mockMedication,
      remindersEnabled: false,
    },
  },
};

export const AsNeeded: Story = {
  args: {
    medication: {
      ...mockMedication,
      frequency: "as_needed",
      times: [],
    },
  },
};
