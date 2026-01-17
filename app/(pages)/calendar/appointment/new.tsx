import { useRouter } from "expo-router";
import React from "react";
import {
  Form,
  FormData,
} from "../../../../components/organisms/appointments/form/AppointmentForm";
import { useAppDispatch } from "../../../../context/AppContext";
import { Appointment } from "../../../../types";

export default function NewAppointmentPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSave = (data: FormData) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      userId: "current-user",
      title: data.title,
      description: data.description,
      date:
        data.date?.toISOString().split("T")[0] ||
        new Date().toISOString().split("T")[0],
      time: data.time || "09:00",
      address: data.address,
      doctorName: data.doctor,
      reminders: data.reminders ? ["day"] : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: "ADD_APPOINTMENT", payload: newAppointment });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return <Form mode="add" onSave={handleSave} onCancel={handleCancel} />;
}
