import { StyleSheet } from "react-native";

export const appointmentsListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: "#1976d2",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f8f9fa",
    marginTop: 8,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1976d2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  fabText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
});
