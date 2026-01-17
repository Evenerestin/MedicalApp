import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

export interface CalendarYearPickerModalProps {
  value?: number;
  visible: boolean;
  onChange: (year: number) => void;
  onClose: () => void;
  minYear?: number;
  maxYear?: number;
}

export const CalendarYearPickerModal: React.FC<
  CalendarYearPickerModalProps
> = ({
  value,
  visible,
  onChange,
  onClose,
  minYear = new Date().getFullYear() - 100,
  maxYear = new Date().getFullYear() + 20,
}) => {
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i
  );
  return (
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
            {years.map((y) => (
              <TouchableOpacity
                key={y}
                onPress={() => {
                  onChange(y);
                  onClose();
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
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
