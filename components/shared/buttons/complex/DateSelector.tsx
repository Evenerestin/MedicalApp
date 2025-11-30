import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Month } from "../../../calendar/month/Month";
import { styles } from "./DateSelector.styles";

export interface DateSelectorProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const DateSelector = ({
  value,
  onChange,
  placeholder = "Select date",
  disabled = false,
}: DateSelectorProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value);

  const formatDate = (date: Date) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${
      monthNames[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onChange?.(date);
    setIsVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={() => !disabled && setIsVisible(true)}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <Text style={[styles.text, !selectedDate && styles.placeholder]}>
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </Text>
        <Ionicons
          name="calendar-outline"
          size={20}
          color={disabled ? "#cccccc" : "#152b4f"}
        />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View
            style={styles.modalContainer}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date</Text>
            </View>
            <View style={styles.modalContent}>
              <Month
                year={selectedDate?.getFullYear() || new Date().getFullYear()}
                month={selectedDate?.getMonth() || new Date().getMonth()}
                selectedDate={selectedDate}
                onDayPress={handleDateSelect}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
