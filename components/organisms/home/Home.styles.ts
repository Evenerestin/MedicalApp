import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    // color: "#ffffff",
    marginTop: 2,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#e53935",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#ffffff",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3a5b8c",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },

  dateBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dateIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e8eef6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  dateInfo: {
    flex: 1,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#152b4f",
  },
  dateSubtext: {
    fontSize: 14,
    color: "#666666",
    marginTop: 2,
  },

  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  quickActionButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333333",
    textAlign: "center",
  },

  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#152b4f",
  },
  sectionViewAll: {
    fontSize: 14,
    color: "#3a5b8c",
    fontWeight: "500",
  },

  appointmentCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  appointmentTime: {
    width: 56,
    alignItems: "center",
    paddingRight: 12,
    borderRightWidth: 2,
    borderRightColor: "#152b4f",
  },
  appointmentTimeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#152b4f",
  },
  appointmentTimePeriod: {
    fontSize: 12,
    color: "#666666",
  },
  appointmentInfo: {
    flex: 1,
    paddingLeft: 12,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  appointmentDoctor: {
    fontSize: 14,
    color: "#666666",
    marginTop: 2,
  },
  appointmentLocation: {
    fontSize: 12,
    color: "#999999",
    marginTop: 2,
  },

  summaryCard: {
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
  summaryCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryCardIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  summaryCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#152b4f",
  },
  summaryCardContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryItemValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#152b4f",
  },
  summaryItemLabel: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },

  medicationReminderCard: {
    backgroundColor: "#fff5f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#e53935",
  },
  medicationReminderHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  medicationReminderTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginLeft: 8,
  },
  medicationReminderTime: {
    fontSize: 14,
    color: "#e53935",
    fontWeight: "500",
  },
  medicationList: {
    marginTop: 8,
  },
  medicationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  medicationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#152b4f",
    marginRight: 10,
  },
  medicationName: {
    fontSize: 14,
    color: "#333333",
    flex: 1,
  },
  medicationDose: {
    fontSize: 14,
    color: "#666666",
  },

  healthSummaryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6,
  },
  healthSummaryItem: {
    width: "50%",
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  healthSummaryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  healthSummaryCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  healthSummaryCardTitle: {
    fontSize: 12,
    color: "#666666",
    marginLeft: 8,
  },
  healthSummaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#152b4f",
  },
  healthSummaryUnit: {
    fontSize: 12,
    color: "#999999",
    marginLeft: 4,
  },
  healthSummaryChange: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  healthSummaryChangeText: {
    fontSize: 12,
    marginLeft: 2,
  },
  healthSummaryChangeUp: {
    color: "#4caf50",
  },
  healthSummaryChangeDown: {
    color: "#e53935",
  },

  iceQuickAccess: {
    backgroundColor: "#c62828",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iceContent: {
    flex: 1,
  },
  iceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  iceSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  iceArrow: {
    padding: 8,
  },

  emptyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyIcon: {
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
  },
});
