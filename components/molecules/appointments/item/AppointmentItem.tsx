import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { appointmentItemStyles } from "./AppointmentItem.styles";

export interface AppointmentItemProps {
  title: string;
  description?: string;
  time: string;
  onPress?: () => void;
}

export const AppointmentItem: React.FC<AppointmentItemProps> = ({
  title,
  description,
  time,
  onPress,
}) => (
  <TouchableOpacity
    style={appointmentItemStyles.container}
    onPress={onPress}
    activeOpacity={0.7}
    disabled={!onPress}
  >
    <View style={appointmentItemStyles.content}>
      <Text style={appointmentItemStyles.title}>{title}</Text>
      {description && (
        <Text style={appointmentItemStyles.description}>{description}</Text>
      )}
    </View>
    <Text style={appointmentItemStyles.time}>{time}</Text>
  </TouchableOpacity>
);
