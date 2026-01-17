import React, { useState } from "react";
import { View } from "react-native";
import { Calendar } from "../../molecules/calendar/Calendar";
import {
  Appointment,
  AppointmentsCard,
} from "../../organisms/appointments/card/AppointmentsCard";

export default {
  title: "Templates/CalendarView",
  component: Calendar,
};

const sampleAppointments: Appointment[] = [
  {
    id: "1",
    title: "Wizyta kontrolna",
    description: "Przychodnia Zdrowie, ul. Lekarska 12",
    time: "09:00",
  },
  {
    id: "2",
    title: "Badanie krwi",
    description: "Laboratorium MedLab, ul. Diagnostyczna 5",
    time: "11:30",
  },
];

export const Default = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 16 }}>
      <View style={{ flex: 2 }}>
        <Calendar
          selectedDate={selectedDate}
          onDayPress={setSelectedDate}
          hasEvents={() => false}
        />
      </View>
      <View style={{ flex: 1, marginTop: 16 }}>
        <AppointmentsCard
          date={selectedDate}
          appointments={sampleAppointments}
          onAddPress={() => {}}
          onAppointmentPress={() => {}}
        />
      </View>
    </View>
  );
};
