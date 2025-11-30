import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../Calendar.styles";

export interface DayProps {
  date: Date;
  isToday?: boolean;
  isSelected?: boolean;
  isInCurrentMonth?: boolean;
  hasEvents?: boolean;
  isDisabled?: boolean;
  onPress?: (date: Date) => void;
}

export const Day = ({
  date,
  isToday = false,
  isSelected = false,
  isInCurrentMonth = true,
  hasEvents = false,
  isDisabled = false,
  onPress,
}: DayProps) => {
  const handlePress = () => {
    if (!isDisabled && onPress) {
      onPress(date);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.day,
        isToday && styles.day_today,
        isSelected && styles.day_selected,
        isDisabled && styles.day_disabled,
      ]}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={isDisabled ? 1 : 0.7}
    >
      <Text
        style={[
          styles.dayText,
          !isInCurrentMonth && styles.dayText_otherMonth,
          isToday && styles.dayText_today,
          isSelected && styles.dayText_selected,
          isDisabled && styles.dayText_disabled,
        ]}
      >
        {date.getDate()}
      </Text>
      {hasEvents && !isSelected && <View style={styles.eventDot} />}
    </TouchableOpacity>
  );
};
