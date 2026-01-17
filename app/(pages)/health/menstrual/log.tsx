import { useRouter } from "expo-router";
import React from "react";
import {
  CycleForm,
  CycleFormData,
} from "../../../../components/organisms/menstrual";
import { useAppDispatch } from "../../../../context/AppContext";
import { MenstrualCycle } from "../../../../types";

export default function LogPeriodPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSave = (data: CycleFormData) => {
    const newCycle: MenstrualCycle = {
      id: Date.now().toString(),
      userId: "current-user",
      startDate: data.startDate,
      endDate: data.endDate,
      symptoms: data.symptoms,
      notes: data.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: "ADD_MENSTRUAL_CYCLE", payload: newCycle });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return <CycleForm mode="start" onSave={handleSave} onCancel={handleCancel} />;
}
