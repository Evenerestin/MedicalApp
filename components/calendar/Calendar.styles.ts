import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  day: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    margin: 2,
  },
  day_today: {
    borderWidth: 2,
    borderColor: "#1976d2",
  },
  day_selected: {
    backgroundColor: "#1976d2",
  },
  day_disabled: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "500",
  },
  dayText_otherMonth: {
    color: "#999999",
  },
  dayText_today: {
    color: "#1976d2",
    fontWeight: "bold",
  },
  dayText_selected: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  dayText_disabled: {
    color: "#cccccc",
  },
  eventDot: {
    position: "absolute",
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#4CAF50",
  },

  week: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  monthView: {
    backgroundColor: "#ffffff",
    minHeight: 320,
  },
  weekdayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 8,
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

  header: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  dropdownContainer: {
    flexDirection: "row",
    gap: 8,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    width: 250,
    maxHeight: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pickerItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  pickerItemSelected: {
    backgroundColor: "#e3f2fd",
  },
  pickerItemText: {
    fontSize: 16,
    color: "#333333",
  },
  pickerItemTextSelected: {
    fontWeight: "600",
    color: "#1976d2",
  },
});
