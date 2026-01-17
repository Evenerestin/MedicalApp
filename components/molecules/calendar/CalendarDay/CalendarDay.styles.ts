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
  selected: {
    backgroundColor: "#e3f2fd",
    borderColor: "#1976d2",
  },
  today: {
    borderColor: "#1976d2",
  },
  todaySelected: {
    backgroundColor: "#1976d2",
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
  textSelected: {
    color: "#1976d2",
    fontWeight: "bold",
  },
  textToday: {
    color: "#1976d2",
    fontWeight: "bold",
  },
  textTodaySelected: {
    color: "#fff",
    fontWeight: "bold",
  },
});
