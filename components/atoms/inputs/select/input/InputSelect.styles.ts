export const inputSelectStyles = {
  inputWrapper: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fafafd",
    borderColor: "#e4e4ea",
    minWidth: 80,
  },
  inputText: {
    color: "#757575",
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
    color: "#757575",
  },
};
