import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Button } from "../../shared/buttons/Button";
import { DateSelector } from "../../shared/buttons/complex/DateSelector";
import { TimeInput } from "../../shared/inputs/TimeInput";
import {
  ReminderSelector,
  ReminderType,
} from "../../shared/selectors/ReminderSelector";
import { styles } from "./Form.styles";

export interface FormData {
  title: string;
  description: string;
  date?: Date;
  time: string;
  address: string;
  doctor: string;
  reminders: ReminderType[];
}

export interface FormProps {
  mode: "add" | "edit";
  initialData?: FormData;
  onSave?: (data: FormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
}

export const Form = ({
  mode,
  initialData = {
    title: "",
    description: "",
    time: "",
    address: "",
    doctor: "",
    reminders: [],
  },
  onSave,
  onDelete,
  onCancel,
}: FormProps) => {
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [date, setDate] = useState(initialData.date);
  const [time, setTime] = useState(initialData.time);
  const [address, setAddress] = useState(initialData.address);
  const [doctor, setDoctor] = useState(initialData.doctor);
  const [reminders, setReminders] = useState<ReminderType[]>(
    initialData.reminders
  );

  const handleSave = () => {
    onSave?.({ title, description, date, time, address, doctor, reminders });
  };

  const isValid =
    title.trim() !== "" &&
    time.trim() !== "" &&
    address.trim() !== "" &&
    doctor.trim() !== "";

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title *</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter appointment title"
        placeholderTextColor="#999999"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description (optional)"
        placeholderTextColor="#999999"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      <View style={styles.dateTimeRow}>
        <View style={styles.dateTimeItem}>
          <Text style={styles.label}>Date *</Text>
          <DateSelector
            value={date}
            onChange={setDate}
            placeholder="Select date"
          />
        </View>
        <View style={styles.dateTimeItem}>
          <Text style={styles.label}>Time *</Text>
          <TimeInput value={time} onChange={setTime} placeholder="hh:mm" />
        </View>
      </View>

      <Text style={styles.label}>Address *</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter appointment address"
        placeholderTextColor="#999999"
      />

      <Text style={styles.label}>Doctor *</Text>
      <TextInput
        style={styles.input}
        value={doctor}
        onChangeText={setDoctor}
        placeholder="Enter doctor name"
        placeholderTextColor="#999999"
      />

      <Text style={styles.label}>Reminders</Text>
      <ReminderSelector value={reminders} onChange={setReminders} />

      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          {onCancel && (
            <View style={styles.buttonWrapper}>
              <Button
                text="Cancel"
                variant="tertiary"
                onPress={onCancel}
                fullWidth
              />
            </View>
          )}
          <View style={styles.buttonWrapper}>
            <Button
              text={mode === "add" ? "Add" : "Save"}
              variant="primary"
              onPress={handleSave}
              disabled={!isValid}
              fullWidth
            />
          </View>
        </View>
      </View>
    </View>
  );
};
