import colors from "@theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    width: "100%",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    borderColor: "#e0e0e0",
    borderRadius: 16,
    overflow: "hidden",
    alignSelf: "stretch",
    padding: 0,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    minHeight: 120,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 16,
    letterSpacing: 2,
    fontWeight: "bold",
    color: colors.primary,
  },
});
