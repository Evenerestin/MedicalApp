import React from "react";
import { ActionIcon, ActionIconProps } from "../ActionIcon";

export type TransparentActionIconProps = Omit<ActionIconProps, "variant">;

export const TransparentActionIcon: React.FC<TransparentActionIconProps> = (
  props
) => {
  return <ActionIcon {...props} variant="transparent" />;
};
