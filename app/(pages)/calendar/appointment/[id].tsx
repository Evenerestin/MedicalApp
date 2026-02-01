import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Form,
  FormData,
} from "../../../../components/organisms/appointments/form/AppointmentForm";
import {
  useAppDispatch,
  useAppointments,
  useUser,
} from "../../../../context/AppContext";
import { DatabaseService } from "../../../../lib/database";

export default function AppointmentDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const appointments = useAppointments();
  const dispatch = useAppDispatch();
  const user = useUser();

  const appointment = appointments.find((apt) => apt.id === id);

  if (!appointment) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Appointment not found</Text>
      </View>
    );
  }

  const handleSave = async (data: FormData) => {
    if (!user) return;

    try {
      const updatedAppointment = await DatabaseService.updateAppointment(
        appointment.id,
        {
          title: data.title,
          description: data.description,
          date: data.date?.toISOString().split("T")[0] || appointment.date,
          time: data.time,
          address: data.address,
          doctorName: data.doctor,
          reminders: data.reminders ? ["day"] : [],
        },
      );

      dispatch({ type: "UPDATE_APPOINTMENT", payload: updatedAppointment });
      router.back();
    } catch (error) {
      console.error("Failed to update appointment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await DatabaseService.deleteAppointment(appointment.id);
      dispatch({ type: "DELETE_APPOINTMENT", payload: appointment.id });
      router.back();
    } catch (error) {
      console.error("Failed to delete appointment:", error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const initialData: FormData = {
    title: appointment.title,
    description: appointment.description || "",
    date: appointment.date ? new Date(appointment.date) : undefined,
    time: appointment.time,
    address: appointment.address || "",
    doctor: appointment.doctorName || "",
    reminders: appointment.reminders && appointment.reminders.length > 0,
  };

  return (
    <Form
      mode="edit"
      initialData={initialData}
      onSave={handleSave}
      onCancel={handleCancel}
      onDelete={handleDelete}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  errorText: {
    fontSize: 16,
    color: "#666666",
  },
});
