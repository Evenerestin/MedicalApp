import React from "react";
import { View } from "react-native";
import { FormData } from "../../organisms/appointments/form/AppointmentForm";
import { AppointmentsTemplate } from "./AppointmentsTemplate";

export default {
  title: "Templates/AppointmentsTemplate",
  component: AppointmentsTemplate,
};

export const AddMode = () => (
  <View style={{ flex: 1 }}>
    <AppointmentsTemplate
      mode="add"
      onSave={(data: FormData) => console.log("Save:", data)}
      onCancel={() => console.log("Cancel")}
    />
  </View>
);

export const EditMode = () => {
  const initialData: Partial<FormData> = {
    title: "Wizyta kontrolna",
    description: "Przychodnia Zdrowie, ul. Lekarska 12",
    date: new Date(),
    time: "09:00",
    address: "ul. Lekarska 12, Warszawa",
    doctor: "Dr. Jan Kowalski",
    reminders: {
      dayBefore: true,
      weekBefore: false,
      monthBefore: false,
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <AppointmentsTemplate
        mode="edit"
        initialData={initialData}
        onSave={(data: FormData) => console.log("Save:", data)}
        onDelete={() => console.log("Delete")}
        onCancel={() => console.log("Cancel")}
      />
    </View>
  );
};

export const LoadingState = () => (
  <View style={{ flex: 1 }}>
    <AppointmentsTemplate
      mode="add"
      isLoading={true}
      onSave={(data: FormData) => console.log("Save:", data)}
    />
  </View>
);

export const WithPrefilledData = () => {
  const initialData: Partial<FormData> = {
    title: "Badanie krwi",
    time: "11:30",
    address: "Laboratorium MedLab",
  };

  return (
    <View style={{ flex: 1 }}>
      <AppointmentsTemplate
        mode="add"
        initialData={initialData}
        onSave={(data: FormData) => console.log("Save:", data)}
      />
    </View>
  );
};
