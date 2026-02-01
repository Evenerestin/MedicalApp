import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import {
  MedicationForm,
  MedicationFormData,
} from "../../../components/organisms/medications";
import {
  useAppDispatch,
  useMedications,
  useUser,
} from "../../../context/AppContext";
import { DatabaseService } from "../../../lib/database";

export default function MedicationDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const medications = useMedications();
  const dispatch = useAppDispatch();
  const user = useUser();

  const medication = medications.find((med) => med.id === id);

  if (!medication) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Medication not found</Text>
      </View>
    );
  }

  const handleSave = async (data: MedicationFormData) => {
    if (!user) return;

    try {
      const updatedMedication = await DatabaseService.updateMedication(
        medication.id,
        {
          name: data.name,
          dosage: data.dosage,
          unit: data.unit,
          frequency: data.frequency,
          times: data.times,
          notes: data.notes,
          remindersEnabled: data.remindersEnabled,
        },
      );

      dispatch({ type: "UPDATE_MEDICATION", payload: updatedMedication });
      router.back();
    } catch (error) {
      console.error("Failed to update medication:", error);
    }
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
          onPress: async () => {
            try {
              await DatabaseService.deleteMedication(medication.id);
              dispatch({ type: "DELETE_MEDICATION", payload: medication.id });
              router.back();
            } catch (error) {
              console.error("Failed to delete medication:", error);
            }
          },
        },
      ],
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
