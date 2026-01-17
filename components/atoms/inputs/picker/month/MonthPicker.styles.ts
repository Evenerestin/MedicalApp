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
  monthsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
    justifyContent: "center",
  },
  monthCell: {
    width: 96,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    margin: 4,
  },
  selected: {
    backgroundColor: "#1976d2",
  },
  today: {
    borderColor: "#1976d2",
    borderWidth: 2,
  },
  monthText: {
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
