import { useRouter } from "expo-router";
import React from "react";
import {
  MedicationForm,
  MedicationFormData,
} from "../../../components/organisms/medications";
import { useAppDispatch } from "../../../context/AppContext";
import { Medication } from "../../../types";

export default function NewMedicationPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSave = (data: MedicationFormData) => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      userId: "current-user",
      name: data.name,
      dosage: data.dosage,
      unit: data.unit,
      frequency: data.frequency,
      times: data.times,
      isActive: true,
      startDate: new Date().toISOString().split("T")[0],
      notes: data.notes,
      remindersEnabled: data.remindersEnabled,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: "ADD_MEDICATION", payload: newMedication });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <MedicationForm mode="add" onSave={handleSave} onCancel={handleCancel} />
  );
}
