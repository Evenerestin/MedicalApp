import React from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { styles } from "./Toggle.styles";

export type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  style?: any;
};

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  style,
}) => {
  const offset = React.useRef(new Animated.Value(checked ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(offset, {
      toValue: checked ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [checked]);

  const handlePress = () => {
    if (!disabled) onChange(!checked);
  };

  const trackColor = disabled ? "#e4e4ea" : checked ? "#1976d2" : "#d4d4de";
  const thumbColor = disabled ? "#ccccd6" : "#fff";

  const translateX = offset.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 16],
  });

  const thumbBorderColor = disabled
    ? "#e4e4ea"
    : checked
    ? "#1976d2"
    : "#d4d4de";

  return (
    <View style={[styles.root, style, disabled && styles.disabled]}>
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={styles.switchContainer}
        accessibilityRole="switch"
        accessibilityState={{ checked, disabled }}
      >
        <View style={[styles.track, { backgroundColor: trackColor }]} />
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: thumbColor,
              transform: [{ translateX }],
              borderColor: thumbBorderColor,
            },
          ]}
        />
      </Pressable>
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
};
