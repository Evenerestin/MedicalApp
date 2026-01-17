import { IconPointFilled } from "@tabler/icons-react-native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

export const LoadingDots: React.FC<{ size?: number }> = ({ size = 16 }) => {
  const [dotCount, setDotCount] = useState(0);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const animate = (count: number) => {
      if (count === 0) {
        timeout = setTimeout(() => {
          setDotCount(1);
          animate(1);
        }, 800);
      } else if (count < 3) {
        timeout = setTimeout(() => {
          setDotCount(count + 1);
          animate(count + 1);
        }, 120);
      } else if (count === 3) {
        timeout = setTimeout(() => {
          setDotCount(0);
          animate(0);
        }, 700);
      }
    };
    animate(0);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        height: size,
      }}
    >
      {Array.from({ length: dotCount }).map((_, i) => (
        <IconPointFilled
          key={i}
          size={size * 0.7}
          color="#1976d2"
          style={{ marginRight: i < dotCount - 1 ? 1 : 0 }}
        />
      ))}
    </View>
  );
};
