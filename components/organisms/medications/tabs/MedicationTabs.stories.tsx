import React, { useState } from "react";
import { View } from "react-native";
import { MedicationTabs } from "./MedicationTabs";

export default {
  title: "Organisms/Medications/MedicationTabs",
  component: MedicationTabs,
};

export const Default = () => {
  const [activeTab, setActiveTab] = useState("Active");
  return (
    <View style={{ padding: 16, backgroundColor: "#f8f9fa" }}>
      <MedicationTabs
        tabs={["Active", "Inactive"]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </View>
  );
};
