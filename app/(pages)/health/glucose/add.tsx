import { useRouter } from "expo-router";
import React from "react";
import {
  GlucoseForm,
  GlucoseFormData,
} from "../../../../components/organisms/glucose";
import { useAppDispatch } from "../../../../context/AppContext";
import { GlucoseMeasurement } from "../../../../types";

export default function AddGlucosePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSave = (data: GlucoseFormData) => {
    const newMeasurement: GlucoseMeasurement = {
      id: Date.now().toString(),
      userId: "current-user",
      value: data.value,
      unit: data.unit,
      tag: data.tag,
      insulinDose: data.insulinDose,
      insulinType: data.insulinType,
      measuredAt: data.measuredAt,
      notes: data.notes,
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: "ADD_GLUCOSE_MEASUREMENT", payload: newMeasurement });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return <GlucoseForm onSave={handleSave} onCancel={handleCancel} />;
}
