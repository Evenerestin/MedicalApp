import { Ionicons } from "@expo/vector-icons";
import { IconPill } from "@tabler/icons-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Medication } from "../../../../types";
import { MedicationCard } from "../card/MedicationCard";
import { MedicationTabs } from "../tabs/MedicationTabs";
import { styles } from "./MedicationsList.styles";

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
  const DEFAULT_TAB = "Active";
  const tabs = ["Active", "Inactive"];
  const [activeTab, setActiveTab] = useState<string>(DEFAULT_TAB);
  // Reset to default tab if tabs prop changes (e.g., on remount)
  React.useEffect(() => {
    setActiveTab(DEFAULT_TAB);
  }, [Array.isArray(tabs) ? tabs.join(",") : ""]);
  const filteredMedications = medications.filter((m) =>
    activeTab === "Active" ? m.isActive : !m.isActive,
  );

  // Daily taken state: { [medicationId]: boolean }
  const [takenState, setTakenState] = useState<{ [id: string]: boolean }>({});
  const [lastResetDate, setLastResetDate] = useState<string>("");

  // Reset checkboxes at midnight
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    if (lastResetDate !== today) {
      setTakenState({});
      setLastResetDate(today);
    }
    // Optionally, set up an interval to check for date change
    const interval = setInterval(() => {
      const now = new Date().toISOString().slice(0, 10);
      if (now !== lastResetDate) {
        setTakenState({});
        setLastResetDate(now);
      }
    }, 60 * 1000); // check every minute
    return () => clearInterval(interval);
  }, [lastResetDate]);

  const handleCheck = (id: string, checked: boolean) => {
    setTakenState((prev) => ({ ...prev, [id]: checked }));
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <IconPill size={48} color="#cccccc" style={styles.emptyStateIcon} />
      <Text style={styles.emptyStateText}>No medications added yet</Text>
      <Text style={styles.emptyStateSubtext}>
        Tap the + button to add your first medication
      </Text>
    </View>
  );

  // Prepare data: for active meds with multiple times, create an entry per time
  const medicationEntries = filteredMedications.flatMap((med) => {
    if (med.isActive && med.times.length > 1) {
      return med.times.map((time, idx) => ({
        ...med,
        _doseTime: time,
        _doseKey: `${med.id}_${time}_${idx}`,
      }));
    }
    return [{ ...med, _doseTime: med.times[0] || undefined, _doseKey: med.id }];
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medications</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
          <Ionicons name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <MedicationTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <FlatList
          data={medicationEntries}
          keyExtractor={(item) => item._doseKey}
          renderItem={({ item }) => (
            <MedicationCard
              medication={{
                ...item,
                times:
                  item.isActive && item._doseTime
                    ? [item._doseTime]
                    : item.times,
              }}
              onPress={() => onMedicationPress?.(item)}
              onToggleActive={() => onToggleActive?.(item.id)}
              onEdit={() => onEdit?.(item)}
              onDelete={() => onDelete?.(item.id)}
              checked={item.isActive ? !!takenState[item.id] : false}
              onCheck={
                item.isActive
                  ? (checked) => handleCheck(item.id, checked)
                  : undefined
              }
            />
          )}
          ListEmptyComponent={renderEmptyState}
        />
      </View>
    </View>
  );
};
