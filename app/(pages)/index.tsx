import { useRouter } from "expo-router";
import React from "react";
import HomeTemplate from "../../components/templates/home/HomeTemplate";
import {
  useAppDispatch,
  useAppointments,
  useGlucoseMeasurements,
  useICEProfile,
  useMedications,
  useNotifications,
  useSettings,
  useUser,
  useVitalMeasurements,
} from "../../context/AppContext";
import { DatabaseService } from "../../lib/database/DatabaseService";

export default function HomePage() {
  const router = useRouter();
  const user = useUser();
  const dispatch = useAppDispatch();
  const appointments = useAppointments();
  const medications = useMedications();
  const vitalMeasurements = useVitalMeasurements();
  const glucoseMeasurements = useGlucoseMeasurements();
  const iceProfile = useICEProfile();
  const notifications = useNotifications();
  const settings = useSettings();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [selectedDate, setSelectedDate] = React.useState<Date>(today);
  const [takenMedications, setTakenMedications] = React.useState<Set<string>>(
    new Set(),
  );

  const miniCalendarDays = React.useMemo(() => {
    const days = [];
    for (let i = -3; i <= 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      date.setHours(0, 0, 0, 0);
      days.push({
        date,
        selected:
          selectedDate &&
          date.getFullYear() === selectedDate.getFullYear() &&
          date.getMonth() === selectedDate.getMonth() &&
          date.getDate() === selectedDate.getDate(),
        disabled: false,
      });
    }
    return days;
  }, [selectedDate, today]);

  const selectedDateStr = selectedDate.toISOString().split("T")[0];
  const selectedAppointments = appointments.filter(
    (apt) => apt.date === selectedDateStr,
  );

  const activeMedications = medications
    .filter((med) => med.isActive)
    .map((med) => ({
      id: med.id,
      name: med.name,
      dosage: med.dosage,
      unit: med.unit,
      isActive: med.isActive,
      time: med.times?.[0] || undefined,
      takenToday: takenMedications.has(med.id),
      frequency: med.frequency,
    }));

  const unreadNotifications = notifications.filter((n) => !n.isRead).length;

  const handleToggleTaken = (id: string, taken: boolean) => {
    setTakenMedications((prev) => {
      const newSet = new Set(prev);
      if (taken) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  return (
    <HomeTemplate
      userName={user ? user.name : "Guest"}
      notificationCount={unreadNotifications}
      onNotificationsPress={() => router.push("/(pages)/notifications")}
      onProfilePress={() => router.push("/(pages)/profile")}
      hasICEProfile={!!iceProfile}
      onICEPress={() => router.push("/(pages)/profile/ice")}
      miniCalendarDays={miniCalendarDays}
      onDayPress={(date) => setSelectedDate(date)}
      appointments={selectedAppointments}
      onAddAppointmentPress={() =>
        router.push("/(pages)/calendar/appointment/new")
      }
      onAppointmentPress={(id) =>
        router.push(`/(pages)/calendar/appointment/${id}`)
      }
      medications={activeMedications}
      onAddMedicationPress={() => router.push("/(pages)/medications/new")}
      onMedicationPress={(id) => router.push(`/(pages)/medications/${id}`)}
      onToggleTaken={handleToggleTaken}
      onActionCardPress={(preset) => {
        if (preset === "allergies") router.push("/(pages)/health/allergies");
        else if (preset === "medications") router.push("/(pages)/medications");
        else if (preset === "vitals") router.push("/(pages)/health/vitals");
        else if (preset === "cycle") router.push("/(pages)/health/menstrual");
      }}
      showMenstrualCalendar={settings.showMenstrualCalendar}
    />
  );
}
