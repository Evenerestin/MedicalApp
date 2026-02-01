import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  outline: {
    borderWidth: 2,
  },
  base: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8eef6",
    paddingVertical: 18,
    paddingHorizontal: 2,
    borderRadius: 12,
    flexDirection: "column",
    width: "100%",
  },
  icon: {
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#152b4f",
    textAlign: "center",
    flexShrink: 0,
    flexWrap: "nowrap",
    includeFontPadding: false,
  },
  sm: {
    padding: 8,
  },
  md: {
    padding: 12,
  },
  lg: {
    padding: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  rounded: {
    borderRadius: 9999,
  },
});
