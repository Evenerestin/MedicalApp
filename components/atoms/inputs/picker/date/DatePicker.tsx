import {
  IconCalendarWeek,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react-native";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./DatePicker.styles";

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  label?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = "Select date",
  minDate,
  maxDate,
  disabled,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [current, setCurrent] = useState(value || new Date());

  const open = () => !disabled && setModalVisible(true);
  const close = () => setModalVisible(false);

  const selectDate = (day: number) => {
    const selected = new Date(current.getFullYear(), current.getMonth(), day);
    if ((minDate && selected < minDate) || (maxDate && selected > maxDate))
      return;
    onChange?.(selected);
    close();
  };

  const days = getDaysInMonth(current.getFullYear(), current.getMonth());
  const today = new Date();

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[styles.input, disabled && { opacity: 0.5 }]}
        onPress={open}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={value ? styles.value : styles.placeholder}>
          {value ? value.toLocaleDateString() : placeholder}
        </Text>
        <IconCalendarWeek size={20} color="#1976d2" />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={close}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() =>
                  setCurrent(
                    new Date(current.getFullYear(), current.getMonth() - 1, 1)
                  )
                }
                style={styles.navBtn}
              >
                <IconChevronLeft size={20} color="#1976d2" />
              </TouchableOpacity>
              <Text style={styles.monthLabel}>
                {current.toLocaleString("default", { month: "long" })}{" "}
                {current.getFullYear()}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setCurrent(
                    new Date(current.getFullYear(), current.getMonth() + 1, 1)
                  )
                }
                style={styles.navBtn}
              >
                <IconChevronRight size={20} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.daysRow}>
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <Text key={`weekday-${i}`} style={styles.dayName}>
                  {d}
                </Text>
              ))}
            </View>
            <View style={styles.daysGrid}>
              {Array.from({
                length:
                  (new Date(
                    current.getFullYear(),
                    current.getMonth(),
                    1
                  ).getDay() +
                    6) %
                  7,
              }).map((_, i) => (
                <View
                  key={`empty-${current.getFullYear()}-${current.getMonth()}-${i}`}
                  style={styles.dayCell}
                />
              ))}
              {Array.from({ length: days }).map((_, i) => {
                const day = i + 1;
                const dateObj = new Date(
                  current.getFullYear(),
                  current.getMonth(),
                  day
                );
                const isSelected =
                  value &&
                  value.getFullYear() === dateObj.getFullYear() &&
                  value.getMonth() === dateObj.getMonth() &&
                  value.getDate() === dateObj.getDate();
                const isToday =
                  today.getFullYear() === dateObj.getFullYear() &&
                  today.getMonth() === dateObj.getMonth() &&
                  today.getDate() === dateObj.getDate();
                const isDisabled =
                  (minDate && dateObj < minDate) ||
                  (maxDate && dateObj > maxDate);
                return (
                  <TouchableOpacity
                    key={`day-${current.getFullYear()}-${current.getMonth()}-${day}`}
                    style={[
                      styles.dayCell,
                      isSelected && styles.selected,
                      isToday && styles.today,
                      isDisabled && styles.disabled,
                    ]}
                    onPress={() => selectDate(day)}
                    disabled={isDisabled}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        isSelected && styles.selectedText,
                        isToday && styles.todayText,
                        isDisabled && styles.disabledText,
                      ]}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={close}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
