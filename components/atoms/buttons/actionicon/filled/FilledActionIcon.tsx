import React from "react";
import { ActionIcon, ActionIconProps } from "../ActionIcon";

export type FilledActionIconProps = Omit<ActionIconProps, "variant">;

export const FilledActionIcon: React.FC<FilledActionIconProps> = (props) => {
  return <ActionIcon {...props} variant="filled" />;
};
