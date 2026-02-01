import { IconPlus } from "@tabler/icons-react-native";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMenstrualCycles } from "../../../context/AppContext";
import { MenstrualCalendar } from "../../organisms/menstrual/MenstrualCalendar";

export default function MenstrualScreen() {
  const router = useRouter();
  const cycles = useMenstrualCycles();

  const handleAddNew = () => {
    router.push("/health/menstrual/new" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menstrual Calendar</Text>
        <Text style={styles.headerSubtitle}>Track your cycle</Text>
      </View>

      <MenstrualCalendar cycles={cycles} />

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
