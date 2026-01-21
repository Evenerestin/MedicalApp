import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
  },
  sm: {
    width: 40,
    height: 40,
    padding: 6,
  },
  md: {
    width: 44,
    height: 44,
    padding: 8,
  },
  lg: {
    width: 56,
    height: 56,
    padding: 10,
  },
  disabled: {
    opacity: 0.5,
  },

  rounded: {
    borderRadius: 9999,
  },
});
