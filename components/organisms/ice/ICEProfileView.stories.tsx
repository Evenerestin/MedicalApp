import type { Meta, StoryObj } from "@storybook/react";
import { ICEProfile } from "../../types";
import { ICEProfileView } from "./ICEProfileView";

const mockProfile: ICEProfile = {
  id: "1",
  userId: "user1",
  bloodType: "A+",
  allergies: ["Penicillin", "Peanuts", "Latex"],
  medications: ["Aspirin 100mg", "Metformin 500mg"],
  medicalConditions: ["Type 2 Diabetes", "Hypertension"],
  emergencyContacts: [
    {
      id: "1",
      name: "Anna Kowalska",
      relationship: "Spouse",
      phone: "+48 123 456 789",
      isPrimary: true,
    },
    {
      id: "2",
      name: "Jan Kowalski Sr.",
      relationship: "Father",
      phone: "+48 987 654 321",
      isPrimary: false,
    },
  ],
  organDonor: true,
  specialInstructions:
    "Patient has insulin pump. In case of low blood sugar, give orange juice.",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const meta: Meta<typeof ICEProfileView> = {
  title: "ICE/ICEProfileView",
  component: ICEProfileView,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onEdit: { action: "edit" },
    onBack: { action: "back" },
  },
};

export default meta;

type Story = StoryObj<typeof ICEProfileView>;

export const Default: Story = {
  args: {
    profile: mockProfile,
  },
};

export const MinimalProfile: Story = {
  args: {
    profile: {
      ...mockProfile,
      allergies: [],
      medications: [],
      medicalConditions: [],
      emergencyContacts: [mockProfile.emergencyContacts[0]],
      specialInstructions: undefined,
    },
  },
};
