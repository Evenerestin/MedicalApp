import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  weekdayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 8,
    paddingHorizontal: 4,
  },
  weekday: {
    flex: 1,
    alignItems: "center",
  },
  weekdayText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666666",
  },
  grid: {
    flex: 1,
    paddingHorizontal: 4,
  },
  week: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
