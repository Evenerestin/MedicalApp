import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Form,
  FormData,
} from "../../organisms/appointments/form/AppointmentForm";

export interface AppointmentsTemplateProps {
  mode?: "add" | "edit";
  initialData?: Partial<FormData>;
  onSave?: (data: FormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const AppointmentsTemplate: React.FC<AppointmentsTemplateProps> = ({
  mode = "add",
  initialData,
  onSave,
  onDelete,
  onCancel,
  isLoading,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 32 }} />
      <Form
        mode={mode}
        initialData={initialData}
        onSave={onSave}
        onDelete={onDelete}
        onCancel={onCancel}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingBottom: 96,
  },
});
