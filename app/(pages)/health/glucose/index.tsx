import { useRouter } from "expo-router";
import React from "react";
import { GlucoseHistory } from "../../../../components/organisms/glucose";
import { useGlucoseMeasurements } from "../../../../context/AppContext";

export default function GlucosePage() {
  const router = useRouter();
  const measurements = useGlucoseMeasurements();

  const handleAddMeasurement = () => {
    router.push("/(pages)/health/glucose/add");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <GlucoseHistory
      measurements={measurements}
      onAddPress={handleAddMeasurement}
      onBack={handleBack}
    />
  );
}
