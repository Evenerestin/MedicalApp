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
    padding: 16,
    width: 260,
    elevation: 4,
    alignItems: "center",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  timeCol: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  timeText: {
    fontSize: 32,
    color: "#1976d2",
    fontWeight: "bold",
    marginVertical: 8,
  },
  colon: {
    fontSize: 32,
    color: "#1976d2",
    fontWeight: "bold",
    marginHorizontal: 4,
  },
  arrowBtn: {
    padding: 4,
  },
  actionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 18,
    gap: 8,
  },
  actionBtn: {
    flexGrow: 1,
    minWidth: 100,
    marginHorizontal: 2,
    marginVertical: 4,
  },
});
