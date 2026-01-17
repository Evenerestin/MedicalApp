import { useRouter } from "expo-router";
import React from "react";
import { VitalsHistory } from "../../../../components/organisms/vitals";
import { useVitalMeasurements } from "../../../../context/AppContext";

export default function VitalsPage() {
  const router = useRouter();
  const measurements = useVitalMeasurements();

  const handleAddMeasurement = () => {
    router.push("/(pages)/health/vitals/add");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <VitalsHistory
      measurements={measurements}
      onAddPress={handleAddMeasurement}
      onBack={handleBack}
    />
  );
}
