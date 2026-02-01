import { IconTrash } from "@tabler/icons-react-native";
import colors from "@theme/colors";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Medication,
  MedicationFrequency,
  MedicationUnit,
} from "../../../../types";
import { Button } from "../../../atoms/buttons/button/Button";
import { Input } from "../../../atoms/inputs/input/Input";
import {
  TimePicker,
  TimePickerRef,
} from "../../../atoms/inputs/picker/time/TimePicker";
import { Radio } from "../../../atoms/inputs/radio/Radio";
import { Toggle } from "../../../atoms/inputs/toggle/Toggle";
import { styles } from "./MedicationForm.styles";

export interface MedicationFormData {
  name: string;
  dosage: string;
  unit: MedicationUnit;
  frequency: MedicationFrequency;
  times: string[];
  notes?: string;
  remindersEnabled?: boolean;
}

export interface MedicationFormProps {
  mode: "add" | "edit";
  initialData?: Partial<MedicationFormData>;
  onSave?: (data: MedicationFormData) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const unitOptions: { value: MedicationUnit; label: string }[] = [
  { value: "tablets", label: "Tablets" },
  { value: "drops", label: "Drops" },
  { value: "mg", label: "mg" },
  { value: "ml", label: "ml" },
  { value: "g", label: "g" },
];

const frequencyOptions: { value: MedicationFrequency; label: string }[] = [
  { value: "once_daily", label: "Once daily" },
  { value: "twice_daily", label: "Twice daily" },
  { value: "three_times_daily", label: "Three times daily" },
  { value: "four_times_daily", label: "Four times daily" },
  { value: "weekly", label: "Weekly" },
  { value: "as_needed", label: "As needed" },
];

export const MedicationForm = ({
  mode,
  initialData = {},
  onSave,
  onDelete,
  onCancel,
  isLoading = false,
}: MedicationFormProps) => {
  const getTimesCountForFrequency = (freq: MedicationFrequency): number => {
    switch (freq) {
      case "once_daily":
        return 1;
      case "twice_daily":
        return 2;
      case "three_times_daily":
        return 3;
      case "four_times_daily":
        return 4;
      case "weekly":
        return 1;
      case "as_needed":
        return 0;
      default:
        return 1;
    }
  };

  const getMaxTimesForFrequency = (freq: MedicationFrequency): number => {
    switch (freq) {
      case "as_needed":
        return 5;
      default:
        return getTimesCountForFrequency(freq);
    }
  };

  function initializeTimesForFrequency(freq: MedicationFrequency): string[] {
    const count = getTimesCountForFrequency(freq);
    return Array(count).fill("");
  }

  const [name, setName] = useState(initialData.name || "");
  const [dosage, setDosage] = useState(initialData.dosage || "");
  const [unit, setUnit] = useState<MedicationUnit>(
    initialData.unit || "tablets",
  );
  const [frequency, setFrequency] = useState<MedicationFrequency>(
    initialData.frequency || "once_daily",
  );
  const [times, setTimes] = useState<string[]>(
    initialData.times || initializeTimesForFrequency("once_daily"),
  );
  const [notes, setNotes] = useState(initialData.notes || "");
  const [remindersEnabled, setRemindersEnabled] = useState<boolean>(
    initialData.remindersEnabled ?? false,
  );

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [editingTimeIndex, setEditingTimeIndex] = useState<number | null>(null);
  const [selectedTimeForEdit, setSelectedTimeForEdit] = useState<{
    hour: number;
    minute: number;
  }>({ hour: 9, minute: 0 });
  const timePickerRef = React.useRef<TimePickerRef>(null);

  const handleFrequencyChange = (newFrequency: MedicationFrequency) => {
    setFrequency(newFrequency);
    const newCount = getTimesCountForFrequency(newFrequency);
    const currentCount = times.length;

    if (newCount > currentCount) {
      setTimes([...times, ...Array(newCount - currentCount).fill("")]);
    } else if (newCount < currentCount) {
      setTimes(times.slice(0, newCount));
    }
  };

  const isValid = name.trim() !== "" && dosage.trim() !== "";

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
        name: name.trim(),
        dosage: dosage.trim(),
        unit,
        frequency,
        times,
        notes: notes.trim() || undefined,
        remindersEnabled,
      });
    }
  };

  const handleAddTime = () => {
    const maxCount = getMaxTimesForFrequency(frequency);
    if (times.length < maxCount) {
      setEditingTimeIndex(times.length);
      setSelectedTimeForEdit({ hour: 9, minute: 0 });
      timePickerRef.current?.open();
    }
  };

  const handleEditTime = (index: number) => {
    if (times[index]) {
      const [hour, minute] = times[index].split(":").map(Number);
      setEditingTimeIndex(index);
      setSelectedTimeForEdit({ hour, minute });
    } else {
      setEditingTimeIndex(index);
      setSelectedTimeForEdit({ hour: 9, minute: 0 });
    }
    timePickerRef.current?.open();
  };

  const handleTimeChange = ({
    hour,
    minute,
  }: {
    hour: number;
    minute: number;
  }) => {
    setSelectedTimeForEdit({ hour, minute });

    const newTime = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;

    if (editingTimeIndex !== null) {
      const updatedTimes = [...times];
      updatedTimes[editingTimeIndex] = newTime;
      setTimes(updatedTimes);
    }

    setEditingTimeIndex(null);
  };

  const handleRemoveTime = (index: number) => {
    if (frequency === "as_needed") {
      setTimes(times.filter((_, i) => i !== index));
    } else {
      const updatedTimes = [...times];
      updatedTimes[index] = "";
      setTimes(updatedTimes);
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
                label="Delete Medication"
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
                      Delete Medication?
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: colors.textSecondary,
                        marginBottom: 24,
                        textAlign: "center",
                      }}
                    >
                      Are you sure you want to delete this medication? This
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
          <Text style={styles.label}>Name *</Text>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Enter medication name"
            required
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Dosage *</Text>
          <Input
            value={dosage}
            onChangeText={setDosage}
            placeholder="e.g., 100"
            keyboardType="numeric"
            required
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Unit</Text>
          <View style={styles.unitSelector}>
            {unitOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.unitOption,
                  unit === option.value && styles.unitOptionSelected,
                ]}
                onPress={() => setUnit(option.value)}
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.unitOptionText,
                    unit === option.value && styles.unitOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Frequency</Text>
          <View style={styles.frequencySelector}>
            {frequencyOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.frequencyOption,
                  frequency === option.value && styles.frequencyOptionSelected,
                ]}
                onPress={() => handleFrequencyChange(option.value)}
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.frequencyOptionText,
                    frequency === option.value &&
                      styles.frequencyOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {frequency !== "as_needed" && (
          <View style={styles.section}>
            <Text style={styles.label}>Times</Text>
            <View style={styles.timeSchedule}>
              {times.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.timeChip}
                  onPress={() => handleEditTime(index)}
                  disabled={isLoading}
                >
                  <Text style={styles.timeChipText}>{time || "HH:MM"}</Text>
                </TouchableOpacity>
              ))}
              {times.length < getMaxTimesForFrequency(frequency) && (
                <TouchableOpacity
                  style={styles.addTimeButton}
                  onPress={handleAddTime}
                  disabled={isLoading}
                >
                  <Text style={styles.addTimeButtonText}>+ Add time</Text>
                </TouchableOpacity>
              )}
            </View>
            <TimePicker
              ref={timePickerRef}
              value={selectedTimeForEdit}
              onChange={handleTimeChange}
            />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.label}>Notes</Text>
          <Input
            value={notes}
            onChangeText={setNotes}
            placeholder="Additional notes (optional)"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.switchRow}>
            <Text style={styles.label}>Enable Reminders</Text>
            <Toggle
              checked={remindersEnabled}
              onChange={setRemindersEnabled}
              label=""
            />
          </View>
          {remindersEnabled && (
            <View style={{ marginTop: 12, paddingHorizontal: 8 }}>
              <Text style={{ fontSize: 14, color: "#666", lineHeight: 20 }}>
                You will receive reminders for this medication at the scheduled
                times.
              </Text>
            </View>
          )}
        </View>

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
