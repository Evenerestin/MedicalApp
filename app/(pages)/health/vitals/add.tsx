import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  VitalForm,
  VitalFormData,
} from "../../../../components/organisms/vitals";
import { useAppDispatch, useUser } from "../../../../context/AppContext";
import { DatabaseService } from "../../../../lib/database";

export default function AddVitalPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (data: VitalFormData) => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to save measurements");
      return;
    }

    setIsLoading(true);
    try {
      const newMeasurement = await DatabaseService.addVitalMeasurement(
        user.id,
        {
          userId: user.id,
          type: data.type,
          value: data.value,
          secondaryValue: data.secondaryValue,
          tertiaryValue: data.tertiaryValue,
          unit: data.unit,
          measuredAt: data.measuredAt,
          notes: data.notes,
        },
      );

      dispatch({ type: "ADD_VITAL_MEASUREMENT", payload: newMeasurement });
      router.back();
    } catch (error) {
      console.error("Failed to save vital measurement:", error);
      Alert.alert("Error", "Failed to save measurement. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f8f9fa" }}
      edges={["top"]}
    >
      <VitalForm
        onSave={handleSave}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
}
