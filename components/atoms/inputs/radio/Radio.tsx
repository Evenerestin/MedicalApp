import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type RadioProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  style?: any;
  variant?: "outline" | "filled";
};

export const Radio: React.FC<RadioProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  style,
  variant = "filled",
}) => {
  const handlePress = () => {
    if (!disabled) onChange(!checked);
  };

  const outerStyle = [
    radioStyles.outerCircle,
    variant === "filled" && checked ? radioStyles.outerCircleFilled : null,
    disabled && radioStyles.outerCircleDisabled,
  ];
  const innerStyle = [
    radioStyles.innerCircle,
    variant === "filled" && checked ? radioStyles.innerCircleFilled : null,
  ];
  return (
    <View style={[radioStyles.root, style, disabled && radioStyles.disabled]}>
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={radioStyles.radio}
        accessibilityRole="radio"
        accessibilityState={{ checked, disabled }}
      >
        <View style={outerStyle}>{checked && <View style={innerStyle} />}</View>
      </Pressable>
      {label && <Text style={radioStyles.label}>{label}</Text>}
    </View>
  );
};

const radioStyles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 32,
  },
  radio: {
    marginRight: 12,
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#1976d2",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  outerCircleFilled: {
    backgroundColor: "#1976d2",
    borderColor: "#1976d2",
  },
  outerCircleDisabled: {
    borderColor: "#ccccd6",
    backgroundColor: "#f5f5f5",
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1976d2",
  },
  innerCircleFilled: {
    backgroundColor: "#fff",
  },
  label: {
    color: "#222",
    fontSize: 16,
    fontWeight: "400",
  },
  disabled: {
    opacity: 0.5,
  },
});
