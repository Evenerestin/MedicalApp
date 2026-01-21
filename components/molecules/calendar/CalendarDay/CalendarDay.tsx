import React from "react";
import { Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import styles from "./CalendarDay.styles";

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  onPress: () => void;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  isCurrentMonth,
  isSelected,
  isToday,
  onPress,
}) => {
  const dayStyles: ViewStyle[] = [styles.day];
  const textStyles: TextStyle[] = [styles.text];

  if (isToday && isSelected) {
    dayStyles.push(styles.filled);
    textStyles.push(styles.textFilled);
  } else if (isToday) {
    dayStyles.push(styles.outline);
    textStyles.push(styles.textOutline);
  } else if (isSelected) {
    dayStyles.push(styles.light);
    textStyles.push(styles.textLight);
  }

  if (!isCurrentMonth) {
    dayStyles.push(styles.outside);
  }

  return (
    <TouchableOpacity
      style={dayStyles}
      onPress={onPress}
      disabled={!isCurrentMonth}
    >
      <Text style={textStyles}>{date.getDate()}</Text>
    </TouchableOpacity>
  );
};
