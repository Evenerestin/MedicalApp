import colors from "@theme/colors";
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
  cancelButton: {
    marginRight: 8,
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  unitSelector: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  unitOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  unitOptionSelected: {
    backgroundColor: "#1976d2",
    borderColor: "#1976d2",
  },
  unitOptionText: {
    fontSize: 14,
    color: "#333",
  },
  unitOptionTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  frequencySelector: {
    gap: 8,
  },
  frequencyOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  frequencyOptionSelected: {
    backgroundColor: "#1976d2",
    borderColor: "#1976d2",
  },
  frequencyOptionText: {
    fontSize: 14,
    color: "#333",
  },
  frequencyOptionTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  timeSchedule: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  timeChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    gap: 8,
  },
  timeChipText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  timeChipClose: {
    fontSize: 20,
    color: "#999",
    fontWeight: "300",
  },
  addTimeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#1976d2",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  addTimeButtonText: {
    fontSize: 14,
    color: "#1976d2",
    fontWeight: "600",
  },
});
