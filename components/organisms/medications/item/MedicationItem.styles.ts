import { StyleSheet } from "react-native";

import colors from "@theme/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 4,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  active: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  inactive: {
    borderLeftWidth: 4,
    borderLeftColor: colors.light || "#ccc",
  },
  infoSection: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 2,
  },
  dosage: {
    fontSize: 14,
    color: colors.textSecondary || "#888",
    marginBottom: 2,
  },
  time: {
    fontSize: 13,
    color: colors.light || "#888",
  },
  toggleButtonActive: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  toggleButtonInactive: {
    backgroundColor: colors.light || "#eee",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  toggleTextActive: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  toggleTextInactive: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
});
