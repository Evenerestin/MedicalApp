import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { GlucoseMeasurement } from "../../../types";
import { styles } from "./Glucose.styles";
import { GlucoseMeasurementCard } from "./GlucoseMeasurementCard";

export interface GlucoseHistoryProps {
  measurements: GlucoseMeasurement[];
  onAddPress?: () => void;
  onMeasurementPress?: (measurement: GlucoseMeasurement) => void;
  onBack?: () => void;
}

export const GlucoseHistory = ({
  measurements,
  onAddPress,
  onMeasurementPress,
  onBack,
}: GlucoseHistoryProps) => {
  const groupByDate = (items: GlucoseMeasurement[]) => {
    const groups: Record<string, GlucoseMeasurement[]> = {};
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

  const groupedMeasurements = groupByDate(measurements);

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons
        name="water-outline"
        size={64}
        color="#cccccc"
        style={styles.emptyStateIcon}
      />
      <Text style={styles.emptyStateText}>No glucose readings recorded</Text>
      <Text style={styles.emptyStateSubtext}>
        Tap the + button to add your first reading
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
        <Text style={styles.headerTitle}>Glucose Journal</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
          <Ionicons name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Chart placeholder */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Glucose Levels</Text>
        <View style={styles.chartPlaceholder}>
          <Ionicons name="trending-up-outline" size={48} color="#cccccc" />
          <Text style={styles.chartPlaceholderText}>Chart visualization</Text>
        </View>
        <View style={styles.rangeIndicator}>
          <View style={styles.rangeItem}>
            <View style={[styles.rangeDot, styles.valueLow]} />
            <Text style={styles.rangeText}>Low (&lt;70)</Text>
          </View>
          <View style={styles.rangeItem}>
            <View style={[styles.rangeDot, styles.valueNormal]} />
            <Text style={styles.rangeText}>Normal (70-140)</Text>
          </View>
          <View style={styles.rangeItem}>
            <View style={[styles.rangeDot, styles.valueHigh]} />
            <Text style={styles.rangeText}>High (&gt;140)</Text>
          </View>
        </View>
      </View>

      {measurements.length === 0 ? (
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
                <GlucoseMeasurementCard
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
