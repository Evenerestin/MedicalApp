import { Toggle } from "@components/atoms/inputs/toggle/Toggle";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Medication, MedicationFrequency } from "../../../../types";
import { Checkbox } from "../../../atoms/inputs/checkbox/Checkbox";
import { styles } from "./MedicationCard.styles";

export interface MedicationCardProps {
  medication: Medication;
  onPress?: () => void;
  onToggleActive?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  checked?: boolean; // For daily taken tracking
  onCheck?: (checked: boolean) => void;
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
  checked = false,
  onCheck,
}: MedicationCardProps) => {
  if (!medication.isActive) {
    // Inactive: left toggle, name/dosage column, toggle right, tags below
    return (
      <View style={[styles.medicationCard, styles.inactiveCard]}>
        <View style={styles.inactiveActionsColumn}>
          <Toggle checked={false} onChange={() => onToggleActive?.()} />
        </View>
        <View style={styles.inactiveMainColumn}>
          <View style={styles.inactiveTopRow}>
            <View style={styles.inactiveInfoCol}>
              <Text style={styles.medicationName}>{medication.name}</Text>
              <Text style={styles.medicationDosage}>
                {medication.dosage} {medication.unit}
              </Text>
            </View>
            <View style={styles.inactiveToggleCol}>
              {/* Toggle for activating medication */}
              <Toggle checked={false} onChange={() => onToggleActive?.()} />
            </View>
          </View>
          <View style={styles.inactiveTagsRow}>
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
                <Ionicons
                  name="notifications-outline"
                  size={14}
                  color="#666666"
                />
                <Text style={styles.detailBadgeText}>Reminders on</Text>
              </View>
            )}
          </View>
          {medication.notes && (
            <Text
              style={[styles.detailBadgeText, { marginTop: 8 }]}
              numberOfLines={2}
            >
              {medication.notes}
            </Text>
          )}
        </View>
      </View>
    );
  }
  // Active: original layout
  return (
    <TouchableOpacity
      style={styles.medicationCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.colorBar} />
      <View style={styles.cardContent}>
        <View style={styles.medicationHeader}>
          <View style={{ marginRight: 12, justifyContent: "center" }}>
            <Checkbox
              checked={checked}
              onChange={onCheck || (() => {})}
              size="md"
            />
          </View>
          <View style={styles.medicationInfo}>
            <Text style={styles.medicationName}>{medication.name}</Text>
            <Text style={styles.medicationDosage}>
              {medication.dosage} {medication.unit}
            </Text>
          </View>
          <View style={styles.medicationActions}>
            <Toggle checked={true} onChange={() => onToggleActive?.()} />
          </View>
        </View>
        <View style={styles.medicationDetails}>
          {medication.times.length > 0 && (
            <View style={styles.detailBadge}>
              <Ionicons name="alarm-outline" size={14} color="#666666" />
              <Text style={styles.detailBadgeText}>{medication.times[0]}</Text>
            </View>
          )}
          {medication.remindersEnabled && (
            <View style={styles.detailBadge}>
              <Ionicons
                name="notifications-outline"
                size={14}
                color="#666666"
              />
              <Text style={styles.detailBadgeText}>Reminders on</Text>
            </View>
          )}
        </View>
        {medication.notes && (
          <Text
            style={[styles.detailBadgeText, { marginTop: 8 }]}
            numberOfLines={2}
          >
            {medication.notes}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
