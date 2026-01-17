import { Dimensions, StyleSheet } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const MINI_CARD_WIDTH = Math.min(56, Math.floor((SCREEN_WIDTH - 48) / 5));
const MINI_CARD_HEIGHT = Math.min(
  80,
  Math.floor((SCREEN_WIDTH - 48) / 5) * 1.4
);

export const styles = StyleSheet.create({
  card: {
    minHeight: Math.max(MINI_CARD_HEIGHT, 40),
    width: Math.max(MINI_CARD_WIDTH, 40),
    flex: 0,
    borderRadius: 20,
    overflow: "hidden",
    margin: 2,
    paddingVertical: 6,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: "transparent",
  },
  card_outline: {
    borderWidth: 2,
    borderColor: "#1976d2",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  card_light: {
    borderWidth: 2,
    borderColor: "#1976d2",
    backgroundColor: "rgba(25, 118, 210, 0.1)",
    borderRadius: 20,
  },
  card_filled: {
    borderWidth: 2,
    borderColor: "#1976d2",
    backgroundColor: "#1976d2",
    borderRadius: 20,
  },
  upperHalf: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 4,
  },
  lowerHalf: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 4,
  },
  dayLabel: {
    fontSize: 10,
    color: "#757575",
    fontWeight: "500",
    marginBottom: 1,
    textTransform: "capitalize",
    textAlign: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  dayNum: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#757575",
    textAlign: "center",
    width: "100%",
  },
});
