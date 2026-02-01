import colors from "@theme/colors";
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
    borderWidth: 0,
    borderColor: "transparent",
  },
  outline: {
    borderColor: "transparent",
    backgroundColor: "transparent",
  },
  filled: {
    backgroundColor: colors.primary,
    borderColor: "transparent",
  },
  light: {
    backgroundColor: "rgba(25, 118, 210, 0.15)", // semi-transparent blue
    borderColor: "transparent",
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
