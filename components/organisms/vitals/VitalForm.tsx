import { Ionicons } from "@expo/vector-icons";
import colors from "@theme/colors";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VitalType } from "../../../types";
import { Button } from "../../atoms/buttons/button/Button";
import { styles } from "./Vitals.styles";

export interface VitalFormData {
  type: VitalType;
  value: number;
  secondaryValue?: number;
  tertiaryValue?: number;
  unit: string;
  notes?: string;
  measuredAt: string;
}

export interface VitalFormProps {
  onSave?: (data: VitalFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

interface VitalTypeConfig {
  type: VitalType;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  unit: string;
  hasSecondary?: boolean;
  secondaryLabel?: string;
  hasTertiary?: boolean;
  tertiaryLabel?: string;
  normalRange?: { min: number; max: number };
  secondaryNormalRange?: { min: number; max: number };
  tertiaryNormalRange?: { min: number; max: number };
}

const vitalTypes: VitalTypeConfig[] = [
  {
    type: "blood_pressure",
    label: "Blood Pressure & Heart Rate",
    icon: "heart",
    iconColor: "#e53935",
    unit: "mmHg / bpm",
    hasSecondary: true,
    secondaryLabel: "Diastolic",
    hasTertiary: true,
    tertiaryLabel: "Heart Rate",
    normalRange: { min: 90, max: 140 },
    secondaryNormalRange: { min: 60, max: 90 },
    tertiaryNormalRange: { min: 60, max: 100 },
  },
  {
    type: "weight",
    label: "Weight",
    icon: "scale",
    iconColor: "#43a047",
    unit: "kg",
  },
  {
    type: "glucose",
    label: "Blood Glucose",
    icon: "water",
    iconColor: "#fb8c00",
    unit: "mg/dL",
    normalRange: { min: 70, max: 140 },
  },
];

const getValueStatus = (
  value: number,
  range?: { min: number; max: number },
): "normal" | "low" | "high" | "unknown" => {
  if (!range) return "unknown";
  if (value < range.min) return "low";
  if (value > range.max) return "high";
  return "normal";
};

const getStatusColor = (status: "normal" | "low" | "high" | "unknown") => {
  switch (status) {
    case "normal":
      return "#43a047";
    case "low":
      return "#1976d2";
    case "high":
      return "#e53935";
    default:
      return "#666666";
  }
};

const getStatusText = (status: "normal" | "low" | "high" | "unknown") => {
  switch (status) {
    case "normal":
      return "Normal range";
    case "low":
      return "Below normal";
    case "high":
      return "Above normal";
    default:
      return "";
  }
};

export const VitalForm = ({
  onSave,
  onCancel,
  isLoading = false,
}: VitalFormProps) => {
  const [selectedType, setSelectedType] = useState<VitalType>("blood_pressure");
  const [value, setValue] = useState("");
  const [secondaryValue, setSecondaryValue] = useState("");
  const [tertiaryValue, setTertiaryValue] = useState("");
  const [notes, setNotes] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const currentTypeConfig = vitalTypes.find((t) => t.type === selectedType);

  const isValid =
    value.trim() !== "" &&
    !isNaN(parseFloat(value)) &&
    (!currentTypeConfig?.hasSecondary ||
      (secondaryValue.trim() !== "" && !isNaN(parseFloat(secondaryValue)))) &&
    (!currentTypeConfig?.hasTertiary ||
      (tertiaryValue.trim() !== "" && !isNaN(parseFloat(tertiaryValue))));

  const valueNum = parseFloat(value) || 0;
  const secondaryValueNum = parseFloat(secondaryValue) || 0;
  const tertiaryValueNum = parseFloat(tertiaryValue) || 0;

  const valueStatus = getValueStatus(valueNum, currentTypeConfig?.normalRange);
  const secondaryStatus = getValueStatus(
    secondaryValueNum,
    currentTypeConfig?.secondaryNormalRange,
  );
  const tertiaryStatus = getValueStatus(
    tertiaryValueNum,
    currentTypeConfig?.tertiaryNormalRange,
  );

  const handleSave = () => {
    if (isValid && !isLoading) {
      onSave?.({
        type: selectedType,
        value: parseFloat(value),
        secondaryValue: secondaryValue ? parseFloat(secondaryValue) : undefined,
        tertiaryValue: tertiaryValue ? parseFloat(tertiaryValue) : undefined,
        unit: currentTypeConfig?.unit || "",
        notes: notes.trim() || undefined,
        measuredAt: new Date().toISOString(),
      });
    }
  };

  const renderValueHint = (
    fieldValue: string,
    status: "normal" | "low" | "high" | "unknown",
    range?: { min: number; max: number },
  ) => {
    if (!fieldValue || !range) return null;
    const statusText = getStatusText(status);
    if (!statusText) return null;

    return (
      <Text
        style={{ fontSize: 12, color: getStatusColor(status), marginTop: 4 }}
      >
        {getStatusText(status)} ({range.min} - {range.max})
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onCancel}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.formTitle}>Add Measurement</Text>
          <View style={{ width: 40 }} />
        </View>
        <ScrollView
          style={styles.formScrollContent}
          contentContainerStyle={{ paddingBottom: 180 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Measurement Type</Text>
            <View style={{ gap: 8 }}>
              {vitalTypes.map((type) => (
                <TouchableOpacity
                  key={type.type}
                  style={[
                    styles.typeOption,
                    { width: "100%", minWidth: "100%" },
                    selectedType === type.type && styles.typeOptionSelected,
                  ]}
                  onPress={() => {
                    setSelectedType(type.type);
                    setValue("");
                    setSecondaryValue("");
                    setTertiaryValue("");
                  }}
                  disabled={isLoading}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: `${type.iconColor}20`,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 12,
                    }}
                  >
                    <Ionicons
                      name={type.icon}
                      size={20}
                      color={type.iconColor}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.typeOptionText,
                        selectedType === type.type &&
                          styles.typeOptionTextSelected,
                        { fontSize: 15, fontWeight: "500" },
                      ]}
                    >
                      {type.label}
                    </Text>
                    <Text
                      style={{ fontSize: 12, color: "#999999", marginTop: 2 }}
                    >
                      Unit: {type.unit}
                    </Text>
                  </View>
                  {selectedType === type.type && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Measurement Values</Text>
            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.halfInput]}>
                <Text style={styles.label}>
                  {currentTypeConfig?.hasSecondary
                    ? "Systolic (upper)"
                    : "Value"}{" "}
                  *
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === "value" && styles.inputFocused,
                    value &&
                      valueStatus !== "unknown" && {
                        borderColor: getStatusColor(valueStatus),
                      },
                  ]}
                  value={value}
                  onChangeText={setValue}
                  placeholder={
                    currentTypeConfig?.hasSecondary
                      ? "e.g. 120"
                      : currentTypeConfig?.type === "weight"
                        ? "e.g. 70"
                        : "e.g. 100"
                  }
                  placeholderTextColor="#999999"
                  keyboardType="numeric"
                  onFocus={() => setFocusedField("value")}
                  onBlur={() => setFocusedField(null)}
                  editable={!isLoading}
                />
                {renderValueHint(
                  value,
                  valueStatus,
                  currentTypeConfig?.normalRange,
                )}
              </View>
              {currentTypeConfig?.hasSecondary && (
                <View style={[styles.inputContainer, styles.halfInput]}>
                  <Text style={styles.label}>
                    {currentTypeConfig.secondaryLabel} (lower) *
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedField === "secondaryValue" && styles.inputFocused,
                      secondaryValue &&
                        secondaryStatus !== "unknown" && {
                          borderColor: getStatusColor(secondaryStatus),
                        },
                    ]}
                    value={secondaryValue}
                    onChangeText={setSecondaryValue}
                    placeholder="e.g. 80"
                    placeholderTextColor="#999999"
                    keyboardType="numeric"
                    onFocus={() => setFocusedField("secondaryValue")}
                    onBlur={() => setFocusedField(null)}
                    editable={!isLoading}
                  />
                  {renderValueHint(
                    secondaryValue,
                    secondaryStatus,
                    currentTypeConfig?.secondaryNormalRange,
                  )}
                </View>
              )}
            </View>
            {currentTypeConfig?.hasTertiary && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {currentTypeConfig.tertiaryLabel} *
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === "tertiaryValue" && styles.inputFocused,
                    tertiaryValue &&
                      tertiaryStatus !== "unknown" && {
                        borderColor: getStatusColor(tertiaryStatus),
                      },
                  ]}
                  value={tertiaryValue}
                  onChangeText={setTertiaryValue}
                  placeholder="e.g. 72"
                  placeholderTextColor="#999999"
                  keyboardType="numeric"
                  onFocus={() => setFocusedField("tertiaryValue")}
                  onBlur={() => setFocusedField(null)}
                  editable={!isLoading}
                />
                {renderValueHint(
                  tertiaryValue,
                  tertiaryStatus,
                  currentTypeConfig?.tertiaryNormalRange,
                )}
              </View>
            )}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Unit</Text>
              <View
                style={[
                  styles.input,
                  {
                    backgroundColor: "#f0f0f0",
                    justifyContent: "center",
                  },
                ]}
              >
                <Text style={{ fontSize: 16, color: "#666666" }}>
                  {currentTypeConfig?.unit}
                </Text>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Notes (optional)</Text>
              <TextInput
                style={[
                  styles.input,
                  { height: 80, textAlignVertical: "top", paddingTop: 12 },
                  focusedField === "notes" && styles.inputFocused,
                ]}
                value={notes}
                onChangeText={setNotes}
                placeholder="e.g. After morning walk, before breakfast..."
                placeholderTextColor="#999999"
                multiline
                numberOfLines={3}
                onFocus={() => setFocusedField("notes")}
                onBlur={() => setFocusedField(null)}
                editable={!isLoading}
              />
            </View>
          </View>
          <View style={[styles.section, { backgroundColor: "#e8f5e9" }]}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Ionicons name="bulb" size={20} color="#43a047" />
              <Text
                style={[
                  styles.sectionTitle,
                  { color: "#43a047", marginBottom: 0, marginLeft: 8 },
                ]}
              >
                Tips
              </Text>
            </View>
            {selectedType === "blood_pressure" && (
              <Text style={{ fontSize: 13, color: "#2e7d32", lineHeight: 20 }}>
                • Measure at the same time each day{"\n"}• Sit quietly for 5
                minutes before measuring{"\n"}• Avoid caffeine and exercise 30
                min before{"\n"}• Normal: 120/80 mmHg or less
              </Text>
            )}
            {selectedType === "weight" && (
              <Text style={{ fontSize: 13, color: "#2e7d32", lineHeight: 20 }}>
                • Weigh yourself at the same time each day{"\n"}• Best time is
                in the morning before eating{"\n"}• Use the same scale for
                consistency{"\n"}• Track trends, not daily fluctuations
              </Text>
            )}
            {selectedType === "glucose" && (
              <Text style={{ fontSize: 13, color: "#2e7d32", lineHeight: 20 }}>
                • Fasting glucose: 70-100 mg/dL (normal){"\n"}• 2 hours after
                meal: below 140 mg/dL{"\n"}• Test before meals and at bedtime
                {"\n"}• Note what you ate if testing after meals
              </Text>
            )}
          </View>
          <View style={styles.footer}>
            <View style={styles.footerButtons}>
              <Button
                label="Cancel"
                variant="outline"
                onPress={onCancel}
                disabled={isLoading}
                style={{ flex: 1, minWidth: 0 }}
              />
              <Button
                label={isLoading ? "Saving..." : "Save Measurement"}
                variant="filled"
                onPress={handleSave}
                disabled={!isValid || isLoading}
                style={{ flex: 1, minWidth: 0 }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
