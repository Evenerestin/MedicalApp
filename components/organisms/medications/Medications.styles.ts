import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#152b4f",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#152b4f",
    justifyContent: "center",
    alignItems: "center",
  },

  listContainer: {
    padding: 16,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  emptyStateIcon: {
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#999999",
    textAlign: "center",
    marginTop: 8,
  },

  medicationCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medicationCardInactive: {
    opacity: 0.6,
  },
  medicationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#152b4f",
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 14,
    color: "#666666",
  },
  medicationActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  medicationDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  detailBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  detailBadgeText: {
    fontSize: 12,
    color: "#666666",
    marginLeft: 4,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: "#e8f5e9",
  },
  statusInactive: {
    backgroundColor: "#fbe9e7",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  statusTextActive: {
    color: "#2e7d32",
  },
  statusTextInactive: {
    color: "#c62828",
  },

  formContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#152b4f",
    flex: 1,
  },
  deleteButton: {
    padding: 8,
  },
  formScrollContent: {
    padding: 16,
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#152b4f",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
    marginBottom: 8,
  },
  input: {
    height: 48,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333333",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputFocused: {
    borderColor: "#152b4f",
    backgroundColor: "#ffffff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },

  unitSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  unitOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f0f4f8",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  unitOptionSelected: {
    backgroundColor: "#152b4f",
    borderColor: "#152b4f",
  },
  unitOptionText: {
    fontSize: 14,
    color: "#666666",
  },
  unitOptionTextSelected: {
    color: "#ffffff",
    fontWeight: "500",
  },

  frequencySelector: {
    flexDirection: "column",
    gap: 8,
  },
  frequencyOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#f0f4f8",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  frequencyOptionSelected: {
    backgroundColor: "#e8eef6",
    borderColor: "#152b4f",
  },
  frequencyOptionText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 12,
  },
  frequencyOptionTextSelected: {
    color: "#152b4f",
    fontWeight: "500",
  },

  timeSchedule: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  timeChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#e8eef6",
  },
  timeChipText: {
    fontSize: 14,
    color: "#152b4f",
    marginRight: 8,
  },
  addTimeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#152b4f",
    borderStyle: "dashed",
  },
  addTimeButtonText: {
    fontSize: 14,
    color: "#152b4f",
    marginLeft: 4,
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: "#333333",
  },
  switchDescription: {
    fontSize: 12,
    color: "#999999",
    marginTop: 2,
  },

  submitButton: {
    height: 48,
    backgroundColor: "#152b4f",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: "#cccccc",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});
