import {
  IconCalendar,
  IconMapPin,
  IconTrash,
  IconUser,
} from "@tabler/icons-react-native";
import colors from "@theme/colors";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../atoms/buttons/button/Button";
import { Input } from "../../../atoms/inputs/input/Input";
import { DatePicker } from "../../../atoms/inputs/picker/date/DatePicker";
import { TimePicker } from "../../../atoms/inputs/picker/time/TimePicker";
import { Radio } from "../../../atoms/inputs/radio/Radio";
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
      : (initialData.reminders ?? true),
  );

  const isValid = title.trim() !== "" && time.trim() !== "";

  const remindersEnabled =
    typeof reminders === "boolean"
      ? reminders
      : reminders.dayBefore || reminders.weekBefore || reminders.monthBefore;

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeletePress = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    onDelete?.();
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

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
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 56 }}
      >
        <View style={styles.section}>
          {mode === "edit" && onDelete && (
            <>
              <Button
                label="Delete Appointment"
                variant="light"
                color={colors.red}
                size="md"
                onPress={handleDeletePress}
                disabled={isLoading}
                leftSection={<IconTrash size={20} color={colors.red} />}
                fullWidth
                style={{ marginBottom: 32 }}
              />
              <Modal
                visible={showDeleteConfirm}
                transparent
                animationType="fade"
                onRequestClose={handleDeleteCancel}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.3)",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      padding: 24,
                      borderRadius: 12,
                      width: 320,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginBottom: 12,
                      }}
                    >
                      Delete Appointment?
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: colors.textSecondary,
                        marginBottom: 24,
                        textAlign: "center",
                      }}
                    >
                      Are you sure you want to delete this appointment? This
                      action cannot be undone.
                    </Text>
                    <View style={{ flexDirection: "row", gap: 12 }}>
                      <Button
                        label="Cancel"
                        variant="outline"
                        size="md"
                        fullWidth
                        onPress={handleDeleteCancel}
                        disabled={isLoading}
                        style={{ flex: 1, marginRight: 8 }}
                        textStyle={styles.cancelButtonText}
                      />
                      <Button
                        label="Confirm"
                        variant="light"
                        size="md"
                        fullWidth
                        onPress={handleDeleteConfirm}
                        disabled={isLoading}
                        style={{ flex: 1 }}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            </>
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
                  .padStart(2, "0")}`,
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
                        },
                  );
                }
              }}
              label=""
            />
          </View>
          {remindersEnabled && (
            <View style={{ marginTop: 12 }}>
              {[
                { key: "dayBefore" as const, label: "1 day before" },
                { key: "weekBefore" as const, label: "1 week before" },
                { key: "monthBefore" as const, label: "1 month before" },
              ].map(({ key, label }) => (
                <View
                  key={key}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 0,
                  }}
                >
                  <Radio
                    checked={
                      typeof reminders === "object" ? reminders[key] : false
                    }
                    onChange={() => {
                      if (typeof reminders === "object") {
                        setReminders({
                          ...reminders,
                          [key]: !reminders[key],
                        });
                      } else {
                        setReminders({
                          dayBefore: key === "dayBefore",
                          weekBefore: key === "weekBefore",
                          monthBefore: key === "monthBefore",
                        });
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

        {/* Footer Buttons inside ScrollView */}
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
              disabled={isLoading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
