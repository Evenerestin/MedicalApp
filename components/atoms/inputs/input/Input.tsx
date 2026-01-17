import { IconX, IconZoom } from "@tabler/icons-react-native";
import React from "react";
import { Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import { ActionIcon } from "../../buttons/actionicon/ActionIcon";
import { styles } from "./Input.styles";
import { LoadingDots } from "./LoadingDots";

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

const sizeMap = { sm: 36, md: 44, lg: 52 };

export const Input: React.FC<InputProps> = ({
  label,
  required,
  description,
  error,
  leftSection,
  rightSection,
  size = "md",
  variant = "outline",
  loading = false,
  disabled = false,
  style,
  clearable = false,
  onClear,
  value,
  onChangeText,
  ...props
}) => {
  const inputRef = React.useRef<TextInput>(null);
  const inputHeight = sizeMap[size] || 44;
  const borderColor = error
    ? "#e53935"
    : variant === "filled"
    ? "#1976d2"
    : variant === "light"
    ? "#90caf9"
    : "#bdbdbd";
  const backgroundColor =
    variant === "filled" ? "#e3f2fd" : variant === "light" ? "#f5f5f5" : "#fff";

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
          {
            borderColor,
            backgroundColor,
            height: inputHeight,
            opacity: disabled ? 0.5 : 1,
          },
          error && styles.errorInput,
        ]}
      >
        {loading && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 16,
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              height: inputHeight,
              backgroundColor: "transparent",
            }}
          >
            <LoadingDots size={12} />
          </View>
        )}
        {React.isValidElement(leftSection) && (
          <View style={styles.leftSection}>
            <ActionIcon icon={leftSection} variant="transparent" size={size} />
          </View>
        )}
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            {
              height: inputHeight,
              outlineWidth: 0,
              outlineColor: "transparent",
              ...(loading ? { color: "transparent" } : {}),
            },
          ]}
          editable={!disabled && !loading}
          placeholder={loading ? "" : props?.placeholder}
          placeholderTextColor={loading ? "transparent" : "#ccccd6"}
          value={loading ? "" : value}
          selectionColor={loading ? "transparent" : undefined}
          onChangeText={onChangeText}
          {...props}
        />
        {clearable ? (
          <View style={styles.rightSection}>
            <ActionIcon
              icon={<IconX size={20} />}
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
