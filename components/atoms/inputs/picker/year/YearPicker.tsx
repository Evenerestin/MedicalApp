import { Ionicons } from "@expo/vector-icons";
import {
  IconCalendarWeek,
  IconChevronDown,
  IconChevronsDown,
  IconChevronsUp,
  IconChevronUp,
} from "@tabler/icons-react-native";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../../buttons/button/Button";
import { styles } from "./YearPicker.styles";

export interface YearPickerProps {
  value?: number;
  onChange?: (year: number) => void;
  label?: string;
  placeholder?: string;
  minYear?: number;
  maxYear?: number;
  disabled?: boolean;
}

export const YearPicker: React.FC<YearPickerProps> = ({
  value,
  onChange,
  label,
  placeholder = "Select year",
  minYear = new Date().getFullYear() - 100,
  maxYear = new Date().getFullYear() + 20,
  disabled,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [year, setYear] = useState(value || new Date().getFullYear());

  const open = () => !disabled && setModalVisible(true);
  const close = () => setModalVisible(false);

  const incrementYear = () => setYear((y) => Math.min(maxYear, y + 1));
  const decrementYear = () => setYear((y) => Math.max(minYear, y - 1));
  const incrementYearBy10 = () => setYear((y) => Math.min(maxYear, y + 10));
  const decrementYearBy10 = () => setYear((y) => Math.max(minYear, y - 10));

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
          {value || placeholder}
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
            <View style={{ alignItems: "center", marginBottom: 16 }}>
              <Text style={styles.monthLabel}>Select Year</Text>
            </View>
            <View style={{ alignItems: "center", marginBottom: 16 }}>
              <TouchableOpacity
                onPress={incrementYearBy10}
                style={styles.arrowBtn}
              >
                <IconChevronsUp size={22} color="#1976d2" />
              </TouchableOpacity>
              <TouchableOpacity onPress={incrementYear} style={styles.arrowBtn}>
                <IconChevronUp size={24} color="#1976d2" />
              </TouchableOpacity>
              <Text style={styles.timeText}>{year}</Text>
              <TouchableOpacity onPress={decrementYear} style={styles.arrowBtn}>
                <IconChevronDown size={24} color="#1976d2" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={decrementYearBy10}
                style={styles.arrowBtn}
              >
                <IconChevronsDown size={22} color="#1976d2" />
              </TouchableOpacity>
            </View>
            <View style={styles.actionRow}>
              <Button
                label="Cancel"
                variant="transparent"
                size="sm"
                onPress={close}
                style={styles.actionBtn}
              />
              <Button
                label="Save"
                variant="light"
                size="sm"
                onPress={() => {
                  onChange?.(year);
                  close();
                }}
                style={styles.actionBtn}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
