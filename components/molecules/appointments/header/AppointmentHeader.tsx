import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ActionIcon } from "../../../atoms/buttons/actionicon/ActionIcon";
import { appointmentHeaderStyles } from "./AppointmentHeader.styles";

export interface AppointmentHeaderProps {
  date: Date;
  onAddPress?: () => void;
}

export const AppointmentHeader: React.FC<AppointmentHeaderProps> = ({
  date,
  onAddPress,
}) => {
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
    <View style={appointmentHeaderStyles.container}>
      <Text style={appointmentHeaderStyles.dateText}>
        {dayName}, {monthName} {dayNumber}, {year}
      </Text>
      {onAddPress && <ActionIcon preset="add" rounded onPress={onAddPress} />}
    </View>
  );
};
