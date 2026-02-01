import React, { useMemo } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "../../../atoms/buttons/button/Button";
import { AppointmentItem } from "../../../molecules/appointments/item/AppointmentItem";
import { appointmentsListStyles } from "./AppointmentsList.styles";

export interface AppointmentListItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  address?: string;
  doctorName?: string;
}

export interface AppointmentsListProps {
  appointments: AppointmentListItem[];
  onAppointmentPress?: (id: string) => void;
  onAddNew?: () => void;
}

export const AppointmentsList: React.FC<AppointmentsListProps> = ({
  appointments,
  onAppointmentPress,
  onAddNew,
}) => {
  const groupedAppointments = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming: AppointmentListItem[] = [];
    const past: AppointmentListItem[] = [];

    appointments.forEach((apt) => {
      const aptDate = new Date(apt.date);
      aptDate.setHours(0, 0, 0, 0);

      if (aptDate >= today) {
        upcoming.push(apt);
      } else {
        past.push(apt);
      }
    });

    const sortByDateTime = (a: AppointmentListItem, b: AppointmentListItem) => {
      const dateCompare =
        new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateCompare !== 0) return dateCompare;
      return a.time.localeCompare(b.time);
    };

    upcoming.sort(sortByDateTime);
    past.sort(sortByDateTime).reverse();

    return { upcoming, past };
  }, [appointments]);

  if (appointments.length === 0) {
    return (
      <View
        style={[appointmentsListStyles.emptyContainer, { paddingVertical: 48 }]}
      >
        <Text style={appointmentsListStyles.emptyText}>
          No Appointments Yet
        </Text>
        <Text style={appointmentsListStyles.emptySubtext}>
          Schedule your first appointment to get started
        </Text>
      </View>
    );
  }

  const allAppointments = [...appointments].sort((a, b) => {
    const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
    if (dateCompare !== 0) return dateCompare;
    return a.time.localeCompare(b.time);
  });

  return (
    <ScrollView
      style={appointmentsListStyles.container}
      contentContainerStyle={appointmentsListStyles.scrollView}
    >
      {allAppointments.map((apt) => (
        <AppointmentItem
          key={apt.id}
          title={apt.title}
          description={apt.description || apt.doctorName}
          time={apt.time}
          onPress={() => onAppointmentPress?.(apt.id)}
        />
      ))}
    </ScrollView>
  );
};
