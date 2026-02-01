import { useRouter } from "expo-router";
import React from "react";
import {
  MedicationForm,
  MedicationFormData,
} from "../../../components/organisms/medications";
import { useAppDispatch, useUser } from "../../../context/AppContext";
import { DatabaseService } from "../../../lib/database";

export default function NewMedicationPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useUser();

  const handleSave = async (data: MedicationFormData) => {
    if (!user) return;

    try {
      const newMedication = await DatabaseService.addMedication(user.id, {
        name: data.name,
        dosage: data.dosage,
        unit: data.unit,
        frequency: data.frequency,
        times: data.times,
        isActive: true,
        startDate: new Date().toISOString().split("T")[0],
        notes: data.notes,
        remindersEnabled: data.remindersEnabled,
      });

      dispatch({ type: "ADD_MEDICATION", payload: newMedication });
      router.back();
    } catch (error) {
      console.error("Failed to save medication:", error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <MedicationForm mode="add" onSave={handleSave} onCancel={handleCancel} />
  );
}
