import React from "react";
import { View } from "react-native";
import { MedicationsSummary } from "./MedicationsSummary";

export default {
  title: "Organisms/Medications/MedicationsSummary",
  component: MedicationsSummary,
};

export const Default = () => (
  <View style={{ padding: 16 }}>
    <MedicationsSummary
      medications={[
        { id: "1", name: "Aspirin", dosage: "100", unit: "mg", isActive: true },
        {
          id: "2",
          name: "Ibuprofen",
          dosage: "200",
          unit: "mg",
          isActive: false,
        },
        {
          id: "3",
          name: "Vitamin D",
          dosage: "1000",
          unit: "IU",
          isActive: true,
        },
      ]}
      onAddPress={() => {}}
    />
  </View>
);
