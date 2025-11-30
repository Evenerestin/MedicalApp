import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./ReminderSelector.styles";

export type ReminderType = "day" | "week" | "month";

export interface ReminderSelectorProps {
  value?: ReminderType[];
  onChange?: (reminders: ReminderType[]) => void;
  disabled?: boolean;
}

const reminderOptions: { type: ReminderType; label: string }[] = [
  { type: "day", label: "1 day before" },
  { type: "week", label: "1 week before" },
  { type: "month", label: "1 month before" },
];

export const ReminderSelector = ({
  value = [],
  onChange,
  disabled = false,
}: ReminderSelectorProps) => {
  const handleToggle = (type: ReminderType) => {
    if (disabled) return;

    const newValue = value.includes(type)
      ? value.filter((r) => r !== type)
      : [...value, type];

    onChange?.(newValue);
  };

  return (
    <View style={styles.container}>
      {reminderOptions.map((option) => {
        const isSelected = value.includes(option.type);

        return (
          <TouchableOpacity
            key={option.type}
            style={[
              styles.option,
              isSelected && styles.optionSelected,
              disabled && styles.optionDisabled,
            ]}
            onPress={() => handleToggle(option.type)}
            activeOpacity={0.7}
            disabled={disabled}
          >
            <View
              style={[
                styles.checkbox,
                isSelected && styles.checkboxSelected,
                disabled && styles.checkboxDisabled,
              ]}
            >
              {isSelected && (
                <Ionicons name="checkmark" size={16} color="#ffffff" />
              )}
            </View>
            <Text
              style={[
                styles.label,
                isSelected && styles.labelSelected,
                disabled && styles.labelDisabled,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
