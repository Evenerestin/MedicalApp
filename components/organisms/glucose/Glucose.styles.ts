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
  backButton: {
    padding: 8,
    marginRight: 8,
  },

  glucoseCard: {
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
  glucoseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  glucoseValueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  glucoseValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#152b4f",
  },
  glucoseUnit: {
    fontSize: 14,
    color: "#999999",
    marginLeft: 4,
  },
  glucoseTime: {
    fontSize: 12,
    color: "#999999",
    textAlign: "right",
  },
  glucoseDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  glucoseTag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#e8eef6",
  },
  glucoseTagText: {
    fontSize: 12,
    color: "#152b4f",
    fontWeight: "500",
  },
  insulinBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#fff3e0",
  },
  insulinBadgeText: {
    fontSize: 12,
    color: "#e65100",
    fontWeight: "500",
    marginLeft: 4,
  },
  glucoseNotes: {
    fontSize: 12,
    color: "#666666",
    marginTop: 8,
    fontStyle: "italic",
  },

  valueIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  valueNormal: {
    backgroundColor: "#43a047",
  },
  valueLow: {
    backgroundColor: "#fb8c00",
  },
  valueHigh: {
    backgroundColor: "#e53935",
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
  formTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#152b4f",
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
  inputLarge: {
    height: 64,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },

  tagSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f0f4f8",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  tagOptionSelected: {
    backgroundColor: "#e8eef6",
    borderColor: "#152b4f",
  },
  tagOptionText: {
    fontSize: 14,
    color: "#666666",
  },
  tagOptionTextSelected: {
    color: "#152b4f",
    fontWeight: "500",
  },

  insulinSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  insulinTypeSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  insulinTypeOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#f0f4f8",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  insulinTypeOptionSelected: {
    backgroundColor: "#fff3e0",
    borderColor: "#e65100",
  },
  insulinTypeOptionText: {
    fontSize: 12,
    color: "#666666",
  },
  insulinTypeOptionTextSelected: {
    color: "#e65100",
    fontWeight: "500",
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

  historyList: {
    padding: 16,
  },
  historyDateHeader: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666666",
    marginTop: 16,
    marginBottom: 8,
  },

  chartContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#152b4f",
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: "#f0f4f8",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  chartPlaceholderText: {
    fontSize: 14,
    color: "#999999",
  },

  rangeIndicator: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  rangeItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  rangeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  rangeText: {
    fontSize: 12,
    color: "#666666",
  },
});
