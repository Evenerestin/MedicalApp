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

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#152b4f",
  },
  tabText: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#152b4f",
    fontWeight: "600",
  },

  periodSelector: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f0f4f8",
  },
  periodButtonActive: {
    backgroundColor: "#152b4f",
  },
  periodButtonText: {
    fontSize: 14,
    color: "#666666",
  },
  periodButtonTextActive: {
    color: "#ffffff",
    fontWeight: "500",
  },

  measurementCard: {
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
  measurementHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  measurementType: {
    flexDirection: "row",
    alignItems: "center",
  },
  measurementTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e8eef6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  measurementTypeLabel: {
    fontSize: 14,
    color: "#666666",
  },
  measurementValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#152b4f",
  },
  measurementValueSecondary: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "normal",
  },
  measurementUnit: {
    fontSize: 14,
    color: "#999999",
    marginLeft: 4,
  },
  measurementTime: {
    fontSize: 12,
    color: "#999999",
  },
  measurementNotes: {
    fontSize: 12,
    color: "#666666",
    marginTop: 8,
    fontStyle: "italic",
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
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },

  typeSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  typeOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#f0f4f8",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    minWidth: "45%",
  },
  typeOptionSelected: {
    backgroundColor: "#e8eef6",
    borderColor: "#152b4f",
  },
  typeOptionIcon: {
    marginRight: 8,
  },
  typeOptionText: {
    fontSize: 14,
    color: "#666666",
  },
  typeOptionTextSelected: {
    color: "#152b4f",
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

  chartContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
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
});
