import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { AppointmentData, CalendarScreen } from "./CalendarScreen";

const meta = {
  title: "Screens/Calendar Screen",
  component: CalendarScreen,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof CalendarScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleAppointments: AppointmentData[] = [
  {
    id: "1",
    name: "General Checkup - Dr. Smith",
    date: "12/05/2025",
    time: "09:00",
    reminders: ["1 day before"],
    address: "123 Medical Center Dr",
    comments: "Annual physical examination and health review",
  },
  {
    id: "2",
    name: "Cardiology Appointment - Dr. Johnson",
    date: "12/05/2025",
    time: "14:30",
    reminders: ["1 week before", "1 day before"],
    address: "456 Heart Health Clinic",
    comments: "Heart health monitoring and ECG test",
  },
  {
    id: "3",
    name: "Dental Cleaning - Dr. Wilson",
    date: "12/12/2025",
    time: "10:00",
    reminders: ["1 day before"],
    address: "789 Dental Care Center",
    comments: "Regular 6-month cleaning and checkup",
  },
  {
    id: "4",
    name: "Lab Results Review - Dr. Smith",
    date: "12/18/2025",
    time: "16:00",
    reminders: ["1 day before"],
    address: "123 Medical Center Dr",
    comments: "Discuss recent blood work and next steps",
  },
  {
    id: "5",
    name: "Eye Exam - Dr. Brown",
    date: "12/25/2025",
    time: "11:00",
    reminders: ["1 week before"],
    address: "321 Vision Care Plaza",
    comments: "Annual eye examination and prescription update",
  },
];

export const Empty: Story = {
  args: {
    onAppointmentsChange: (appointments: AppointmentData[]) =>
      console.log("Appointments updated:", appointments),
  },
};

export const WithAppointments: Story = {
  args: {
    initialAppointments: sampleAppointments,
    onAppointmentsChange: (appointments: AppointmentData[]) =>
      console.log("Appointments updated:", appointments),
  },
};

export const SingleAppointment: Story = {
  args: {
    initialAppointments: [sampleAppointments[0]],
    onAppointmentsChange: (appointments: AppointmentData[]) =>
      console.log("Appointments updated:", appointments),
  },
};
