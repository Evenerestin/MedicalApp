import { useRouter } from "expo-router";
import React from "react";
import { FormData } from "../../../components/organisms/appointments/form/AppointmentForm";
import { CalendarTemplate } from "../../../components/templates/calendar/CalendarTemplate";
import {
  useAppDispatch,
  useAppointments,
  useUser,
} from "../../../context/AppContext";
import { DatabaseService } from "../../../lib/database";

export default function CalendarPage() {
  const router = useRouter();
  const appointments = useAppointments();
  const dispatch = useAppDispatch();
  const user = useUser();

  const handleSave = async (data: FormData, appointmentId?: string) => {
    if (!user) return;

    try {
      if (appointmentId) {
        // Update existing appointment
        const appointment = appointments.find(
          (apt) => apt.id === appointmentId,
        );
        if (appointment) {
          const updatedAppointment = await DatabaseService.updateAppointment(
            appointmentId,
            {
              title: data.title,
              description: data.description,
              date: data.date
                ? data.date.toISOString().split("T")[0]
                : appointment.date,
              time: data.time,
              address: data.address,
              doctorName: data.doctor,
              reminders: data.reminders ? ["day"] : [],
            },
          );
          dispatch({ type: "UPDATE_APPOINTMENT", payload: updatedAppointment });
        }
      } else {
        // Create new appointment
        const newAppointment = await DatabaseService.addAppointment(user.id, {
          title: data.title,
          description: data.description,
          date: data.date
            ? data.date.toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          time: data.time,
          address: data.address,
          doctorName: data.doctor,
          reminders: data.reminders ? ["day"] : [],
        });
        dispatch({ type: "ADD_APPOINTMENT", payload: newAppointment });
      }
    } catch (error) {
      console.error("Failed to save appointment:", error);
    }
  };

  const handleDelete = async (appointmentId: string) => {
    try {
      await DatabaseService.deleteAppointment(appointmentId);
      dispatch({ type: "DELETE_APPOINTMENT", payload: appointmentId });
    } catch (error) {
      console.error("Failed to delete appointment:", error);
    }
  };

  // Map appointments to CalendarTemplate format
  const calendarAppointments = appointments.map((apt) => ({
    id: apt.id,
    title: apt.title,
    description: apt.description,
    date: apt.date,
    time: apt.time,
    address: apt.address,
    doctorName: apt.doctorName,
  }));

  return (
    <CalendarTemplate
      appointments={calendarAppointments}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
}
