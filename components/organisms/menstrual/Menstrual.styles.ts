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
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  settingsButton: {
    padding: 8,
  },

  calendarContainer: {
    backgroundColor: "#ffffff",
    paddingBottom: 16,
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#152b4f",
  },
  monthNavButton: {
    padding: 8,
  },
  weekDaysRow: {
    flexDirection: "row",
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  weekDayLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    color: "#999999",
    fontWeight: "500",
  },
  daysGrid: {
    paddingHorizontal: 8,
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderRadius: 20,
  },
  dayText: {
    fontSize: 14,
    color: "#333333",
  },
  dayTextInactive: {
    color: "#cccccc",
  },
  daySelected: {
    backgroundColor: "#152b4f",
  },
  dayTextSelected: {
    color: "#ffffff",
    fontWeight: "600",
  },
  dayToday: {
    borderWidth: 1,
    borderColor: "#152b4f",
  },

  periodDay: {
    backgroundColor: "#ffcdd2",
  },
  periodDayText: {
    color: "#c62828",
  },
  fertileDay: {
    backgroundColor: "#c8e6c9",
  },
  fertileDayText: {
    color: "#2e7d32",
  },
  ovulationDay: {
    backgroundColor: "#a5d6a7",
    borderWidth: 2,
    borderColor: "#2e7d32",
  },
  ovulationDayText: {
    color: "#1b5e20",
    fontWeight: "600",
  },
  predictedPeriod: {
    backgroundColor: "#ffebee",
    borderWidth: 1,
    borderColor: "#ef9a9a",
    borderStyle: "dashed",
  },
  predictedPeriodText: {
    color: "#c62828",
  },

  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#666666",
  },

  cycleInfoCard: {
    backgroundColor: "#ffffff",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cycleInfoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#152b4f",
    marginBottom: 12,
  },
  cycleInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cycleInfoLabel: {
    fontSize: 14,
    color: "#666666",
  },
  cycleInfoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
  },
  cycleInfoHighlight: {
    color: "#c62828",
  },

  logPeriodButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c62828",
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
  },
  logPeriodButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginLeft: 8,
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

  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  dateButtonText: {
    fontSize: 16,
    color: "#333333",
  },
  dateButtonPlaceholder: {
    color: "#999999",
  },

  symptomSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  symptomOption: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: "#f0f4f8",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  symptomOptionSelected: {
    backgroundColor: "#ffebee",
    borderColor: "#c62828",
  },
  symptomOptionText: {
    fontSize: 13,
    color: "#666666",
  },
  symptomOptionTextSelected: {
    color: "#c62828",
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

  visibilityToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  visibilityLabel: {
    fontSize: 16,
    color: "#333333",
  },
  visibilityDescription: {
    fontSize: 12,
    color: "#999999",
    marginTop: 2,
  },
});
