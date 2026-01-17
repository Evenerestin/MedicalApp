import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { MenstrualCycle, MenstrualPrediction } from "../../../types";
import { styles } from "./Menstrual.styles";

export interface MenstrualCalendarProps {
  cycles: MenstrualCycle[];
  prediction?: MenstrualPrediction;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  onLogPeriod?: () => void;
  onSettings?: () => void;
  onBack?: () => void;
  isVisible?: boolean;
  onToggleVisibility?: (visible: boolean) => void;
}

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
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

export const MenstrualCalendar = ({
  cycles,
  prediction,
  selectedDate,
  onDateSelect,
  onLogPeriod,
  onSettings,
  onBack,
  isVisible = true,
  onToggleVisibility,
}: MenstrualCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: (Date | null)[] = [];

    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const isPeriodDay = (date: Date) => {
    return cycles.some((cycle) => {
      const start = new Date(cycle.startDate);
      const end = cycle.endDate ? new Date(cycle.endDate) : null;

      if (end) {
        return date >= start && date <= end;
      }
      return date.toDateString() === start.toDateString();
    });
  };

  const isPredictedPeriod = (date: Date) => {
    if (!prediction) return false;
    const start = new Date(prediction.nextPeriodStart);
    const end = new Date(prediction.nextPeriodEnd);
    return date >= start && date <= end;
  };

  const isFertileDay = (date: Date) => {
    if (!prediction) return false;
    const start = new Date(prediction.fertileWindowStart);
    const end = new Date(prediction.fertileWindowEnd);
    return date >= start && date <= end;
  };

  const isOvulationDay = (date: Date) => {
    if (!prediction) return false;
    const ovulation = new Date(prediction.ovulationDate);
    return date.toDateString() === ovulation.toDateString();
  };

  const getDayStyle = (date: Date) => {
    const dayStyles: any[] = [styles.dayCell];
    const textStyles: any[] = [styles.dayText];

    if (isOvulationDay(date)) {
      dayStyles.push(styles.ovulationDay);
      textStyles.push(styles.ovulationDayText);
    } else if (isFertileDay(date)) {
      dayStyles.push(styles.fertileDay);
      textStyles.push(styles.fertileDayText);
    } else if (isPeriodDay(date)) {
      dayStyles.push(styles.periodDay);
      textStyles.push(styles.periodDayText);
    } else if (isPredictedPeriod(date)) {
      dayStyles.push(styles.predictedPeriod);
      textStyles.push(styles.predictedPeriodText);
    }

    if (isToday(date)) {
      dayStyles.push(styles.dayToday);
    }

    if (isSelected(date)) {
      dayStyles.push(styles.daySelected);
      textStyles.push(styles.dayTextSelected);
    }

    return { dayStyles, textStyles };
  };

  const days = getDaysInMonth(currentMonth);
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const handlePrevMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentMonth(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentMonth(newDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#152b4f" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Menstrual Calendar</Text>
        <View style={styles.headerActions}>
          {onSettings && (
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={onSettings}
            >
              <Ionicons name="settings-outline" size={24} color="#152b4f" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {onToggleVisibility && (
        <View style={styles.visibilityToggle}>
          <View>
            <Text style={styles.visibilityLabel}>Show Module</Text>
            <Text style={styles.visibilityDescription}>
              Toggle visibility of menstrual calendar
            </Text>
          </View>
          <Switch
            value={isVisible}
            onValueChange={onToggleVisibility}
            trackColor={{ false: "#e0e0e0", true: "#ffcdd2" }}
            thumbColor={isVisible ? "#c62828" : "#f4f3f4"}
          />
        </View>
      )}

      <View style={styles.calendarContainer}>
        <View style={styles.monthHeader}>
          <TouchableOpacity
            style={styles.monthNavButton}
            onPress={handlePrevMonth}
          >
            <Ionicons name="chevron-back" size={24} color="#152b4f" />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </Text>
          <TouchableOpacity
            style={styles.monthNavButton}
            onPress={handleNextMonth}
          >
            <Ionicons name="chevron-forward" size={24} color="#152b4f" />
          </TouchableOpacity>
        </View>

        <View style={styles.weekDaysRow}>
          {DAYS_OF_WEEK.map((day) => (
            <Text key={day} style={styles.weekDayLabel}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.daysGrid}>
          {weeks.map((week, weekIndex) => (
            <View key={weekIndex} style={styles.weekRow}>
              {week.map((date, dayIndex) => {
                if (!date) {
                  return <View key={dayIndex} style={styles.dayCell} />;
                }

                const { dayStyles, textStyles } = getDayStyle(date);

                return (
                  <TouchableOpacity
                    key={dayIndex}
                    style={dayStyles}
                    onPress={() => onDateSelect?.(date)}
                  >
                    <Text style={textStyles}>{date.getDate()}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#ffcdd2" }]} />
            <Text style={styles.legendText}>Period</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#c8e6c9" }]} />
            <Text style={styles.legendText}>Fertile</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                {
                  backgroundColor: "#a5d6a7",
                  borderWidth: 1,
                  borderColor: "#2e7d32",
                },
              ]}
            />
            <Text style={styles.legendText}>Ovulation</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                {
                  backgroundColor: "#ffebee",
                  borderWidth: 1,
                  borderColor: "#ef9a9a",
                },
              ]}
            />
            <Text style={styles.legendText}>Predicted</Text>
          </View>
        </View>
      </View>

      {prediction && (
        <View style={styles.cycleInfoCard}>
          <Text style={styles.cycleInfoTitle}>Cycle Information</Text>
          <View style={styles.cycleInfoRow}>
            <Text style={styles.cycleInfoLabel}>Average cycle length</Text>
            <Text style={styles.cycleInfoValue}>
              {prediction.averageCycleLength} days
            </Text>
          </View>
          <View style={styles.cycleInfoRow}>
            <Text style={styles.cycleInfoLabel}>Average period length</Text>
            <Text style={styles.cycleInfoValue}>
              {prediction.averagePeriodLength} days
            </Text>
          </View>
          <View style={styles.cycleInfoRow}>
            <Text style={styles.cycleInfoLabel}>Next period</Text>
            <Text style={[styles.cycleInfoValue, styles.cycleInfoHighlight]}>
              {new Date(prediction.nextPeriodStart).toLocaleDateString(
                "pl-PL",
                {
                  day: "numeric",
                  month: "short",
                },
              )}
            </Text>
          </View>
          <View style={styles.cycleInfoRow}>
            <Text style={styles.cycleInfoLabel}>Ovulation date</Text>
            <Text style={styles.cycleInfoValue}>
              {new Date(prediction.ovulationDate).toLocaleDateString("pl-PL", {
                day: "numeric",
                month: "short",
              })}
            </Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.logPeriodButton} onPress={onLogPeriod}>
        <Ionicons name="add-circle-outline" size={24} color="#ffffff" />
        <Text style={styles.logPeriodButtonText}>Log Period</Text>
      </TouchableOpacity>
    </View>
  );
};
