import React, { useState } from "react";
import { View } from "react-native";
import { MedicationItem } from "./MedicationItem";

export default {
  title: "Organisms/Medications/MedicationItem",
  component: MedicationItem,
};

export const Active = () => {
  const [checked, setChecked] = useState(true);
  return (
    <View style={{ padding: 16, backgroundColor: "#f8f9fa" }}>
      <MedicationItem
        name="Aspirin"
        dosage="100"
        unit="mg"
        time="08:00"
        isActive={checked}
        onToggleActive={setChecked}
      />
    </View>
  );
};
