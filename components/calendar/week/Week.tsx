import React from "react";
import { View } from "react-native";
import { styles } from "../Calendar.styles";
import { Day } from "../day/Day";

export interface WeekProps {
  days: Date[];
  selectedDate?: Date;
  currentMonth: number;
  hasEvents?: (date: Date) => boolean;
  isDisabled?: (date: Date) => boolean;
  onDayPress?: (date: Date) => void;
}

export const Week = ({
  days,
  selectedDate,
  currentMonth,
  hasEvents,
  isDisabled,
  onDayPress,
}: WeekProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <View style={styles.week}>
      {days.map((date, index) => {
        const dateTime = date.getTime();
        const isToday = dateTime === today.getTime();
        const isSelected = selectedDate
          ? dateTime === selectedDate.getTime()
          : false;
        const isInCurrentMonth = date.getMonth() === currentMonth;
        const hasEventsOnDate = hasEvents ? hasEvents(date) : false;
        const isDisabledDate = isDisabled ? isDisabled(date) : false;

        return (
          <Day
            key={`${date.getTime()}-${index}`}
            date={date}
            isToday={isToday}
            isSelected={isSelected}
            isInCurrentMonth={isInCurrentMonth}
            hasEvents={hasEventsOnDate}
            isDisabled={isDisabledDate}
            onPress={onDayPress}
          />
        );
      })}
    </View>
  );
};
