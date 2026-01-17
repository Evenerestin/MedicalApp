import React from "react";
import { ActionIcon, ActionIconProps } from "../ActionIcon";

export type LightActionIconProps = Omit<ActionIconProps, "variant">;

export const LightActionIcon: React.FC<LightActionIconProps> = (props) => {
  return <ActionIcon {...props} variant="light" />;
};
