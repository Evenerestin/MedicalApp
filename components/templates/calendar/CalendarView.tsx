import React, { useState } from "react";
import { View } from "react-native";
import { Calendar } from "../../molecules/calendar/Calendar";
import {
  Appointment,
  AppointmentsCard,
} from "../../organisms/appointments/card/AppointmentsCard";

export interface CalendarViewProps {
  initialAppointments?: Appointment[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  initialAppointments = [],
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const appointmentsForDate = initialAppointments.filter(
    (apt) =>
      formatDate(selectedDate) ===
      formatDate(
        new Date(
          apt.time ? `${formatDate(selectedDate)}T${apt.time}` : selectedDate,
        ),
      ),
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View style={{ flex: 2 }}>
        <Calendar
          selectedDate={selectedDate}
          onDayPress={setSelectedDate}
          hasEvents={(date) =>
            initialAppointments.some(
              (apt) =>
                formatDate(date) ===
                formatDate(
                  new Date(apt.time ? `${formatDate(date)}T${apt.time}` : date),
                ),
            )
          }
        />
      </View>
      <View style={{ flex: 1 }}>
        <AppointmentsCard
          date={selectedDate}
          appointments={appointmentsForDate}
          onAddPress={() => {}}
          onAppointmentPress={() => {}}
        />
      </View>
    </View>
  );
};

export default CalendarView;
