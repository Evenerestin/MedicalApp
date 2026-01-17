import { IconX } from "@tabler/icons-react-native";
import React from "react";
import { ActionIcon, ActionIconProps } from "../actionicon/ActionIcon";

export type CloseButtonProps = Omit<ActionIconProps, "icon">;

export const CloseButton: React.FC<CloseButtonProps> = (props) => {
  return (
    <ActionIcon
      {...props}
      icon={
        <IconX
          size={props.size === "sm" ? 20 : props.size === "lg" ? 28 : 24}
          color={props.variant === "filled" ? "#fff" : "#1976d2"}
          stroke={2.2}
        />
      }
    />
  );
};
