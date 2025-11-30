import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import {
  AppointmentData as AppointmentListItem,
  Appointments,
} from "../../components/appointments/Appointments";
import { Form } from "../../components/appointments/form/Form";
import { Month } from "../../components/calendar/month/Month";
import { styles } from "./Calendar.styles";

export interface AppointmentData {
  id: string;
  name: string;
  date: string;
  time: string;
  reminders: string[];
  address: string;
  comments: string;
}

type ViewMode = "calendar" | "add" | "edit";

export interface CalendarScreenProps {
  initialAppointments?: AppointmentData[];
  onAppointmentsChange?: (appointments: AppointmentData[]) => void;
}

export const CalendarScreen = ({
  initialAppointments = [],
  onAppointmentsChange,
}: CalendarScreenProps) => {
  const [appointments, setAppointments] =
    useState<AppointmentData[]>(initialAppointments);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [editingAppointment, setEditingAppointment] =
    useState<AppointmentData | null>(null);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 2;
  const maxYear = currentYear + 2;
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i
  );

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleDayPress = (date: Date) => {
    setSelectedDate(date);
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setShowYearPicker(false);
  };

  const hasAppointmentsOnDate = (date: Date): boolean => {
    const dateStr = formatDateToString(date);
    return appointments.some((appointment) => appointment.date === dateStr);
  };

  const formatDateToString = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const parseStringToDate = (dateStr: string): Date => {
    const [month, day, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const getAppointmentsForSelectedDate = (): AppointmentListItem[] => {
    if (!selectedDate) return [];

    const dateStr = formatDateToString(selectedDate);
    return appointments
      .filter((appointment) => appointment.date === dateStr)
      .map((appointment) => ({
        id: appointment.id,
        title: appointment.name,
        description: appointment.address,
        time: appointment.time,
      }));
  };

  const handleAddAppointment = () => {
    setViewMode("add");
  };

  const handleEditAppointment = (appointment: AppointmentData) => {
    setEditingAppointment(appointment);
    setViewMode("edit");
  };

  const handleBackToCalendar = () => {
    setViewMode("calendar");
    setEditingAppointment(null);
  };

  const handleSaveNewAppointment = (data: {
    name: string;
    date: string;
    time: string;
    reminders: string[];
    address: string;
    comments: string;
  }) => {
    const newAppointment: AppointmentData = {
      id: Date.now().toString(),
      ...data,
    };

    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    onAppointmentsChange?.(updatedAppointments);

    const appointmentDate = parseStringToDate(data.date);
    setSelectedDate(appointmentDate);
    setCurrentDate(appointmentDate);
    setViewMode("calendar");
  };

  const handleUpdateAppointment = (data: {
    name: string;
    date: string;
    time: string;
    reminders: string[];
    address: string;
    comments: string;
  }) => {
    if (!editingAppointment) return;

    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === editingAppointment.id
        ? { ...appointment, ...data }
        : appointment
    );

    setAppointments(updatedAppointments);
    onAppointmentsChange?.(updatedAppointments);

    const appointmentDate = parseStringToDate(data.date);
    setSelectedDate(appointmentDate);
    setCurrentDate(appointmentDate);
    setViewMode("calendar");
    setEditingAppointment(null);
  };

  const handleDeleteAppointment = () => {
    if (!editingAppointment) return;

    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== editingAppointment.id
    );
    setAppointments(updatedAppointments);
    onAppointmentsChange?.(updatedAppointments);

    setViewMode("calendar");
    setEditingAppointment(null);
  };

  if (viewMode === "add") {
    return (
      <Form
        mode="add"
        initialData={{
          title: "",
          description: "",
          date: selectedDate,
          time: "",
          address: "",
          doctor: "",
          reminders: [],
        }}
        onSave={(formData) => {
          handleSaveNewAppointment({
            name: formData.title,
            date: formData.date
              ? formatDateToString(formData.date)
              : formatDateToString(new Date()),
            time: formData.time,
            reminders: formData.reminders,
            address: formData.address,
            comments: formData.description,
          });
        }}
        onCancel={handleBackToCalendar}
      />
    );
  }

  if (viewMode === "edit" && editingAppointment) {
    return (
      <Form
        mode="edit"
        initialData={{
          title: editingAppointment.name,
          description: editingAppointment.comments,
          date: parseStringToDate(editingAppointment.date),
          time: editingAppointment.time,
          address: editingAppointment.address,
          doctor: "",
          reminders: editingAppointment.reminders as any,
        }}
        onSave={(formData) => {
          handleUpdateAppointment({
            name: formData.title,
            date: formData.date
              ? formatDateToString(formData.date)
              : editingAppointment.date,
            time: formData.time,
            reminders: formData.reminders,
            address: formData.address,
            comments: formData.description,
          });
        }}
        onCancel={handleBackToCalendar}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handlePreviousMonth}
          >
            <Ionicons name="chevron-back" size={24} color="#333333" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerCenter}
            onPress={() => setShowYearPicker(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.headerTitle}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleNextMonth}
          >
            <Ionicons name="chevron-forward" size={24} color="#333333" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.monthContainer}>
        <Month
          year={currentDate.getFullYear()}
          month={currentDate.getMonth()}
          selectedDate={selectedDate}
          hasEvents={hasAppointmentsOnDate}
          onDayPress={handleDayPress}
        />
      </View>

      <View style={styles.appointmentListContainer}>
        <Appointments
          date={selectedDate || new Date()}
          appointments={getAppointmentsForSelectedDate()}
          onAddPress={handleAddAppointment}
          onAppointmentPress={(appointment) => {
            const fullAppointment = appointments.find(
              (a) => a.id === appointment.id
            );
            if (fullAppointment) {
              handleEditAppointment(fullAppointment);
            }
          }}
          maxHeight={300}
        />
      </View>

      <Modal
        visible={showYearPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowYearPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowYearPicker(false)}
        >
          <View style={styles.pickerContainer}>
            <FlatList
              data={years}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.pickerItem}
                  onPress={() => handleYearSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      item === currentDate.getFullYear() &&
                        styles.pickerItemTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
