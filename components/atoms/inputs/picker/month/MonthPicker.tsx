import { Ionicons } from "@expo/vector-icons";
import {
  IconCalendarWeek,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react-native";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./MonthPicker.styles";

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

export interface MonthPickerProps {
  value?: number; // month index (0-11)
  onChange?: (month: number) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const MonthPicker: React.FC<MonthPickerProps> = ({
  value,
  onChange,
  label,
  placeholder = "Select month",
  disabled,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const open = () => !disabled && setModalVisible(true);
  const close = () => setModalVisible(false);

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[styles.input, disabled && { opacity: 0.5 }]}
        onPress={open}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={value !== undefined ? styles.value : styles.placeholder}>
          {value !== undefined ? MONTHS[value] : placeholder}
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
            <View style={styles.monthsGrid}>
              {MONTHS.map((month, idx) => (
                <TouchableOpacity
                  key={month}
                  style={[
                    styles.monthCell,
                    value === idx && styles.selected,
                    idx === new Date().getMonth() && styles.today,
                  ]}
                  onPress={() => {
                    onChange?.(idx);
                    close();
                  }}
                  disabled={disabled}
                >
                  <Text
                    style={[
                      styles.monthText,
                      value === idx && styles.selectedText,
                      idx === new Date().getMonth() && styles.todayText,
                    ]}
                  >
                    {month}
                  </Text>
                </TouchableOpacity>
              ))}
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
