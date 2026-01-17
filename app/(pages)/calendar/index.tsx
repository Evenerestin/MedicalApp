import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "../../../components/molecules/calendar/Calendar";
import { useAppointments } from "../../../context/AppContext";
import { Appointment } from "../../../types";

export default function CalendarPage() {
  const router = useRouter();
  const appointments = useAppointments();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateStr = selectedDate.toISOString().split("T")[0];
  const dayAppointments = appointments.filter(
    (apt) => apt.date === selectedDateStr,
  );

  const appointmentDates = new Set(appointments.map((apt) => apt.date));

  const hasEvents = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return appointmentDates.has(dateStr);
  };

  const handleAddAppointment = () => {
    router.push("/(pages)/calendar/appointment/new" as any);
  };

  const handleAppointmentPress = (appointment: Appointment) => {
    router.push(`/(pages)/calendar/appointment/${appointment.id}` as any);
  };

  const handleDayPress = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calendar</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddAppointment}
        >
          <Ionicons name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.calendarWrapper}>
        <Calendar
          selectedDate={selectedDate}
          onDayPress={handleDayPress}
          hasEvents={hasEvents}
        />
      </View>

      <View style={styles.appointmentsSection}>
        <Text style={styles.sectionTitle}>
          Appointments for {selectedDate.toLocaleDateString()}
        </Text>

        <ScrollView style={styles.appointmentsList}>
          {dayAppointments.length > 0 ? (
            dayAppointments.map((appointment) => (
              <TouchableOpacity
                key={appointment.id}
                style={styles.appointmentCard}
                onPress={() => handleAppointmentPress(appointment)}
              >
                <View style={styles.appointmentTime}>
                  <Ionicons name="time-outline" size={16} color="#666666" />
                  <Text style={styles.timeText}>{appointment.time}</Text>
                </View>
                <Text style={styles.appointmentTitle}>{appointment.title}</Text>
                {appointment.doctorName && (
                  <Text style={styles.appointmentDoctor}>
                    Dr. {appointment.doctorName}
                  </Text>
                )}
                {appointment.address && (
                  <Text style={styles.appointmentLocation}>
                    📍 {appointment.address}
                  </Text>
                )}
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={48} color="#cccccc" />
              <Text style={styles.emptyText}>No appointments for this day</Text>
              <TouchableOpacity
                style={styles.addAppointmentButton}
                onPress={handleAddAppointment}
              >
                <Text style={styles.addAppointmentButtonText}>
                  Add Appointment
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: "#152b4f",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarWrapper: {
    flex: 1,
  },
  appointmentsSection: {
    height: 0,
    padding: 0,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#152b4f",
    marginBottom: 12,
  },
  appointmentsList: {
    flex: 1,
  },
  appointmentCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  appointmentTime: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  timeText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 6,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  appointmentDoctor: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
  appointmentLocation: {
    fontSize: 12,
    color: "#999999",
    marginTop: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: "#666666",
    marginTop: 12,
    marginBottom: 20,
  },
  addAppointmentButton: {
    backgroundColor: "#152b4f",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addAppointmentButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
});
