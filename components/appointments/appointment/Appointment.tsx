import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../Appointment.styles";

export interface AppointmentProps {
  title: string;
  description?: string;
  time: string;
  onPress?: () => void;
}

export const Appointment = ({
  title,
  description,
  time,
  onPress,
}: AppointmentProps) => {
  return (
    <TouchableOpacity
      style={styles.appointmentContainer}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.appointmentContent}>
        <Text style={styles.appointmentTitle}>{title}</Text>
        {description && (
          <Text style={styles.appointmentDescription}>{description}</Text>
        )}
      </View>
      <Text style={styles.appointmentTime}>{time}</Text>
    </TouchableOpacity>
  );
};

export interface AppointmentListHeaderProps {
  date: Date;
  onAddAppointment?: () => void;
}

export const AppointmentListHeader = ({
  date,
  onAddAppointment,
}: AppointmentListHeaderProps) => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayName = dayNames[date.getDay()];
  const monthName = monthNames[date.getMonth()];
  const dayNumber = date.getDate();
  const year = date.getFullYear();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerDate}>
        {dayName}, {monthName} {dayNumber}, {year}
      </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={onAddAppointment || (() => {})}
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={20} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

export interface AppointmentListProps {
  date: Date;
  appointments?: AppointmentProps[];
  onAddAppointment?: () => void;
  maxHeight?: number;
}

export const AppointmentList = ({
  date,
  appointments = [],
  onAddAppointment,
  maxHeight = 300,
}: AppointmentListProps) => {
  return (
    <View style={styles.appointmentListContainer}>
      <AppointmentListHeader date={date} onAddAppointment={onAddAppointment} />
      <ScrollView
        style={[styles.appointmentScrollView, { maxHeight }]}
        showsVerticalScrollIndicator={true}
      >
        {appointments.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No appointments scheduled</Text>
          </View>
        ) : (
          appointments.map((appointment, index) => (
            <Appointment
              key={index}
              title={appointment.title}
              description={appointment.description}
              time={appointment.time}
              onPress={appointment.onPress}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};
