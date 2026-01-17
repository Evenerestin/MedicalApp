import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Medication } from "../../../types";
import { MedicationCard } from "./MedicationCard";
import { styles } from "./Medications.styles";

export interface MedicationsListProps {
  medications: Medication[];
  onAddPress?: () => void;
  onMedicationPress?: (medication: Medication) => void;
  onToggleActive?: (medicationId: string) => void;
  onEdit?: (medication: Medication) => void;
  onDelete?: (medicationId: string) => void;
  showInactive?: boolean;
}

export const MedicationsList = ({
  medications,
  onAddPress,
  onMedicationPress,
  onToggleActive,
  onEdit,
  onDelete,
  showInactive = true,
}: MedicationsListProps) => {
  const filteredMedications = showInactive
    ? medications
    : medications.filter((m) => m.isActive);

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons
        name="medkit-outline"
        size={64}
        color="#cccccc"
        style={styles.emptyStateIcon}
      />
      <Text style={styles.emptyStateText}>No medications added yet</Text>
      <Text style={styles.emptyStateSubtext}>
        Tap the + button to add your first medication
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medications</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
          <Ionicons name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredMedications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedicationCard
            medication={item}
            onPress={() => onMedicationPress?.(item)}
            onToggleActive={() => onToggleActive?.(item.id)}
            onEdit={() => onEdit?.(item)}
            onDelete={() => onDelete?.(item.id)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};
