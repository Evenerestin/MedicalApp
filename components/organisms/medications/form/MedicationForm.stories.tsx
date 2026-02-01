import type { Meta, StoryObj } from "@storybook/react";
import { MedicationForm } from "./MedicationForm";

const meta: Meta<typeof MedicationForm> = {
  title: "Medications/MedicationForm",
  component: MedicationForm,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onSave: { action: "save" },
    onDelete: { action: "delete" },
    onCancel: { action: "cancel" },
  },
};

export default meta;

type Story = StoryObj<typeof MedicationForm>;

export const AddMode: Story = {
  args: {
    mode: "add",
  },
};

export const EditMode: Story = {
  args: {
    mode: "edit",
    initialData: {
      name: "Aspirin",
      dosage: "100",
      unit: "mg",
      frequency: "twice_daily",
      times: ["08:00", "20:00"],
      notes: "Take with food",
      remindersEnabled: true,
    },
  },
};

export const Loading: Story = {
  args: {
    mode: "add",
    isLoading: true,
  },
};
