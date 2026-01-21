import { ColorValue } from "react-native";
import colors from "./colors";

export type VariantConfig = {
  background: ColorValue;
  border: ColorValue;
  text: ColorValue;
  icon: ColorValue;
};

export type VariantType = "filled" | "light" | "outline" | "transparent";

export function getVariantConfig(
  variant: VariantType,
  accentColor: ColorValue,
): VariantConfig {
  switch (variant) {
    case "filled":
      return {
        background: accentColor,
        border: accentColor,
        text: colors.surface,
        icon: colors.surface,
      };
    case "light":
      let bg =
        typeof accentColor === "string" && accentColor.startsWith("#")
          ? accentColor + "4D"
          : accentColor;
      return {
        background: bg,
        border: accentColor,
        text: accentColor,
        icon: accentColor,
      };
    case "outline":
      return {
        background: "transparent",
        border: accentColor,
        text: accentColor,
        icon: accentColor,
      };
    case "transparent":
      return {
        background: "transparent",
        border: "transparent",
        text: accentColor,
        icon: accentColor,
      };
    default:
      return {
        background: accentColor,
        border: accentColor,
        text: colors.surface,
        icon: colors.surface,
      };
  }
}

export default getVariantConfig;
