export const buttonSelectStyles = {
  button: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderWidth: 2,
    borderColor: "#1976d2",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    minWidth: 80,
  },
  text: {
    color: "#1976d2",
    fontWeight: "500" as const,
    fontSize: 16,
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    minWidth: 200,
    maxHeight: 300,
    paddingVertical: 8,
    elevation: 4,
  },
  option: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    color: "#1976d2",
  },
};
