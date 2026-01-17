import React from "react";
import { View } from "react-native";
import { Allergy } from "../../../types";
import { AllergiesForm } from "./AllergiesForm";
import { AllergiesList } from "./AllergiesList";

export default {
  title: "Molecules/Allergies",
};

const mockAllergies: Allergy[] = [
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
  {
    id: "3",
    userId: "user1",
    name: "Dust",
    category: "environmental",
    severity: "mild",
    symptoms: ["sneezing", "congestion"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const AllergiesListStory = () => (
  <View style={{ flex: 1 }}>
    <AllergiesList
      allergies={mockAllergies}
      onAllergyPress={(id) => console.log("Clicked:", id)}
      onAddNew={() => console.log("Add new")}
    />
  </View>
);

export const AllergiesListEmpty = () => (
  <View style={{ flex: 1 }}>
    <AllergiesList
      allergies={[]}
      onAllergyPress={(id) => console.log("Clicked:", id)}
      onAddNew={() => console.log("Add new")}
    />
  </View>
);

export const AllergiesFormAdd = () => (
  <View style={{ flex: 1 }}>
    <AllergiesForm
      mode="add"
      onSave={(data) => console.log("Saved:", data)}
      onCancel={() => console.log("Cancelled")}
    />
  </View>
);

export const AllergiesFormEdit = () => (
  <View style={{ flex: 1 }}>
    <AllergiesForm
      mode="edit"
      initialData={{
        name: "Peanuts",
        category: "food",
        severity: "severe",
        symptoms: ["difficulty breathing", "swelling"],
        notes: "Can be life-threatening",
      }}
      onSave={(data) => console.log("Updated:", data)}
      onDelete={() => console.log("Deleted")}
      onCancel={() => console.log("Cancelled")}
    />
  </View>
);
