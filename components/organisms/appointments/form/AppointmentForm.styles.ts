import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputField: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 40,
    backgroundColor: "transparent",
  },
  footerButtons: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  deleteButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    marginBottom: 32,
    borderColor: "#f44336",
  },
  deleteButtonText: {
    color: "#f44336",
    fontSize: 16,
    fontWeight: "600",
  },
});
