import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

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

export interface CalendarMonthPickerModalProps {
  value?: number;
  visible: boolean;
  onChange: (month: number) => void;
  onClose: () => void;
}

export const CalendarMonthPickerModal: React.FC<
  CalendarMonthPickerModalProps
> = ({ value, visible, onChange, onClose }) => (
  <Modal visible={visible} transparent animationType="fade">
    <TouchableOpacity
      style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
      onPress={onClose}
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
        <ScrollView>
          {MONTHS.map((m, i) => (
            <TouchableOpacity
              key={m}
              onPress={() => {
                onChange(i);
                onClose();
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
        </ScrollView>
      </View>
    </TouchableOpacity>
  </Modal>
);
