import { useRouter } from "expo-router";
import React from "react";
import { MedicationFormData } from "../../../components/organisms/medications";
import { MedicationsTemplate } from "../../../components/templates/medications/MedicationsTemplate";
import {
  useAppDispatch,
  useMedications,
  useUser,
} from "../../../context/AppContext";
import { DatabaseService } from "../../../lib/database";
import { Medication } from "../../../types";

export default function MedicationsPage() {
  const router = useRouter();
  const medications = useMedications();
  const dispatch = useAppDispatch();
  const user = useUser();

  const handleAddMedication = () => {};

  const handleMedicationPress = (medication: Medication) => {};

  const handleToggleActive = async (id: string) => {
    const medication = medications.find((m) => m.id === id);
    if (!medication) return;

    try {
      const updated = await DatabaseService.updateMedication(id, {
        isActive: !medication.isActive,
      });
      dispatch({ type: "UPDATE_MEDICATION", payload: updated });
    } catch (error) {
      console.error("Failed to toggle medication:", error);
    }
  };

  const handleSave = async (
    data: MedicationFormData,
    medicationId?: string,
  ) => {
    if (!user) return;

    const remindersEnabled =
      typeof data.reminders === "boolean"
        ? data.reminders
        : data.reminders?.min5 ||
          data.reminders?.min15 ||
          data.reminders?.min30 ||
          false;

    try {
      if (medicationId) {
        const updatedMedication = await DatabaseService.updateMedication(
          medicationId,
          {
            name: data.name,
            dosage: data.dosage,
            unit: data.unit,
            frequency: data.frequency,
            times: data.times,
            notes: data.notes,
            remindersEnabled,
          },
        );
        dispatch({ type: "UPDATE_MEDICATION", payload: updatedMedication });
      } else {
        const newMedication = await DatabaseService.addMedication(user.id, {
          name: data.name,
          dosage: data.dosage,
          unit: data.unit,
          frequency: data.frequency,
          times: data.times,
          isActive: true,
          startDate: new Date().toISOString().split("T")[0],
          notes: data.notes,
          remindersEnabled,
        });
        dispatch({ type: "ADD_MEDICATION", payload: newMedication });
      }
    } catch (error) {
      console.error("Failed to save medication:", error);
    }
  };

  const handleDelete = async (medicationId: string) => {
    try {
      await DatabaseService.deleteMedication(medicationId);
      dispatch({ type: "DELETE_MEDICATION", payload: medicationId });
    } catch (error) {
      console.error("Failed to delete medication:", error);
    }
  };

  return (
    <MedicationsTemplate
      medications={medications}
      onAddPress={handleAddMedication}
      onMedicationPress={handleMedicationPress}
      onToggleActive={handleToggleActive}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
}
