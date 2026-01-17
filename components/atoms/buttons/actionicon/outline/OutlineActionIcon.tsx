import React from "react";
import { ActionIcon, ActionIconProps } from "../ActionIcon";

export type OutlineActionIconProps = Omit<ActionIconProps, "variant">;

export const OutlineActionIcon: React.FC<OutlineActionIconProps> = (props) => {
  return <ActionIcon {...props} variant="outline" />;
};
