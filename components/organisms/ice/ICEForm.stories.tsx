import type { Meta, StoryObj } from "@storybook/react";
import { ICEForm } from "./ICEForm";

const meta: Meta<typeof ICEForm> = {
  title: "ICE/ICEForm",
  component: ICEForm,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onSave: { action: "save" },
    onCancel: { action: "cancel" },
  },
};

export default meta;

type Story = StoryObj<typeof ICEForm>;

export const CreateMode: Story = {
  args: {
    mode: "create",
  },
};

export const EditMode: Story = {
  args: {
    mode: "edit",
    initialData: {
      bloodType: "A+",
      allergies: ["Penicillin", "Peanuts"],
      medications: ["Aspirin 100mg"],
      medicalConditions: ["Hypertension"],
      emergencyContacts: [
        {
          id: "1",
          name: "Anna Kowalska",
          relationship: "Spouse",
          phone: "+48 123 456 789",
          isPrimary: true,
        },
      ],
      organDonor: true,
      specialInstructions: "Has insulin pump",
    },
  },
};

export const Loading: Story = {
  args: {
    mode: "create",
    isLoading: true,
  },
};
