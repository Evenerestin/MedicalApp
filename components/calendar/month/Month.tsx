import React from "react";
import { Text, View } from "react-native";
import { styles } from "../Calendar.styles";
import { Week } from "../week/Week";

export interface MonthProps {
  year: number;
  month: number;
  selectedDate?: Date;
  hasEvents?: (date: Date) => boolean;
  isDisabled?: (date: Date) => boolean;
  onDayPress?: (date: Date) => void;
}

export const Month = ({
  year,
  month,
  selectedDate,
  hasEvents,
  isDisabled,
  onDayPress,
}: MonthProps) => {
  const generateCalendarDays = (): Date[][] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Find the first Sunday before or on the first day of the month
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    // Find the last Saturday after or on the last day of the month
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      currentWeek.push(new Date(currentDate));

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weeks;
  };

  const weeks = generateCalendarDays();

  // Always render 6 rows, filling with placeholder dates if needed
  const weeksToRender = [...weeks];
  if (weeksToRender.length < 6) {
    const lastWeek = weeksToRender[weeksToRender.length - 1];
    const lastDate = lastWeek[lastWeek.length - 1];
    let nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + 1);

    while (weeksToRender.length < 6) {
      const emptyWeek: Date[] = [];
      for (let i = 0; i < 7; i++) {
        emptyWeek.push(new Date(nextDate));
        nextDate.setDate(nextDate.getDate() + 1);
      }
      weeksToRender.push(emptyWeek);
    }
  }

  return (
    <View style={styles.monthView}>
      {/* Weekday Headers */}
      <View style={styles.weekdayRow}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <View key={day} style={styles.weekday}>
            <Text style={styles.weekdayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Week Rows */}
      {weeksToRender.map((week, index) => (
        <Week
          key={`week-${index}`}
          days={week}
          selectedDate={selectedDate}
          currentMonth={month}
          hasEvents={hasEvents}
          isDisabled={isDisabled}
          onDayPress={onDayPress}
        />
      ))}
    </View>
  );
};
