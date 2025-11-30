import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { fn } from "storybook/test";
import { Form } from "./Form";

const meta = {
  title: "Components/Appointments/Form",
  component: Form,
  args: {
    onSave: fn(),
    onDelete: fn(),
    onCancel: fn(),
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#f5f5f5" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Add: Story = {
  args: {
    mode: "add",
  },
};

export const Edit: Story = {
  args: {
    mode: "edit",
    initialData: {
      title: "Doctor Appointment",
      description: "Annual checkup with Dr. Smith",
      date: new Date(2025, 11, 15),
      time: "10:00",
      address: "123 Medical Center Drive, Suite 200",
      doctor: "Dr. John Smith",
      reminders: ["day", "week"],
    },
  },
};

export const EditEmpty: Story = {
  args: {
    mode: "edit",
  },
};

export const AddWithoutCancel: Story = {
  args: {
    mode: "add",
    onCancel: undefined,
  },
};

export const EditWithoutDelete: Story = {
  args: {
    mode: "edit",
    initialData: {
      title: "Team Meeting",
      description: "Weekly sync",
      date: new Date(2025, 11, 20),
      time: "14:00",
      address: "Office Building, Conference Room A",
      doctor: "N/A",
      reminders: ["day"],
    },
    onDelete: undefined,
  },
};
