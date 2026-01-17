import type { Meta, StoryObj } from "@storybook/react";
import { Medication } from "../../../types";
import { MedicationsList } from "./MedicationsList";

const mockMedications: Medication[] = [
  {
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
  },
  {
    id: "2",
    userId: "user1",
    name: "Vitamin D",
    dosage: "1000",
    unit: "units",
    frequency: "once_daily",
    times: ["09:00"],
    isActive: true,
    startDate: "2024-01-01",
    remindersEnabled: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "3",
    userId: "user1",
    name: "Ibuprofen",
    dosage: "400",
    unit: "mg",
    frequency: "as_needed",
    times: [],
    isActive: false,
    startDate: "2024-01-01",
    remindersEnabled: false,
    notes: "For headaches only",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
];

const meta: Meta<typeof MedicationsList> = {
  title: "Medications/MedicationsList",
  component: MedicationsList,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onAddPress: { action: "addPressed" },
    onMedicationPress: { action: "medicationPressed" },
    onToggleActive: { action: "toggleActive" },
    onEdit: { action: "edit" },
    onDelete: { action: "delete" },
  },
};

export default meta;

type Story = StoryObj<typeof MedicationsList>;

export const Default: Story = {
  args: {
    medications: mockMedications,
  },
};

export const Empty: Story = {
  args: {
    medications: [],
  },
};

export const ActiveOnly: Story = {
  args: {
    medications: mockMedications,
    showInactive: false,
  },
};
