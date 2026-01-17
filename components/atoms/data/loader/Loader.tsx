import React from "react";
import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native";

export type LoaderProps = {
  size?: "sm" | "md" | "lg" | number;
  color?: string;
  style?: ViewStyle;
};

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const Loader: React.FC<LoaderProps> = ({
  size = "md",
  color = "#1976d2",
  style,
}) => {
  const indicatorSize =
    typeof size === "number" ? size : sizeMap[size] || sizeMap.md;
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={indicatorSize} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
