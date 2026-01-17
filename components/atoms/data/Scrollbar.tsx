import React from "react";
import { Animated, StyleSheet, View } from "react-native";

interface ScrollbarProps {
  scrollX: Animated.Value;
  contentWidth: number;
  containerWidth: number;
}

export const Scrollbar: React.FC<ScrollbarProps> = ({
  scrollX,
  contentWidth,
  containerWidth,
}) => {
  const minThumbWidth = 40;
  const scrollbarWidth =
    contentWidth <= containerWidth
      ? containerWidth
      : Math.max(
          containerWidth * (containerWidth / contentWidth),
          minThumbWidth
        );
  const maxTranslate = containerWidth - scrollbarWidth;
  const translateX =
    contentWidth <= containerWidth
      ? 0
      : scrollX.interpolate({
          inputRange: [0, contentWidth - containerWidth],
          outputRange: [0, maxTranslate],
          extrapolate: "clamp",
        });
  return (
    <View style={styles.track}>
      <Animated.View
        style={[
          styles.thumb,
          {
            width: scrollbarWidth,
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 5,
    borderRadius: 999,
    backgroundColor: "#e0e0e0",
    marginTop: 2,
    marginBottom: 2,
    overflow: "hidden",
  },
  thumb: {
    height: 5,
    borderRadius: 999,
    backgroundColor: "#1976d2",
    margin: 1,
  },
});
