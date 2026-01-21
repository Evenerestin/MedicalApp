import { useRouter } from "expo-router";
import React from "react";
import { CalendarView } from "../../../components/templates/calendar/CalendarView";
import { useAppointments } from "../../../context/AppContext";

export default function CalendarPage() {
  const router = useRouter();
  const appointments = useAppointments();

  const handleAddAppointment = () => {
    router.push("/(pages)/calendar/appointment/new" as any);
  };

  const handleAppointmentPress = (appointment: { id: string }) => {
    router.push(`/(pages)/calendar/appointment/${appointment.id}` as any);
  };

  // Map appointments to CalendarView format
  const calendarAppointments = appointments.map((apt) => ({
    id: apt.id,
    title: apt.title,
    time: apt.time,
    location: apt.address,
    date: apt.date,
  }));

  return (
    <CalendarView
      initialAppointments={calendarAppointments}
      onAddPress={handleAddAppointment}
      onAppointmentPress={handleAppointmentPress}
    />
  );
}
