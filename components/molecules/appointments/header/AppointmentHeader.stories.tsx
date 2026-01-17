import React from "react";
import { AppointmentHeader } from "./AppointmentHeader";

export default {
  title: "Molecules/Appointments/Header",
  component: AppointmentHeader,
};

export const Default = () => (
  <AppointmentHeader
    date={new Date(2026, 0, 19)}
    onAddPress={() => alert("Add appointment")}
  />
);
