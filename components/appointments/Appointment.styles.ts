import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  appointmentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  appointmentContent: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingRight: 16,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  appointmentDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  appointmentTime: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1976d2",
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerDate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#152b4f",
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#152b4f",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  appointmentListContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentScrollView: {
    backgroundColor: "#ffffff",
  },
  emptyState: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    fontSize: 14,
    color: "#999999",
    fontStyle: "italic",
  },
});
