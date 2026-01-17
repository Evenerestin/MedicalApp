import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Medication, MedicationFrequency } from "../../../types";
import { styles } from "./Medications.styles";

export interface MedicationCardProps {
  medication: Medication;
  onPress?: () => void;
  onToggleActive?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const frequencyLabels: Record<MedicationFrequency, string> = {
  once_daily: "Once daily",
  twice_daily: "Twice daily",
  three_times_daily: "3 times daily",
  four_times_daily: "4 times daily",
  weekly: "Weekly",
  as_needed: "As needed",
};

export const MedicationCard = ({
  medication,
  onPress,
  onToggleActive,
  onEdit,
  onDelete,
}: MedicationCardProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.medicationCard,
        !medication.isActive && styles.medicationCardInactive,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.medicationHeader}>
        <View style={styles.medicationInfo}>
          <Text style={styles.medicationName}>{medication.name}</Text>
          <Text style={styles.medicationDosage}>
            {medication.dosage} {medication.unit}
          </Text>
        </View>
        <View style={styles.medicationActions}>
          <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
            <Ionicons name="pencil" size={20} color="#666666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
            <Ionicons name="trash-outline" size={20} color="#e53935" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.medicationDetails}>
        <View style={styles.detailBadge}>
          <Ionicons name="time-outline" size={14} color="#666666" />
          <Text style={styles.detailBadgeText}>
            {frequencyLabels[medication.frequency]}
          </Text>
        </View>

        {medication.times.length > 0 && (
          <View style={styles.detailBadge}>
            <Ionicons name="alarm-outline" size={14} color="#666666" />
            <Text style={styles.detailBadgeText}>
              {medication.times.join(", ")}
            </Text>
          </View>
        )}

        {medication.remindersEnabled && (
          <View style={styles.detailBadge}>
            <Ionicons name="notifications-outline" size={14} color="#666666" />
            <Text style={styles.detailBadgeText}>Reminders on</Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.statusBadge,
            medication.isActive ? styles.statusActive : styles.statusInactive,
          ]}
          onPress={onToggleActive}
        >
          <Ionicons
            name={medication.isActive ? "checkmark-circle" : "close-circle"}
            size={14}
            color={medication.isActive ? "#2e7d32" : "#c62828"}
          />
          <Text
            style={[
              styles.statusText,
              medication.isActive
                ? styles.statusTextActive
                : styles.statusTextInactive,
            ]}
          >
            {medication.isActive ? "Active" : "Inactive"}
          </Text>
        </TouchableOpacity>
      </View>

      {medication.notes && (
        <Text
          style={[styles.detailBadgeText, { marginTop: 8 }]}
          numberOfLines={2}
        >
          {medication.notes}
        </Text>
      )}
    </TouchableOpacity>
  );
};
