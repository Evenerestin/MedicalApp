import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  sm: {
    width: 40,
    height: 40,
    padding: 6,
  },
  md: {
    width: 48,
    height: 48,
    padding: 8,
  },
  lg: {
    width: 56,
    height: 56,
    padding: 10,
  },

  filled: {
    backgroundColor: "#1976d2",
  },
  light: {
    backgroundColor: "rgba(25, 118, 210, 0.25)",
    borderWidth: 2,
    borderColor: "#1976d2",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#1976d2",
  },
  transparent: {
    backgroundColor: "transparent",
  },

  disabled: {
    opacity: 0.5,
  },

  rounded: {
    borderRadius: 9999,
  },

  loading: {
    opacity: 0.7,
  },
});
