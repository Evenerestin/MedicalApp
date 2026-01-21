import { IconX, IconZoom } from "@tabler/icons-react-native";
import React from "react";
import { Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import { ActionIcon } from "../../buttons/actionicon/ActionIcon";
import { styles } from "./Input.styles";

export type InputProps = TextInputProps & {
  label?: string;
  required?: boolean;
  description?: string;
  error?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "filled" | "light" | "outline";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  clearable?: boolean;
  onClear?: () => void;
};

export const Input: React.FC<InputProps> = ({
  label,
  error,
  required,
  description,
  leftSection,
  rightSection,
  size = "md",
  variant = "outline",
  clearable = false,
  disabled = false,
  style,
  onClear,
  value,
  onChangeText,
  ...props
}) => {
  const inputRef = React.useRef<TextInput>(null);
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      {description && !error && (
        <Text style={styles.description}>{description}</Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          isFocused && { borderColor: "#007AFF" },
          error && { borderColor: "#e53935" },
          disabled && styles.disabledInput,
        ]}
      >
        {React.isValidElement(leftSection) && (
          <View style={styles.leftSection}>
            <ActionIcon icon={leftSection} variant="transparent" size={size} />
          </View>
        )}
        <TextInput
          ref={inputRef}
          style={styles.input}
          editable={!disabled}
          placeholder={props?.placeholder}
          placeholderTextColor={"#ccccd6"}
          value={value}
          onChangeText={onChangeText}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {clearable ? (
          <View style={styles.rightSection}>
            <ActionIcon
              icon={<IconX size={14} />}
              variant="transparent"
              size={size}
              onPress={() => {
                if (onChangeText) onChangeText("");
                if (onClear) onClear();
                inputRef.current?.focus();
              }}
            />
          </View>
        ) : (
          React.isValidElement(rightSection) && (
            <View style={styles.rightSection}>
              <ActionIcon
                icon={rightSection}
                variant="transparent"
                size={size}
              />
            </View>
          )
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};
