import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./Appointment.styles";
import { Appointment } from "./appointment/Appointment";
import { Header } from "./header/Header";

export interface AppointmentData {
  id: string;
  title: string;
  description?: string;
  time: string;
}

export interface AppointmentsProps {
  date: Date;
  appointments?: AppointmentData[];
  onAddPress?: () => void;
  onAppointmentPress?: (appointment: AppointmentData) => void;
  maxHeight?: number;
}

export const Appointments = ({
  date,
  appointments = [],
  onAddPress,
  onAppointmentPress,
  maxHeight = 300,
}: AppointmentsProps) => {
  return (
    <View style={styles.appointmentListContainer}>
      <Header date={date} onAddPress={onAddPress} />
      <ScrollView
        style={[styles.appointmentScrollView, { maxHeight }]}
        showsVerticalScrollIndicator={true}
      >
        {appointments.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No appointments scheduled</Text>
          </View>
        ) : (
          appointments.map((appointment) => (
            <Appointment
              key={appointment.id}
              title={appointment.title}
              description={appointment.description}
              time={appointment.time}
              onPress={() => onAppointmentPress?.(appointment)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};
