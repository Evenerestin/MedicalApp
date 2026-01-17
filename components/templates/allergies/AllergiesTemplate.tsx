import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Allergy } from "../../../types";
import { AllergiesList } from "../../organisms/allergies";

export interface AllergiesTemplateProps {
  allergies?: Allergy[];
  onAllergyPress?: (id: string) => void;
  onAddNew?: () => void;
}

export const mockAllergies: Allergy[] = [
  {
    id: "1",
    userId: "user1",
    name: "Peanuts",
    category: "food",
    severity: "severe",
    symptoms: ["difficulty breathing", "swelling"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    userId: "user1",
    name: "Penicillin",
    category: "medication",
    severity: "moderate",
    symptoms: ["rash", "itching"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const AllergiesTemplate: React.FC<AllergiesTemplateProps> = ({
  allergies = mockAllergies,
  onAllergyPress,
  onAddNew,
}) => {
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
        onAllergyPress={onAllergyPress || (() => {})}
        onAddNew={onAddNew || (() => {})}
      />
      <TouchableOpacity style={styles.fab} onPress={onAddNew || (() => {})}>
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
