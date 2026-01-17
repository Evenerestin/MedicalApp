import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

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

export interface CalendarMonthPickerProps {
  value?: number; 
  onChange?: (month: number) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const CalendarMonthPicker: React.FC<CalendarMonthPickerProps> = ({
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
      {label && <Text style={{ marginBottom: 4 }}>{label}</Text>}
      <TouchableOpacity
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          backgroundColor: disabled ? "#f5f5f5" : "#fff",
        }}
        onPress={open}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={{ color: value !== undefined ? "#222" : "#aaa" }}>
          {value !== undefined ? MONTHS[value] : placeholder}
        </Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
          onPress={close}
          activeOpacity={1}
        >
          <View
            style={{
              margin: 40,
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 16,
            }}
          >
            {MONTHS.map((m, i) => (
              <TouchableOpacity
                key={m}
                onPress={() => {
                  onChange?.(i);
                  close();
                }}
                style={{
                  padding: 12,
                  borderRadius: 6,
                  backgroundColor: value === i ? "#e3f2fd" : "transparent",
                }}
              >
                <Text
                  style={{
                    color: value === i ? "#1976d2" : "#222",
                    fontWeight: value === i ? "bold" : "normal",
                  }}
                >
                  {m}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
