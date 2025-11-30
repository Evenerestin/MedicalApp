import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { Appointment } from "./Appointment";

const meta = {
  title: "Components/Appointments/Appointment",
  component: Appointment,
  argTypes: {
    title: {
      control: "text",
      description: "Appointment title",
    },
    description: {
      control: "text",
      description: "Appointment description (optional)",
    },
    time: {
      control: "text",
      description: "Appointment time in hh:mm format",
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#f5f5f5" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Appointment>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "General Checkup - Dr. Smith",
    description: "Annual physical examination and health review",
    time: "09:00",
  },
};

export const WithoutDescription: Story = {
  args: {
    title: "Cardiology Appointment - Dr. Johnson",
    time: "14:30",
  },
};

export const LongDescription: Story = {
  args: {
    title: "Orthopedic Consultation - Dr. Williams",
    description:
      "Follow-up consultation for knee injury. Bring previous X-rays and MRI results. Discuss treatment options and rehabilitation progress.",
    time: "10:00",
  },
};

export const MultipleAppointments: Story = {
  args: {
    title: "",
    time: "",
  },
  render: () => (
    <View>
      <Appointment
        title="Dental Cleaning - Dr. Brown"
        description="Regular teeth cleaning and checkup"
        time="08:00"
      />
      <Appointment
        title="Eye Exam - Dr. Davis"
        description="Annual vision test and prescription update"
        time="10:30"
      />
      <Appointment title="Dermatology - Dr. Martinez" time="14:00" />
      <Appointment
        title="Lab Results Review - Dr. Smith"
        description="Discuss recent blood work results"
        time="16:00"
      />
    </View>
  ),
};
