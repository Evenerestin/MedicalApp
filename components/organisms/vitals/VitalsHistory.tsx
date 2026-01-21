import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { ChartPeriod, VitalMeasurement, VitalType } from "../../../types";
import { VitalMeasurementCard } from "./VitalMeasurementCard";
import { styles } from "./Vitals.styles";

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
  const [selectedPeriod, setSelectedPeriod] = useState<ChartPeriod>("week");

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
            <Ionicons name="arrow-back" size={24} color="#152b4f" />
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

      <View style={styles.periodSelector}>
        {(["week", "month", "year"] as ChartPeriod[]).map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.periodButtonActive,
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text
              style={[
                styles.periodButtonText,
                selectedPeriod === period && styles.periodButtonTextActive,
              ]}
            >
              {period === "week"
                ? "Week"
                : period === "month"
                  ? "Month"
                  : "Year"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>
          {selectedType === "all"
            ? "Overview"
            : vitalTabs.find((t) => t.type === selectedType)?.label}
        </Text>
        <View style={styles.chartPlaceholder}>
          <Ionicons name="bar-chart-outline" size={48} color="#cccccc" />
          <Text style={styles.chartPlaceholderText}>Chart visualization</Text>
        </View>
      </View>

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
