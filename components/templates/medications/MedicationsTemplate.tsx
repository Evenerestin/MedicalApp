import { IconPlus } from "@tabler/icons-react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Medication } from "../../../types";

const mockMedications: Medication[] = [
  {
    id: "1",
    userId: "user1",
    name: "Aspirin",
    dosage: "500",
    unit: "mg",
    frequency: "twice_daily",
    times: ["08:00", "20:00"],
    isActive: true,
    startDate: "2024-01-01",
    notes: "For pain relief",
    remindersEnabled: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    userId: "user1",
    name: "Metformin",
    dosage: "850",
    unit: "mg",
    frequency: "three_times_daily",
    times: ["08:00", "13:00", "20:00"],
    isActive: true,
    startDate: "2023-06-15",
    notes: "Diabetes management",
    remindersEnabled: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function MedicationsScreen() {
  const router = useRouter();
  const [medications, setMedications] = useState<Medication[]>(mockMedications);

  const handleMedicationPress = (id: string) => {
    router.push(`/medications/${id}`);
  };

  const handleAddNew = () => {
    router.push("/medications/new");
  };

  const renderMedicationItem = ({ item }: { item: Medication }) => (
    <TouchableOpacity
      style={styles.medicationCard}
      onPress={() => handleMedicationPress(item.id)}
    >
      <View style={styles.medicationContent}>
        <Text style={styles.medicationName}>{item.name}</Text>
        <Text style={styles.medicationDosage}>
          {item.dosage} {item.unit}
        </Text>
        <Text style={styles.medicationFrequency}>
          {item.frequency.replace("_", " ")} • {item.times.join(", ")}
        </Text>
        {item.notes && <Text style={styles.medicationNotes}>{item.notes}</Text>}
      </View>
      <View
        style={[
          styles.medicationStatus,
          item.isActive ? styles.statusActive : styles.statusInactive,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            item.isActive ? styles.statusTextActive : styles.statusTextInactive,
          ]}
        >
          {item.isActive ? "Active" : "Inactive"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 32 }} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medications</Text>
        <Text style={styles.headerSubtitle}>
          {medications.filter((m) => m.isActive).length} active medication
          {medications.filter((m) => m.isActive).length !== 1 ? "s" : ""}
        </Text>
      </View>

      {medications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Medications</Text>
          <Text style={styles.emptySubtext}>
            Add your medications to manage your health
          </Text>
          <TouchableOpacity style={styles.emptyButton} onPress={handleAddNew}>
            <Text style={styles.emptyButtonText}>Add Medication</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={medications}
          renderItem={renderMedicationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

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
  listContent: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  medicationCard: {
    marginHorizontal: 8,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medicationContent: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  medicationFrequency: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  medicationNotes: {
    fontSize: 12,
    color: "#1976d2",
    fontStyle: "italic",
  },
  medicationStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 12,
  },
  statusActive: {
    backgroundColor: "#E8F5E9",
  },
  statusInactive: {
    backgroundColor: "#FFEBEE",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusTextActive: {
    color: "#4CAF50",
  },
  statusTextInactive: {
    color: "#f44336",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: "#1976d2",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
