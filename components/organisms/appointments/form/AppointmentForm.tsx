import { IconCalendar, IconMapPin, IconUser } from "@tabler/icons-react-native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../../atoms/buttons/button/Button";
import { Checkbox } from "../../../atoms/inputs/checkbox/Checkbox";
import { Input } from "../../../atoms/inputs/input/Input";
import { DatePicker } from "../../../atoms/inputs/picker/date/DatePicker";
import { TimePicker } from "../../../atoms/inputs/picker/time/TimePicker";
import { Toggle } from "../../../atoms/inputs/toggle/Toggle";
import { styles } from "./AppointmentForm.styles";

export interface FormData {
  title: string;
  description?: string;
  date?: Date;
  time: string;
  address?: string;
  doctor?: string;
  reminders?:
    | boolean
    | {
        dayBefore?: boolean;
        weekBefore?: boolean;
        monthBefore?: boolean;
      };
}

export interface AppointmentFormProps {
  mode: "add" | "edit";
  initialData?: Partial<FormData>;
  onSave?: (data: FormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const Form: React.FC<AppointmentFormProps> = ({
  mode,
  initialData = {},
  onSave,
  onDelete,
  onCancel,
  isLoading = false,
}) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [date, setDate] = useState<Date | undefined>(initialData.date);
  const [time, setTime] = useState(initialData.time || "09:00");
  const [address, setAddress] = useState(initialData.address || "");
  const [doctor, setDoctor] = useState(initialData.doctor || "");
  const [reminders, setReminders] = useState<
    boolean | { dayBefore: boolean; weekBefore: boolean; monthBefore: boolean }
  >(
    typeof initialData.reminders === "object"
      ? {
          dayBefore: initialData.reminders?.dayBefore ?? false,
          weekBefore: initialData.reminders?.weekBefore ?? false,
          monthBefore: initialData.reminders?.monthBefore ?? false,
        }
      : initialData.reminders ?? true
  );

  const isValid = title.trim() !== "" && time.trim() !== "";

  const remindersEnabled =
    typeof reminders === "boolean"
      ? reminders
      : reminders.dayBefore || reminders.weekBefore || reminders.monthBefore;

  const handleSave = () => {
    if (isValid && !isLoading) {
      onSave?.({
        title: title.trim(),
        description: description.trim() || undefined,
        date,
        time: time.trim(),
        address: address.trim() || undefined,
        doctor: doctor.trim() || undefined,
        reminders,
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          {mode === "edit" && onDelete && (
            <Button
              label="Delete Appointment"
              variant="outline"
              size="md"
              onPress={onDelete}
              disabled={isLoading}
              style={styles.deleteButton}
              textStyle={styles.deleteButtonText}
              fullWidth
            />
          )}
          <Text style={styles.label}>Title *</Text>
          <Input
            value={title}
            onChangeText={setTitle}
            placeholder="Enter appointment title"
            required
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <Input
            value={description}
            onChangeText={setDescription}
            placeholder="Enter appointment description"
          />
        </View>

        <View style={styles.section}>
          <DatePicker value={date} onChange={setDate} label="Select date" />
          <TimePicker
            value={(() => {
              const [hour, minute] = time.split(":").map(Number);
              return { hour: hour || 9, minute: minute || 0 };
            })()}
            onChange={({ hour, minute }) =>
              setTime(
                `${hour.toString().padStart(2, "0")}:${minute
                  .toString()
                  .padStart(2, "0")}`
              )
            }
            label="Select time"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Doctor</Text>
          <Input
            value={doctor}
            onChangeText={setDoctor}
            placeholder="Doctor's name"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Address</Text>
          <Input
            value={address}
            onChangeText={setAddress}
            placeholder="Location or address"
            leftSection={<IconMapPin size={20} color="#1976d2" />}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.switchRow}>
            <Text style={styles.label}>Enable Reminders</Text>
            <Toggle
              checked={remindersEnabled}
              onChange={(val) => {
                if (typeof reminders === "boolean") {
                  setReminders(val);
                } else {
                  setReminders(
                    val
                      ? { ...reminders }
                      : {
                          dayBefore: false,
                          weekBefore: false,
                          monthBefore: false,
                        }
                  );
                }
              }}
              label=""
            />
          </View>
          {remindersEnabled && (
            <View style={{ marginTop: 12 }}>
              {(
                [
                  { key: "dayBefore", label: "1 day before" },
                  { key: "weekBefore", label: "1 week before" },
                  { key: "monthBefore", label: "1 month before" },
                ] as const
              ).map(({ key, label }) => (
                <View
                  key={key}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Checkbox
                    checked={
                      typeof reminders === "object" ? reminders[key] : false
                    }
                    onChange={(checked) => {
                      if (typeof reminders === "boolean") {
                        setReminders({
                          dayBefore: key === "dayBefore" ? checked : false,
                          weekBefore: key === "weekBefore" ? checked : false,
                          monthBefore: key === "monthBefore" ? checked : false,
                        });
                      } else {
                        setReminders({ ...reminders, [key]: checked });
                      }
                    }}
                    style={{ marginRight: 8 }}
                  />
                  <Text>{label}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerButtons}>
          {onCancel && (
            <Button
              label="Cancel"
              variant="outline"
              size="md"
              fullWidth
              onPress={onCancel}
              disabled={isLoading}
              style={styles.cancelButton}
              textStyle={styles.cancelButtonText}
            />
          )}

          <Button
            label={mode === "edit" ? "Update" : "Save"}
            variant="light"
            size="md"
            fullWidth
            onPress={handleSave}
            disabled={!isValid || isLoading}
          />
        </View>
      </View>
    </View>
  );
};
