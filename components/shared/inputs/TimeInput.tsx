import React, { useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "./TimeInput.styles";

export interface TimeInputProps {
  value?: string;
  onChange?: (time: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const TimeInput = ({
  value = "",
  onChange,
  placeholder = "hh:mm",
  disabled = false,
}: TimeInputProps) => {
  const [time, setTime] = useState(value);
  const inputRef = useRef<TextInput>(null);

  const formatTime = (text: string) => {
    const digits = text.replace(/\D/g, "");

    if (digits.length === 0) return "";
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}:${digits.slice(2)}`;
    return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
  };

  const handleChangeText = (text: string) => {
    const formatted = formatTime(text);
    setTime(formatted);
    onChange?.(formatted);
  };

  return (
    <View style={[styles.container, disabled && styles.containerDisabled]}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={time}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        keyboardType="numeric"
        maxLength={5}
        editable={!disabled}
      />
    </View>
  );
};
