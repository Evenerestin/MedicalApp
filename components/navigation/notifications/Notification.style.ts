import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 45,
    height: 45,
    borderRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF3B30",
    borderRadius: 50,
    minWidth: 23,
    height: 23,

    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  badgeText: {
    color: "white",
    fontSize: 13,
    fontWeight: "400",
  },
});
