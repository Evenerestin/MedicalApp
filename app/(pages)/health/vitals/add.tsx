import { useRouter } from "expo-router";
import React from "react";
import {
  VitalForm,
  VitalFormData,
} from "../../../../components/organisms/vitals";
import { useAppDispatch } from "../../../../context/AppContext";
import { VitalMeasurement } from "../../../../types";

export default function AddVitalPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSave = (data: VitalFormData) => {
    const newMeasurement: VitalMeasurement = {
      id: Date.now().toString(),
      userId: "current-user",
      type: data.type,
      value: data.value,
      secondaryValue: data.secondaryValue,
      unit: data.unit,
      measuredAt: data.measuredAt,
      notes: data.notes,
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: "ADD_VITAL_MEASUREMENT", payload: newMeasurement });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return <VitalForm onSave={handleSave} onCancel={handleCancel} />;
}
