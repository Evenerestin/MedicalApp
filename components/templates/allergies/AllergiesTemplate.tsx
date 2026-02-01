import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAllergies } from "../../../context/AppContext";
import { AllergiesList } from "../../organisms/allergies";

export const AllergiesTemplate: React.FC = () => {
  const allergies = useAllergies();
  const router = useRouter();

  const handleAllergyPress = (id: string) => {
    router.push(`/health/allergies/${id}` as any);
  };

  const handleAddNew = () => {
    router.push("/health/allergies/new" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 32 }} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Allergies</Text>
        <Text style={styles.headerSubtitle}>
          {allergies.length} allerg{allergies.length !== 1 ? "ies" : "y"}
        </Text>
      </View>
      <AllergiesList
        allergies={allergies}
        onAllergyPress={handleAllergyPress}
        onAddNew={handleAddNew}
      />
      <TouchableOpacity style={styles.fab} onPress={handleAddNew}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

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
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#152b4f",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 32,
    backgroundColor: "#152b4f",
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  fabText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
});
