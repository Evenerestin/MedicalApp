import { Button } from "@components/atoms/buttons/button/Button";
import {
  IconCalendarEvent,
  IconCalendarPlus,
} from "@tabler/icons-react-native";
import colors from "@theme/colors";
import React, { useMemo } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { MedicationFrequency } from "../../../../types";
import { MedicationItem } from "../item/MedicationItem";
import { styles } from "./MedicationsSummary.styles";

export interface MedicationSummaryItem {
  id: string;
  name: string;
  dosage: string;
  unit: string;
  time?: string;
  isActive: boolean;
  frequency?: MedicationFrequency;
  takenToday?: boolean;
}

export interface MedicationsSummaryProps {
  medications: MedicationSummaryItem[];
  onMedicationPress?: (id: string) => void;
  onToggleTaken?: (id: string, taken: boolean) => void;
  onAddPress?: () => void;
}

export const MedicationsSummary: React.FC<MedicationsSummaryProps> = ({
  medications,
  onMedicationPress,
  onToggleTaken,
  onAddPress,
}) => {
  const today = new Date();

  if (medications.length === 0) {
    return (
      <View style={styles.card}>
        <View style={styles.emptyContainer}>
          <IconCalendarEvent size={32} color={colors.textSecondary} />
          <Text style={styles.emptyText}>No medications</Text>
          {onAddPress && (
            <Button
              onPress={onAddPress}
              variant="filled"
              size="sm"
              label="Add Medication"
              rounded
            />
          )}
        </View>
      </View>
    );
  }

  const handleMedicationPress = (item: MedicationSummaryItem) => {
    if (onMedicationPress) onMedicationPress(item.id);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Medication Reminders</Text>
        {onAddPress && (
          <Button
            variant="filled"
            size="sm"
            label="Add Medication"
            rounded
            onPress={onAddPress}
          />
        )}
      </View>
      <FlatList
        data={medications}
        renderItem={({ item }) => (
          <MedicationItem
            name={item.name}
            dosage={item.dosage}
            unit={item.unit}
            time={item.time}
            isActive={item.takenToday ?? false}
            frequency={item.frequency}
            onToggleActive={(checked) => {
              if (onToggleTaken) {
                onToggleTaken(item.id, checked);
              }
            }}
            onPress={() => handleMedicationPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};
