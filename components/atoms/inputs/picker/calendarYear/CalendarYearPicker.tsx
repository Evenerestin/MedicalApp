import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export interface CalendarYearPickerProps {
  value?: number;
  onChange?: (year: number) => void;
  label?: string;
  placeholder?: string;
  minYear?: number;
  maxYear?: number;
  disabled?: boolean;
}

export const CalendarYearPicker: React.FC<CalendarYearPickerProps> = ({
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

  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i
  );

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
        <Text style={{ color: value ? "#222" : "#aaa" }}>
          {value || placeholder}
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
              maxHeight: 400,
            }}
          >
            {years.map((y) => (
              <TouchableOpacity
                key={y}
                onPress={() => {
                  onChange?.(y);
                  close();
                }}
                style={{
                  padding: 12,
                  borderRadius: 6,
                  backgroundColor: value === y ? "#e3f2fd" : "transparent",
                }}
              >
                <Text
                  style={{
                    color: value === y ? "#1976d2" : "#222",
                    fontWeight: value === y ? "bold" : "normal",
                  }}
                >
                  {y}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
