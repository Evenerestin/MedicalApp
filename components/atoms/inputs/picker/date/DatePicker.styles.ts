import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    color: "#1976d2",
    fontWeight: "bold",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1976d2",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 8,
    justifyContent: "space-between",
  },
  value: {
    color: "#1976d2",
    fontWeight: "bold",
    fontSize: 16,
  },
  placeholder: {
    color: "#bbb",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: 320,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  navBtn: {
    padding: 8,
  },
  monthLabel: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1976d2",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 4,
    width: "100%",
  },
  dayName: {
    flex: 1,
    textAlign: "center",
    color: "#1976d2",
    fontWeight: "bold",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
    width: "100%",
  },
  dayCell: {
    width: "14.28%",
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 2,
  },
  selected: {
    backgroundColor: "#1976d2",
  },
  today: {
    borderColor: "#1976d2",
    borderWidth: 2,
  },
  disabled: {
    opacity: 0.4,
  },
  dayText: {
    fontSize: 16,
    color: "#222",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "bold",
  },
  todayText: {
    color: "#1976d2",
    fontWeight: "bold",
  },
  disabledText: {
    color: "#bbb",
  },
  closeBtn: {
    marginTop: 8,
    alignSelf: "flex-end",
    padding: 8,
  },
  closeText: {
    color: "#1976d2",
    fontWeight: "bold",
  },
});
