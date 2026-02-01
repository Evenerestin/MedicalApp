import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
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
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <VitalsHistory
        measurements={measurements}
        onAddPress={handleAddMeasurement}
        onBack={handleBack}
      />
    </SafeAreaView>
  );
}
