import React, { useState } from "react";
import { Alert, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Medication } from "../../../types";
import {
  MedicationForm,
  MedicationFormData,
  MedicationsList,
} from "../../organisms/medications";

export interface MedicationsTemplateProps {
  medications: Medication[];
  onAddPress: () => void;
  onMedicationPress: (medication: Medication) => void;
  onToggleActive: (id: string) => void;
  onSave?: (data: MedicationFormData, medicationId?: string) => void;
  onDelete?: (medicationId: string) => void;
}

export const MedicationsTemplate: React.FC<MedicationsTemplateProps> = ({
  medications,
  onAddPress,
  onMedicationPress,
  onToggleActive,
  onSave,
  onDelete,
}) => {
  const [selectedMedicationId, setSelectedMedicationId] = useState<
    string | null
  >(null);
  const [modalVisible, setModalVisible] = useState(false);

  const selectedMedication = medications.find(
    (med) => med.id === selectedMedicationId,
  );

  const handleMedicationPress = (medication: Medication) => {
    setSelectedMedicationId(medication.id);
    setModalVisible(true);
    onMedicationPress(medication);
  };

  const handleAddNew = () => {
    setSelectedMedicationId(null);
    setModalVisible(true);
    onAddPress();
  };

  const handleSave = (data: MedicationFormData) => {
    if (onSave) {
      onSave(data, selectedMedicationId || undefined);
    }
    setModalVisible(false);
    setSelectedMedicationId(null);
  };

  const handleDelete = () => {
    if (!selectedMedication || !onDelete) return;
    Alert.alert(
      "Delete Medication",
      "Are you sure you want to delete this medication?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            onDelete(selectedMedication.id);
            setModalVisible(false);
            setSelectedMedicationId(null);
          },
        },
      ],
    );
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedMedicationId(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <MedicationsList
        medications={medications}
        onAddPress={handleAddNew}
        onMedicationPress={handleMedicationPress}
        onToggleActive={onToggleActive}
      />
      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
          {selectedMedication ? (
            <MedicationForm
              mode="edit"
              initialData={{
                name: selectedMedication.name,
                dosage: selectedMedication.dosage,
                unit: selectedMedication.unit,
                frequency: selectedMedication.frequency,
                times: selectedMedication.times,
                notes: selectedMedication.notes,
                reminders: selectedMedication.remindersEnabled,
              }}
              onSave={handleSave}
              onCancel={handleCancel}
              onDelete={handleDelete}
            />
          ) : (
            <MedicationForm
              mode="add"
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};
