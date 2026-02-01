import React, { useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppointmentHeader } from "../../molecules/appointments/header/AppointmentHeader";
import { Calendar } from "../../molecules/calendar/Calendar";
import {
  Form,
  FormData,
} from "../../organisms/appointments/form/AppointmentForm";
import {
  AppointmentListItem,
  AppointmentsList,
} from "../../organisms/appointments/list/AppointmentsList";

export interface CalendarTemplateProps {
  appointments?: AppointmentListItem[];
  onSave?: (data: FormData, appointmentId?: string) => void;
  onDelete?: (appointmentId: string) => void;
}

export const CalendarTemplate: React.FC<CalendarTemplateProps> = ({
  appointments = [],
  onSave,
  onDelete,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const appointmentsForDate = appointments.filter((apt) => {
    const aptDate = apt.date;
    return aptDate === formatDate(selectedDate);
  });

  const selectedAppointment = appointments.find(
    (apt) => apt.id === selectedAppointmentId,
  );

  const handleAddPress = () => {
    setSelectedAppointmentId(null);
    setModalVisible(true);
  };

  const handleAppointmentPress = (id: string) => {
    setSelectedAppointmentId(id);
    setModalVisible(true);
  };

  const handleSave = (data: FormData) => {
    if (onSave) {
      onSave(data, selectedAppointmentId || undefined);
    }
    setModalVisible(false);
    setSelectedAppointmentId(null);
  };

  const handleDelete = () => {
    if (selectedAppointment && onDelete) {
      onDelete(selectedAppointment.id);
      setModalVisible(false);
      setSelectedAppointmentId(null);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedAppointmentId(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, padding: 16, gap: 16 }}>
          <Calendar
            selectedDate={selectedDate}
            onDayPress={setSelectedDate}
            hasEvents={(date) =>
              appointments.some((apt) => {
                const aptDate = apt.date;
                return aptDate === formatDate(date);
              })
            }
          />

          <View
            style={{
              borderRadius: 16,
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 4,
              overflow: "hidden",
            }}
          >
            <AppointmentHeader
              date={selectedDate}
              onAddPress={handleAddPress}
            />
            <AppointmentsList
              appointments={appointmentsForDate}
              onAppointmentPress={handleAppointmentPress}
              onAddNew={handleAddPress}
            />
          </View>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
          {selectedAppointment ? (
            <Form
              mode="edit"
              initialData={{
                title: selectedAppointment.title,
                description: selectedAppointment.description,
                date: new Date(selectedAppointment.date),
                time: selectedAppointment.time,
                address: selectedAppointment.address,
                doctor: selectedAppointment.doctorName,
              }}
              onSave={handleSave}
              onCancel={handleCancel}
              onDelete={handleDelete}
            />
          ) : (
            <Form
              mode="add"
              initialData={{
                date: selectedDate,
                time: "09:00",
              }}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default CalendarTemplate;
