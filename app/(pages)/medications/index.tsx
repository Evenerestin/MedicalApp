import { useRouter } from "expo-router";
import React from "react";
import { MedicationsList } from "../../../components/organisms/medications";
import { useAppDispatch, useMedications } from "../../../context/AppContext";
import { Medication } from "../../../types";

export default function MedicationsPage() {
  const router = useRouter();
  const medications = useMedications();
  const dispatch = useAppDispatch();

  const handleAddMedication = () => {
    router.push("/(pages)/medications/new");
  };

  const handleMedicationPress = (medication: Medication) => {
    router.push(`/(pages)/medications/${medication.id}` as any);
  };

  const handleToggleActive = (id: string) => {
    dispatch({ type: "TOGGLE_MEDICATION_ACTIVE", payload: id });
  };

  return (
    <MedicationsList
      medications={medications}
      onAddPress={handleAddMedication}
      onMedicationPress={handleMedicationPress}
      onToggleActive={handleToggleActive}
    />
  );
}
