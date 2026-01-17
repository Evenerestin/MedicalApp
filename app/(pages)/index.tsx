import { useRouter } from "expo-router";
import React from "react";
import { HomeScreen } from "../../components/organisms/home";
import {
  useAppointments,
  useGlucoseMeasurements,
  useICEProfile,
  useMedications,
  useNotifications,
  useUser,
  useVitalMeasurements,
} from "../../context/AppContext";

export default function HomePage() {
  const router = useRouter();
  const user = useUser();
  const appointments = useAppointments();
  const medications = useMedications();
  const vitalMeasurements = useVitalMeasurements();
  const glucoseMeasurements = useGlucoseMeasurements();
  const iceProfile = useICEProfile();
  const notifications = useNotifications();

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const todayAppointments = appointments.filter((apt) => apt.date === todayStr);

  const activeMedications = medications.filter((med) => med.isActive);
  const upcomingMedications =
    activeMedications.length > 0
      ? [
          {
            time: "8:00 AM",
            medications: activeMedications.filter((med) =>
              med.times.includes("08:00")
            ),
          },
          {
            time: "2:00 PM",
            medications: activeMedications.filter((med) =>
              med.times.includes("14:00")
            ),
          },
          {
            time: "8:00 PM",
            medications: activeMedications.filter((med) =>
              med.times.includes("20:00")
            ),
          },
        ].filter((r) => r.medications.length > 0)
      : [];

  const getLatestVital = (type: string) =>
    vitalMeasurements
      .filter((v) => v.type === type)
      .sort(
        (a, b) =>
          new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime()
      )[0];

  const latestGlucose = glucoseMeasurements.sort(
    (a, b) =>
      new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime()
  )[0];

  const recentVitals = {
    bloodPressure: getLatestVital("blood_pressure"),
    heartRate: getLatestVital("heart_rate"),
    weight: getLatestVital("weight"),
    glucose: latestGlucose,
  };

  const unreadNotifications = notifications.filter((n) => !n.isRead).length;

  return (
    <HomeScreen
      userName={user ? `${user.firstName} ${user.lastName}` : "Guest"}
      todayAppointments={todayAppointments}
      upcomingMedications={upcomingMedications}
      recentVitals={recentVitals}
      hasICEProfile={!!iceProfile}
      notificationCount={unreadNotifications}
      onNotificationsPress={() => router.push("/(pages)/notifications")}
      onProfilePress={() => router.push("/(pages)/profile")}
      onCalendarPress={() => router.push("/(pages)/calendar")}
      onMedicationsPress={() => router.push("/(pages)/medications")}
      onVitalsPress={() => router.push("/(pages)/health/vitals")}
      onGlucosePress={() => router.push("/(pages)/health/glucose")}
      onICEPress={() => router.push("/(pages)/profile/ice")}
      onViewAllAppointments={() => router.push("/(pages)/calendar")}
      onViewAllMedications={() => router.push("/(pages)/medications")}
    />
  );
}
