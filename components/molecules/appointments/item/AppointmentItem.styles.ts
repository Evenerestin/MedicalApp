import { StyleSheet } from "react-native";

export const appointmentItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  time: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1976d2",
  },
});
