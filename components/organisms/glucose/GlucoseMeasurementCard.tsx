import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GlucoseMeasurement, GlucoseTag } from "../../../types";
import { styles } from "./Glucose.styles";

export interface GlucoseMeasurementCardProps {
  measurement: GlucoseMeasurement;
  onPress?: () => void;
}

const tagLabels: Record<GlucoseTag, string> = {
  fasting: "Fasting",
  before_meal: "Before meal",
  after_meal: "After meal",
  before_sleep: "Before sleep",
  night: "Night",
  other: "Other",
};

const insulinTypeLabels: Record<string, string> = {
  rapid: "Rapid",
  short: "Short",
  intermediate: "Intermediate",
  long: "Long",
  mixed: "Mixed",
};

export const GlucoseMeasurementCard = ({
  measurement,
  onPress,
}: GlucoseMeasurementCardProps) => {
  const getValueIndicator = (value: number) => {
    if (value < 70) return "low";
    if (value > 140) return "high";
    return "normal";
  };

  const indicator = getValueIndicator(measurement.value);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <TouchableOpacity
      style={styles.glucoseCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.glucoseHeader}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={[
                styles.valueIndicator,
                indicator === "normal" && styles.valueNormal,
                indicator === "low" && styles.valueLow,
                indicator === "high" && styles.valueHigh,
              ]}
            />
            <View style={styles.glucoseValueContainer}>
              <Text style={styles.glucoseValue}>{measurement.value}</Text>
              <Text style={styles.glucoseUnit}>{measurement.unit}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.glucoseTime}>
            {formatDate(measurement.measuredAt)}
          </Text>
          <Text style={styles.glucoseTime}>
            {formatTime(measurement.measuredAt)}
          </Text>
        </View>
      </View>

      <View style={styles.glucoseDetails}>
        <View style={styles.glucoseTag}>
          <Text style={styles.glucoseTagText}>
            {tagLabels[measurement.tag]}
          </Text>
        </View>

        {measurement.insulinDose && (
          <View style={styles.insulinBadge}>
            <Ionicons name="water" size={12} color="#e65100" />
            <Text style={styles.insulinBadgeText}>
              {measurement.insulinDose}u
              {measurement.insulinType &&
                ` ${insulinTypeLabels[measurement.insulinType]}`}
            </Text>
          </View>
        )}
      </View>

      {measurement.notes && (
        <Text style={styles.glucoseNotes} numberOfLines={2}>
          {measurement.notes}
        </Text>
      )}
    </TouchableOpacity>
  );
};
