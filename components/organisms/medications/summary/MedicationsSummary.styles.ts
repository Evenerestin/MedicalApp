import colors from "@theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 0,
    marginBottom: 16,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: "transparent",
    minHeight: 32,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
    letterSpacing: 2,
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
    color: colors.textSecondary || "#888",
    marginTop: 12,
    marginBottom: 16,
    textAlign: "center",
  },
});
