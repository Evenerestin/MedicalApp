import colors from "@theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 8,
    backgroundColor: "transparent",
  },
  footerButtons: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  cancelButtonText: {
    color: colors.primary,
    fontWeight: "600",
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
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
  editButton: {
    padding: 8,
  },

  iceBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#c62828",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iceBannerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iceBannerContent: {
    flex: 1,
  },
  iceBannerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#152b4f",
  },
  iceBannerSubtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

  section: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#152b4f",
    flex: 1,
  },
  sectionContent: {
    marginLeft: 48,
    marginTop: 4,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoRowLast: {
    borderBottomWidth: 0,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#152b4f",
  },
  infoValueHighlight: {
    color: "#c62828",
    fontWeight: "700",
  },

  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 6,
  },
  listItemBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#152b4f",
    marginRight: 12,
    marginTop: 6,
  },
  listItemText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    lineHeight: 20,
  },

  contactCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  contactCardPrimary: {
    borderWidth: 2,
    borderColor: "#c62828",
    backgroundColor: "#fff",
  },
  contactHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#152b4f",
  },
  primaryBadge: {
    backgroundColor: "#c62828",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  primaryBadgeText: {
    fontSize: 10,
    color: "#ffffff",
    fontWeight: "600",
  },
  contactRelationship: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: "#152b4f",
    fontWeight: "500",
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  emptyStateIcon: {
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 24,
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  formSection: {
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 16,
  },
  formSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#152b4f",
    marginBottom: 8,
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
    alignItems: "center",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },

  bloodTypeSelector: {
    flexDirection: "row",
    gap: 2,
    marginBottom: 0,
  },
  rhSegmentedControl: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 4,
    alignSelf: "center",
    marginTop: 4,
    marginBottom: 2,
    boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
  },
  rhSegment: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 24,
    borderRadius: 16,
  },
  rhSegmentSelected: {
    backgroundColor: colors.primary,
  },
  rhSegmentText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  rhSegmentTextSelected: {
    color: "#fff",
  },
  bloodTypeOption: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    minWidth: 0,
  },
  bloodTypeOptionSelected: {
    backgroundColor: "#c62828",
    borderColor: "#c62828",
  },
  bloodTypeOptionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
  },
  bloodTypeOptionTextSelected: {
    color: "#ffffff",
  },

  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8eef6",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    color: "#152b4f",
    marginRight: 8,
  },
  addTagButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#152b4f",
    borderStyle: "dashed",
  },
  addTagButtonText: {
    fontSize: 14,
    color: "#152b4f",
    marginLeft: 4,
  },

  contactFormCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  contactFormHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  contactFormTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#152b4f",
  },
  removeContactButton: {
    padding: 4,
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 14,
    color: "#333333",
  },

  submitButton: {
    height: 48,
    backgroundColor: "#c62828",
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

  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    backgroundColor: "#c62828",
    borderRadius: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginLeft: 8,
  },
});
