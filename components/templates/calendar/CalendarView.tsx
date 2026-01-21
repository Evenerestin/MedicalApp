import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "../../molecules/calendar/Calendar";
import {
  Appointment,
  AppointmentsCard,
} from "../../organisms/appointments/card/AppointmentsCard";

export interface CalendarViewProps {
  initialAppointments?: Appointment[];
  onAddPress?: () => void;
  onAppointmentPress?: (appointment: Appointment) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  initialAppointments = [],
  onAddPress,
  onAppointmentPress,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const appointmentsForDate = initialAppointments.filter((apt) => {
    if (!apt.time) return false;
    const aptDate = apt.time.split("T")[0];
    return aptDate === formatDate(selectedDate);
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            flex: 1,
            margin: 12,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <Calendar
            selectedDate={selectedDate}
            onDayPress={setSelectedDate}
            hasEvents={(date) =>
              initialAppointments.some((apt) => {
                if (!apt.time) return false;
                const aptDate = apt.time.split("T")[0];
                return aptDate === formatDate(date);
              })
            }
          />
          <AppointmentsCard
            date={selectedDate}
            appointments={appointmentsForDate}
            onAddPress={onAddPress || (() => {})}
            onAppointmentPress={onAppointmentPress || (() => {})}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarView;
