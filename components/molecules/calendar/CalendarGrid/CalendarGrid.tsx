import React from "react";
import { Text, View } from "react-native";
import { CalendarDay } from "../CalendarDay/CalendarDay";
import styles from "./CalendarGrid.styles";

interface CalendarGridProps {
  days: Array<{
    date: Date;
    isCurrentMonth: boolean;
    isSelected: boolean;
    isToday: boolean;
  }>;
  onDayPress: (date: Date) => void;
}

const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  onDayPress,
}) => {
  const weeks: Array<typeof days> = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <View style={styles.container}>
      <View style={styles.weekdayRow}>
        {weekdays.map((day, idx) => (
          <View key={idx} style={styles.weekday}>
            <Text style={styles.weekdayText}>{day}</Text>
          </View>
        ))}
      </View>
      <View style={styles.grid}>
        {weeks.map((week, weekIdx) => (
          <View key={weekIdx} style={styles.week}>
            {week.map((day) => (
              <CalendarDay
                key={day.date.toISOString()}
                date={day.date}
                isCurrentMonth={day.isCurrentMonth}
                isSelected={day.isSelected}
                isToday={day.isToday}
                onPress={() => onDayPress(day.date)}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};
