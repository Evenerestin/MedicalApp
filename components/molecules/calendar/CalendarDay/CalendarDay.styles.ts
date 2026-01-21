import { StyleSheet } from "react-native";

export default StyleSheet.create({
  day: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "transparent",
  },
  // Variant: outline (today)
  outline: {
    borderColor: "#1976d2",
    backgroundColor: "transparent",
  },
  filled: {
    backgroundColor: "#1976d2",
    borderColor: "#1976d2",
  },
  light: {
    backgroundColor: "#e3f2fd",
    borderColor: "#1976d2",
  },
  outside: {
    opacity: 0.4,
  },
  text: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "500",
  },
  textOutline: {
    color: "#1976d2",
    fontWeight: "bold",
    fontSize: 16,
  },
  textFilled: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  textLight: {
    color: "#1976d2",
    fontWeight: "bold",
    fontSize: 16,
  },
});
