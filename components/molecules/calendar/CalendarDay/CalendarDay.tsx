import React from "react";
import { Text, TouchableOpacity } from "react-native";
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
  const isTodayAndSelected = isToday && isSelected;

  return (
    <TouchableOpacity
      style={[
        styles.day,
        isTodayAndSelected
          ? styles.todaySelected
          : isSelected
          ? styles.selected
          : isToday
          ? styles.today
          : null,
        !isCurrentMonth && styles.outside,
      ]}
      onPress={onPress}
      disabled={!isCurrentMonth}
    >
      <Text
        style={[
          styles.text,
          isTodayAndSelected
            ? styles.textTodaySelected
            : isSelected
            ? styles.textSelected
            : isToday
            ? styles.textToday
            : null,
        ]}
      >
        {date.getDate()}
      </Text>
    </TouchableOpacity>
  );
};
