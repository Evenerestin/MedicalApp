import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../shared/buttons/Button";
import { styles } from "../Calendar.styles";

export interface CalendarHeaderProps {
  year: number;
  month: number;
  onPreviousMonth?: () => void;
  onNextMonth?: () => void;
  onMonthChange?: (month: number) => void;
  onYearChange?: (year: number) => void;
  showDropdowns?: boolean;
  minYear?: number;
  maxYear?: number;
}

export const CalendarHeader = ({
  year,
  month,
  onPreviousMonth,
  onNextMonth,
  onMonthChange,
  onYearChange,
  showDropdowns = false,
  minYear,
  maxYear,
}: CalendarHeaderProps) => {
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

  const currentYear = new Date().getFullYear();
  const defaultMinYear = minYear ?? currentYear - 2;
  const defaultMaxYear = maxYear ?? currentYear + 2;

  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const handleMonthSelect = (selectedMonth: number) => {
    onMonthChange?.(selectedMonth);
    setShowMonthPicker(false);
  };

  const handleYearSelect = (selectedYear: number) => {
    onYearChange?.(selectedYear);
    setShowYearPicker(false);
  };

  const years = Array.from(
    { length: defaultMaxYear - defaultMinYear + 1 },
    (_, i) => defaultMinYear + i
  );

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.headerButton} onPress={onPreviousMonth}>
          <Ionicons name="chevron-back" size={24} color="#333333" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          {showDropdowns ? (
            <View style={styles.dropdownContainer}>
              <Button
                text={monthNames[month]}
                variant="secondary"
                size="small"
                icon="IconChevronDown"
                iconPosition="right"
                onPress={() => setShowMonthPicker(true)}
              />
              <Button
                text={year.toString()}
                variant="secondary"
                size="small"
                icon="IconChevronDown"
                iconPosition="right"
                onPress={() => setShowYearPicker(true)}
              />
            </View>
          ) : (
            <Text style={styles.headerTitle}>
              {monthNames[month]} {year}
            </Text>
          )}
        </View>

        <TouchableOpacity style={styles.headerButton} onPress={onNextMonth}>
          <Ionicons name="chevron-forward" size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showMonthPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMonthPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMonthPicker(false)}
        >
          <View style={styles.pickerContainer}>
            <FlatList
              data={monthNames}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    styles.pickerItem,
                    index === month && styles.pickerItemSelected,
                  ]}
                  onPress={() => handleMonthSelect(index)}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      index === month && styles.pickerItemTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={showYearPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowYearPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowYearPicker(false)}
        >
          <View style={styles.pickerContainer}>
            <FlatList
              data={years}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.pickerItem,
                    item === year && styles.pickerItemSelected,
                  ]}
                  onPress={() => handleYearSelect(item)}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      item === year && styles.pickerItemTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
