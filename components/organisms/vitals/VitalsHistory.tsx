import { Ionicons } from "@expo/vector-icons";
import colors from "@theme/colors";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChartDataPoint,
  ChartPeriod,
  VitalMeasurement,
  VitalType,
} from "../../../types";
import { VitalMeasurementCard } from "./VitalMeasurementCard";
import { styles } from "./Vitals.styles";
import { VitalsChart } from "./VitalsChart";

export interface VitalsHistoryProps {
  measurements: VitalMeasurement[];
  onAddPress?: () => void;
  onMeasurementPress?: (measurement: VitalMeasurement) => void;
  onBack?: () => void;
}

const vitalTabs: { type: VitalType | "all"; label: string }[] = [
  { type: "all", label: "All" },
  { type: "blood_pressure", label: "BP & HR" },
  { type: "weight", label: "Weight" },
  { type: "glucose", label: "Glucose" },
];

export const VitalsHistory = ({
  measurements,
  onAddPress,
  onMeasurementPress,
  onBack,
}: VitalsHistoryProps) => {
  const [selectedType, setSelectedType] = useState<VitalType | "all">("all");

  const filteredMeasurements =
    selectedType === "all"
      ? measurements
      : measurements.filter((m) => m.type === selectedType);

  const groupByDate = (items: VitalMeasurement[]) => {
    const groups: Record<string, VitalMeasurement[]> = {};
    items.forEach((item) => {
      const date = new Date(item.measuredAt).toLocaleDateString("pl-PL", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
    });
    return groups;
  };

  const groupedMeasurements = groupByDate(filteredMeasurements);

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons
        name="analytics-outline"
        size={64}
        color="#cccccc"
        style={styles.emptyStateIcon}
      />
      <Text style={styles.emptyStateText}>No measurements recorded</Text>
      <Text style={styles.emptyStateSubtext}>
        Tap the + button to add your first measurement
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Vital Parameters</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
          <Ionicons name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        {vitalTabs.map((tab) => (
          <TouchableOpacity
            key={tab.type}
            style={[styles.tab, selectedType === tab.type && styles.tabActive]}
            onPress={() => setSelectedType(tab.type)}
          >
            <Text
              style={[
                styles.tabText,
                selectedType === tab.type && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chart and period selector removed */}

      {filteredMeasurements.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={Object.entries(groupedMeasurements)}
          keyExtractor={([date]) => date}
          contentContainerStyle={styles.historyList}
          renderItem={({ item: [date, items] }) => (
            <View>
              <Text style={styles.historyDateHeader}>{date}</Text>
              {items.map((measurement) => (
                <VitalMeasurementCard
                  key={measurement.id}
                  measurement={measurement}
                  onPress={() => onMeasurementPress?.(measurement)}
                />
              ))}
            </View>
          )}
        />
      )}
    </View>
  );
};
