import { useRouter } from "expo-router";
import React from "react";
import {
  Form,
  FormData,
} from "../../../../components/organisms/appointments/form/AppointmentForm";
import { useAppDispatch, useUser } from "../../../../context/AppContext";
import { DatabaseService } from "../../../../lib/database";

export default function NewAppointmentPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useUser();

  const handleSave = async (data: FormData) => {
    if (!user) return;

    try {
      const newAppointment = await DatabaseService.addAppointment(user.id, {
        title: data.title,
        description: data.description,
        date:
          data.date?.toISOString().split("T")[0] ||
          new Date().toISOString().split("T")[0],
        time: data.time || "09:00",
        address: data.address,
        doctorName: data.doctor,
        reminders: data.reminders ? ["day"] : [],
      });

      dispatch({ type: "ADD_APPOINTMENT", payload: newAppointment });
      router.back();
    } catch (error) {
      console.error("Failed to save appointment:", error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return <Form mode="add" onSave={handleSave} onCancel={handleCancel} />;
}
