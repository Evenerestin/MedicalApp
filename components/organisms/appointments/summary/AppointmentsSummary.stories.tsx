import React from "react";
import { View } from "react-native";
import {
  AppointmentSummaryItem,
  AppointmentsSummary,
} from "./AppointmentsSummary";

export default {
  title: "Organisms/Appointments/AppointmentsSummary",
  component: AppointmentsSummary,
};

const sampleAppointments: AppointmentSummaryItem[] = [
  {
    id: "1",
    title: "Dental Checkup",
    description: "Routine dental cleaning and checkup.",
    date: new Date().toISOString().slice(0, 10),
    time: "09:00",
    address: "123 Main St",
    doctorName: "Smith",
  },
  {
    id: "2",
    title: "Eye Exam",
    description: "Annual vision test.",
    date: new Date().toISOString().slice(0, 10),
    time: "14:30",
    address: "456 Elm St",
    doctorName: "Johnson",
  },
];

export const Default = () => (
  <View style={{ padding: 16 }}>
    <AppointmentsSummary
      appointments={sampleAppointments}
      onAppointmentPress={(id) => alert(`Pressed appointment ${id}`)}
      onAddPress={() => alert("Add appointment pressed")}
    />
  </View>
);

export const Empty = () => (
  <View style={{ padding: 16 }}>
    <AppointmentsSummary
      appointments={[]}
      onAddPress={() => alert("Add appointment pressed")}
    />
  </View>
);
