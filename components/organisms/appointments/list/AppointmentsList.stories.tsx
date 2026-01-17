import React from "react";
import { View } from "react-native";
import { AppointmentsList } from "./AppointmentsList";

export default {
  title: "Molecules/Appointments/List",
  component: AppointmentsList,
};

const mockAppointments = [
  {
    id: "1",
    title: "Annual Checkup",
    description: "General health checkup",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    time: "10:30",
    doctorName: "Dr.",
    address: "123 Main",
  },
  {
    id: "2",
    title: "Dental Cleaning",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    time: "14:00",
    doctorName: "Dr.",
    address: "456 Oak ",
  },
  {
    id: "3",
    title: "Lab Results Review",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    time: "11:00",
    doctorName: "Dr.",
  },
  {
    id: "4",
    title: "Follow-up Appointment",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    time: "15:30",
    doctorName: "Dr.",
  },
];

export const WithAppointments = () => (
  <View style={{ flex: 1 }}>
    <AppointmentsList
      appointments={mockAppointments}
      onAppointmentPress={(id) => alert(`Clicked appointment ${id}`)}
      onAddNew={() => alert("Add new appointment")}
    />
  </View>
);

export const Empty = () => (
  <View style={{ flex: 1 }}>
    <AppointmentsList
      appointments={[]}
      onAppointmentPress={(id) => alert(`Clicked appointment ${id}`)}
      onAddNew={() => alert("Add new appointment")}
    />
  </View>
);

export const OnlyUpcoming = () => (
  <View style={{ flex: 1 }}>
    <AppointmentsList
      appointments={mockAppointments.slice(0, 2)}
      onAppointmentPress={(id) => alert(`Clicked appointment ${id}`)}
    />
  </View>
);
