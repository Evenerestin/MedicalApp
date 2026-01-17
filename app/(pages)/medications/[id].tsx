import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import {
  MedicationForm,
  MedicationFormData,
} from "../../../components/organisms/medications";
import { useAppDispatch, useMedications } from "../../../context/AppContext";
import { Medication } from "../../../types";

export default function MedicationDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const medications = useMedications();
  const dispatch = useAppDispatch();

  const medication = medications.find((med) => med.id === id);

  if (!medication) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Medication not found</Text>
      </View>
    );
  }

  const handleSave = (data: MedicationFormData) => {
    const updatedMedication: Medication = {
      ...medication,
      name: data.name,
      dosage: data.dosage,
      unit: data.unit,
      frequency: data.frequency,
      times: data.times,
      notes: data.notes,
      remindersEnabled: data.remindersEnabled,
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: "UPDATE_MEDICATION", payload: updatedMedication });
    router.back();
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Medication",
      "Are you sure you want to delete this medication?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            dispatch({ type: "DELETE_MEDICATION", payload: medication.id });
            router.back();
          },
        },
      ]
    );
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <MedicationForm
      mode="edit"
      initialData={{
        name: medication.name,
        dosage: medication.dosage,
        unit: medication.unit,
        frequency: medication.frequency,
        times: medication.times,
        notes: medication.notes,
        remindersEnabled: medication.remindersEnabled,
      }}
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
