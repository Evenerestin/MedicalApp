import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-start",
    minHeight: 32,
    gap: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  filledSelected: {
    backgroundColor: "#1976d2",
    borderWidth: 0,
  },
  filledUnselected: {
    backgroundColor: "#fff",
    borderWidth: 0,
  },
  filledSelectedText: {
    color: "#fff",
  },
  filledUnselectedText: {
    color: "#757575",
  },
  outlineSelected: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#1976d2",
  },
  outlineUnselected: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#bdbdbd",
  },
  outlineSelectedText: {
    color: "#1976d2",
  },
  outlineUnselectedText: {
    color: "#757575",
  },
  lightSelected: {
    backgroundColor: "#e3f2fd",
    borderWidth: 1,
    borderColor: "#1976d2",
  },
  lightUnselected: {
    backgroundColor: "#fff",
    borderWidth: 0,
  },
  lightSelectedText: {
    color: "#1976d2",
  },
  lightUnselectedText: {
    color: "#757575",
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: "500",
    flexShrink: 1,
    textAlign: "center",
    flex: 1,
  },
  sm: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    minHeight: 24,
    borderRadius: 12,
  },
  md: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 32,
    borderRadius: 16,
  },
  lg: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 40,
    borderRadius: 20,
  },
  smText: {
    fontSize: 12,
  },
  mdText: {
    fontSize: 15,
  },
  lgText: {
    fontSize: 18,
  },
  section: {
    marginHorizontal: 2,
  },
});
