import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  day: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: 56,
    height: 56,
    backgroundColor: "#fff",
    padding: 0,
  },
  day_today: {
    borderColor: "#1976d2",
    borderWidth: 2,
    backgroundColor: "transparent",
  },
  day_selected: {
    borderColor: "#1976d2",
    borderWidth: 2,
    backgroundColor: "rgba(25, 118, 210, 0.1)",
  },
  day_todaySelected: {
    borderColor: "#1976d2",
    borderWidth: 2,
    backgroundColor: "#1976d2",
  },
  day_disabled: {
    opacity: 0.4,
  },
  dayText: {
    fontSize: 18,
    color: "#222",
  },
  dayText_otherMonth: {
    color: "#bbb",
  },
  dayText_today: {
    color: "#1976d2",
    fontWeight: "bold",
  },
  dayText_selected: {
    color: "#1976d2",
    fontWeight: "bold",
  },
  dayText_todaySelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  dayText_disabled: {
    color: "#bbb",
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#1976d2",
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: [{ translateX: -2 }],
    zIndex: 2,
  },
  eventDot_selected: {
    backgroundColor: "#1976d2",
  },
  eventDot_todaySelected: {
    backgroundColor: "#fff",
  },
});
