import { IconPlus } from "@tabler/icons-react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlucoseMeasurement } from "../../../types";
import { GlucoseHistory } from "../../organisms/glucose/GlucoseHistory";

const mockGlucose: GlucoseMeasurement[] = [
  {
    id: "1",
    userId: "user1",
    value: 120,
    unit: "mg/dL",
    tag: "fasting",
    measuredAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    userId: "user1",
    value: 180,
    unit: "mg/dL",
    tag: "after_meal",
    insulinDose: 10,
    insulinType: "rapid",
    measuredAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export default function GlucoseScreen() {
  const router = useRouter();
  const [measurements, setMeasurements] =
    useState<GlucoseMeasurement[]>(mockGlucose);

  const handleAddNew = () => {
    router.push("/health/glucose");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Glucose Diary</Text>
        <Text style={styles.headerSubtitle}>
          {measurements.length} measurement
          {measurements.length !== 1 ? "s" : ""}
        </Text>
      </View>

      <GlucoseHistory measurements={measurements} />

      <TouchableOpacity style={styles.fab} onPress={handleAddNew}>
        <IconPlus size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingBottom: 96,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1976d2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
