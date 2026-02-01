import React from "react";
import { MedicationsTemplate } from "./MedicationsTemplate";

export default {
  title: "Templates/MedicationsTemplate",
  component: MedicationsTemplate,
};

const mockMedications = [
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
];

export const Default = () => (
  <MedicationsTemplate
    medications={mockMedications}
    onAddPress={() => {}}
    onMedicationPress={() => {}}
    onToggleActive={() => {}}
  />
);
