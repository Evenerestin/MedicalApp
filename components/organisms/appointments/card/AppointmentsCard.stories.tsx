import React from "react";
import { View } from "react-native";
import {
  Appointment,
  AppointmentsCard,
  AppointmentsCardProps,
} from "./AppointmentsCard";

export default {
  title: "Organisms/Appointments/Card",
  component: AppointmentsCard,
};

const sampleAppointments: Appointment[] = [
  {
    id: "1",
    title: "Annual Checkup",
    description: "General health checkup",
    time: "10:30",
  },
  {
    id: "2",
    title: "Dental Cleaning",
    description: "Routine dental cleaning",
    time: "14:00",
  },
  {
    id: "3",
    title: "Lab Results Review",
    description: "Discuss recent blood work",
    time: "11:00",
  },
];

export const Default = () => (
  <View style={{ padding: 16, backgroundColor: "#f5f5f5", flex: 1 }}>
    <AppointmentsCard
      date={new Date()}
      appointments={sampleAppointments}
      onAddPress={() => console.log("Add appointment pressed")}
      onAppointmentPress={(appointment: Appointment) =>
        console.log("Appointment pressed:", appointment)
      }
    />
  </View>
);

export const Empty = () => (
  <View style={{ padding: 16, backgroundColor: "#f5f5f5", flex: 1 }}>
    <AppointmentsCard
      date={new Date()}
      appointments={[]}
      onAddPress={() => console.log("Add appointment pressed")}
    />
  </View>
);
