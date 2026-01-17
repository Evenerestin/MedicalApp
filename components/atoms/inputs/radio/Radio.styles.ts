import { StyleSheet } from "react-native";

export const radioStyles = StyleSheet.create({
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
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1976d2",
  },
  label: {
    color: "#222",
    fontSize: 16,
    fontWeight: "500",
  },
  disabled: {
    opacity: 0.5,
  },
});
