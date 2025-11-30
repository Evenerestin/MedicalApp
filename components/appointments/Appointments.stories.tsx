import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { fn } from "storybook/test";
import { Appointments } from "./Appointments";

const meta = {
  title: "Components/Appointments/Appointments",
  component: Appointments,
  args: {
    date: new Date(2025, 10, 30),
    onAddPress: fn(),
    onAppointmentPress: fn(),
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#f5f5f5" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Appointments>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    appointments: [],
  },
};

export const WithAppointments: Story = {
  args: {
    appointments: [
      {
        id: "1",
        title: "Doctor Appointment",
        description: "Annual checkup with Dr. Smith",
        time: "10:00 AM",
      },
      {
        id: "2",
        title: "Team Meeting",
        description: "Weekly sync with the development team",
        time: "2:00 PM",
      },
      {
        id: "3",
        title: "Dentist",
        time: "4:30 PM",
      },
    ],
  },
};

export const ManyAppointments: Story = {
  args: {
    appointments: [
      {
        id: "1",
        title: "Morning Workout",
        time: "7:00 AM",
      },
      {
        id: "2",
        title: "Team Standup",
        description: "Daily standup meeting",
        time: "9:00 AM",
      },
      {
        id: "3",
        title: "Client Call",
        description: "Discuss project requirements",
        time: "10:30 AM",
      },
      {
        id: "4",
        title: "Lunch Break",
        time: "12:00 PM",
      },
      {
        id: "5",
        title: "Code Review",
        description: "Review pull requests",
        time: "2:00 PM",
      },
      {
        id: "6",
        title: "Doctor Appointment",
        description: "Annual checkup",
        time: "4:00 PM",
      },
      {
        id: "7",
        title: "Gym",
        time: "6:00 PM",
      },
    ],
    maxHeight: 400,
  },
};

export const WithoutAddButton: Story = {
  args: {
    appointments: [
      {
        id: "1",
        title: "Meeting",
        time: "10:00 AM",
      },
    ],
    onAddPress: undefined,
  },
};
