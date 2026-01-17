import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import {
  Form,
  FormData,
} from "../../../../components/organisms/appointments/form/AppointmentForm";
import {
  useAppDispatch,
  useAppointments,
} from "../../../../context/AppContext";
import { Appointment } from "../../../../types";

export default function AppointmentDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const appointments = useAppointments();
  const dispatch = useAppDispatch();

  const appointment = appointments.find((apt) => apt.id === id);

  if (!appointment) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Appointment not found</Text>
      </View>
    );
  }

  const handleSave = (data: FormData) => {
    const updatedAppointment: Appointment = {
      ...appointment,
      title: data.title,
      description: data.description,
      date: data.date?.toISOString().split("T")[0] || appointment.date,
      time: data.time,
      address: data.address,
      doctorName: data.doctor,
      reminders: data.reminders ? ["day"] : [],
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: "UPDATE_APPOINTMENT", payload: updatedAppointment });
    router.back();
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Appointment",
      "Are you sure you want to delete this appointment?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            dispatch({ type: "DELETE_APPOINTMENT", payload: appointment.id });
            router.back();
          },
        },
      ]
    );
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
