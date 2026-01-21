import React from "react";
import { FlatList, View } from "react-native";
import { AppointmentHeader } from "../../../molecules/appointments/header/AppointmentHeader";
import { AppointmentItem } from "../../../molecules/appointments/item/AppointmentItem";
import styles from "./AppointmentsCard.styles";

export interface Appointment {
  id: string;
  title: string;
  description?: string;
  time: string;
  onPress?: () => void;
}

export interface AppointmentsCardProps {
  date?: Date;
  appointments?: Appointment[];
  onAddPress?: () => void;
  onAppointmentPress?: (appointment: Appointment) => void;
}

export const AppointmentsCard: React.FC<AppointmentsCardProps> = ({
  date = new Date(),
  appointments = [],
  onAddPress,
  onAppointmentPress,
}) => {
  const handleAppointmentPress = (appointment: Appointment) => {
    if (onAppointmentPress) {
      onAppointmentPress(appointment);
    }
  };

  return (
    <View style={styles.card}>
      <AppointmentHeader date={date} onAddPress={onAddPress} />
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
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

export default AppointmentsCard;
