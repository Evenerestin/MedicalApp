import React from "react";
import { ICETemplate } from "./ICETemplate";

export default {
  title: "Templates/ICETemplate",
  component: ICETemplate,
};

export const Default = () => <ICETemplate />;

export const EmptyState = () => <ICETemplate profile={undefined} />;
