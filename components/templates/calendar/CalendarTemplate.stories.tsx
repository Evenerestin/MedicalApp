import React from "react";
import { CalendarTemplate } from "./CalendarTemplate";

const mockAppointments = [
  {
    id: "1",
    title: "Doctor Visit",
    description: "Clinic, Main St.",
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    address: "Main St. 123",
    doctorName: "Dr. Smith",
  },
  {
    id: "2",
    title: "Blood Test",
    description: "Lab, Health Ave.",
    date: new Date().toISOString().split("T")[0],
    time: "11:30",
    address: "Health Ave. 45",
    doctorName: "Dr. Brown",
  },
];

export default {
  title: "Templates/CalendarTemplate",
  component: CalendarTemplate,
};

export const Default = () => (
  <CalendarTemplate appointments={mockAppointments} />
);
