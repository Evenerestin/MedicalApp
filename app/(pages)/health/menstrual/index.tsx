import { useRouter } from "expo-router";
import React from "react";
import { MenstrualCalendar } from "../../../../components/organisms/menstrual";
import {
  useMenstrualCycles,
  useSettings,
} from "../../../../context/AppContext";

export default function MenstrualPage() {
  const router = useRouter();
  const cycles = useMenstrualCycles();
  const settings = useSettings();

  const handleLogPeriod = () => {
    router.push("/(pages)/health/menstrual/log");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <MenstrualCalendar
      cycles={cycles}
      isVisible={settings.showMenstrualCalendar}
      onLogPeriod={handleLogPeriod}
      onBack={handleBack}
    />
  );
}
