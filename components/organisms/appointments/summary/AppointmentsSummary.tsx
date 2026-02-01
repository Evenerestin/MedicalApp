import { Button } from "@components/atoms/buttons/button/Button";
import {
    IconCalendarEvent,
    IconCalendarPlus,
} from "@tabler/icons-react-native";
import colors from "@theme/colors";
import React, { useMemo } from "react";
import {
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { AppointmentItem } from "../../../molecules/appointments/item/AppointmentItem";
import { styles } from "./AppointmentsSummary.styles";

export interface AppointmentSummaryItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  address?: string;
  doctorName?: string;
}

export interface AppointmentsSummaryProps {
  appointments: AppointmentSummaryItem[];
  onAppointmentPress?: (id: string) => void;
  onAddPress?: () => void;
}

export const AppointmentsSummary: React.FC<AppointmentsSummaryProps> = ({
  appointments,
  onAppointmentPress,
  onAddPress,
}) => {
  const today = new Date();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = dayNames[today.getDay()];

  const groupedAppointments = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming: AppointmentSummaryItem[] = [];
    const past: AppointmentSummaryItem[] = [];

    appointments.forEach((apt) => {
      const aptDate = new Date(apt.date);
      aptDate.setHours(0, 0, 0, 0);

      if (aptDate >= today) {
        upcoming.push(apt);
      } else {
        past.push(apt);
      }
    });

    const sortByDateTime = (a: AppointmentSummaryItem, b: AppointmentSummaryItem) => {
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
      <View style={styles.card}>
        <View style={styles.emptyContainer}>
          <IconCalendarEvent size={32} color={colors.textSecondary} />
          <Text style={styles.emptyText}>No appointments today</Text>
          {onAddPress && (
            <Button
              onPress={onAddPress}
              variant="filled"
              size="sm"
              label="Add Appointment"
              rounded
            />
          )}
        </View>
      </View>
    );
  }

  const handleAppointmentPress = (item: AppointmentSummaryItem) => {
    if (onAppointmentPress) onAppointmentPress(item.id);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{dayName}</Text>
        {onAddPress && (
          <Button
            variant="filled"
            size="sm"
            label="Add Appointment"
            rounded
            onPress={onAddPress}
          />
        )}
      </View>
      <FlatList
        data={appointments}
        renderItem={({ item }) => (
          <AppointmentItem
            title={item.title}
            description={item.description}
            time={item.time}
            onPress={() => handleAppointmentPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};
