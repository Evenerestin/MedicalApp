import React from "react";
import { View } from "react-native";
import {
  AppointmentFormProps,
  Form,
} from "../../../organisms/appointments/form/AppointmentForm";

export default {
  title: "Molecules/Appointments/Form",
  component: Form,
};

export const AddAppointment = () => (
  <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
    <Form
      mode="add"
      onSave={(data: any) => console.log("Saved:", data)}
      onCancel={() => console.log("Cancelled")}
    />
  </View>
);

export const EditAppointment = () => (
  <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
    <Form
      mode="edit"
      initialData={{
        title: "Annual Checkup",
        description: "General health checkup",
        date: new Date(),
        time: "10:30",
        address: "123 Main St, New York",
        doctor: "Dr. Smith",
        reminders: true,
      }}
      onSave={(data: any) => console.log("Updated:", data)}
      onCancel={() => console.log("Cancelled")}
      onDelete={() => console.log("Deleted")}
    />
  </View>
);

export const EditWithoutDelete = () => (
  <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
    <Form
      mode="edit"
      initialData={{
        title: "Dental Cleaning",
        time: "14:00",
        doctor: "Dr. Johnson",
        reminders: false,
      }}
      onSave={(data: any) => console.log("Updated:", data)}
      onCancel={() => console.log("Cancelled")}
    />
  </View>
);

export const Loading = () => (
  <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
    <Form
      mode="add"
      isLoading={true}
      onSave={(data) => console.log("Saved:", data)}
      onCancel={() => console.log("Cancelled")}
    />
  </View>
);
