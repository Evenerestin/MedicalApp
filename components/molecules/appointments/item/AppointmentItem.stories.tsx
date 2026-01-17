import React from "react";
import { AppointmentItem } from "./AppointmentItem";

export default {
  title: "Molecules/Appointments/Item",
  component: AppointmentItem,
};

export const Default = () => (
  <AppointmentItem
    title="Dentist Visit"
    description="Routine checkup and cleaning"
    time="09:00"
  />
);
