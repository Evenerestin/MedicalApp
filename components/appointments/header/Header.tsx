import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../Appointment.styles";

export interface HeaderProps {
  date: Date;
  onAddPress?: () => void;
}

export const Header = ({ date, onAddPress }: HeaderProps) => {
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
      {onAddPress && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={onAddPress}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={20} color="#ffffff" />
        </TouchableOpacity>
      )}
    </View>
  );
};
