import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import { Defs, Mask, Path, Rect, Svg } from "react-native-svg";
import { styles } from "./Menu.styles";

const { width } = Dimensions.get("window");

interface MenuBarProps {
  children: React.ReactNode;
  showCutout?: boolean;
}

export const MenuBar = ({ children, showCutout = true }: MenuBarProps) => {
  const cutoutPath =
    "M67.71,41H1a30.63,30.63,0,0,1,13.58,3.37,25,25,0,0,1,12.63,17.1,37.68,37.68,0,0,0,73.58,0,25,25,0,0,1,12.63-17.1A30.63,30.63,0,0,1,127,41H67.71Z";

  if (!showCutout) {
    return <View style={styles.menuBar}>{children}</View>;
  }

  const [containerWidth, setContainerWidth] = useState<number>(width);

  const originalCutoutWidth = 128;
  const scale = 1;
  const scaledCutoutWidth = originalCutoutWidth * scale;

  const minScreenWidth = 320;
  const effectiveScale = containerWidth < minScreenWidth ? 1 : scale;
  const effectiveScaledWidth = originalCutoutWidth * effectiveScale;
  const translateX = (containerWidth - effectiveScaledWidth) / 2;
  const translateY = -21;

  return (
    <View
      style={styles.menuBarContainer}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <Svg height="100" width="100%" style={styles.menuBarBackground}>
        <Defs>
          <Mask id="cutoutMask">
            <Rect width="100%" height="100" fill="white" />
            <Path
              d={cutoutPath}
              fill="black"
              transform={`translate(${translateX}, ${translateY}) scale(${effectiveScale})`}
            />
          </Mask>
        </Defs>
        <Rect width="100%" height="150" fill="white" mask="url(#cutoutMask)" />
      </Svg>

      <View style={styles.menuBarContent}>{children}</View>
    </View>
  );
};
