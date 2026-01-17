import { IconCheck } from "@tabler/icons-react-native";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

export type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  variant?: "filled" | "light" | "outline";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  style?: any;
};

const sizeMap = { sm: 20, md: 24, lg: 28 };

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  variant = "filled",
  disabled = false,
  size = "md",
  rounded = false,
  style,
}) => {
  const boxSize = sizeMap[size] || 24;
  const getBoxStyle = () => {
    switch (variant) {
      case "filled":
        return checked
          ? {
              backgroundColor: "#1976d2",
              borderColor: "#1976d2",
              borderWidth: 2,
            }
          : {
              backgroundColor: "transparent",
              borderColor: "#bdbdbd",
              borderWidth: 1,
            };
      case "light":
        return {
          backgroundColor: "#e3f2fd",
          borderColor: "#1976d2",
        };
      case "outline":
        return {
          backgroundColor: "#fff",
          borderColor: "#1976d2",
        };
      default:
        return {};
    }
  };

  return (
    <Pressable
      onPress={() => !disabled && onChange(!checked)}
      style={[
        styles.box,
        {
          width: boxSize,
          height: boxSize,
          borderRadius: rounded ? boxSize / 2 : 6,
        },
        getBoxStyle(),
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
    >
      {checked && (
        <View style={styles.iconWrapper}>
          <IconCheck
            size={boxSize - 8}
            color={variant === "filled" ? "#fff" : "#1976d2"}
          />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.5,
  },
});
