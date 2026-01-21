import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { VitalMeasurement, VitalType } from "../../types";
import { styles } from "./Vitals.styles";

export interface VitalMeasurementCardProps {
  measurement: VitalMeasurement;
  onPress?: () => void;
}

const vitalTypeConfig: Record<
  VitalType,
  { label: string; icon: string; color: string }
> = {
  blood_pressure: { label: "BP & HR", icon: "heart", color: "#e53935" },
  weight: { label: "Weight", icon: "scale", color: "#43a047" },
  glucose: {
    label: "Glucose",
    icon: "water",
    color: "#fb8c00",
  },
};

export const VitalMeasurementCard = ({
  measurement,
  onPress,
}: VitalMeasurementCardProps) => {
  const config = vitalTypeConfig[measurement.type];

  const formatValue = () => {
    if (measurement.type === "blood_pressure" && measurement.secondaryValue) {
      return (
        <>
          <Text style={styles.measurementValue}>{measurement.value}</Text>
          <Text style={styles.measurementValueSecondary}>
            /{measurement.secondaryValue}
          </Text>
          {measurement.tertiaryValue && (
            <Text style={styles.measurementValueSecondary}>
              {" "}
              • {measurement.tertiaryValue} bpm
            </Text>
          )}
        </>
      );
    }
    return <Text style={styles.measurementValue}>{measurement.value}</Text>;
  };

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
      style={styles.measurementCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.measurementHeader}>
        <View style={styles.measurementType}>
          <View
            style={[
              styles.measurementTypeIcon,
              { backgroundColor: `${config.color}20` },
            ]}
          >
            <Ionicons
              name={config.icon as keyof typeof Ionicons.glyphMap}
              size={20}
              color={config.color}
            />
          </View>
          <View>
            <Text style={styles.measurementTypeLabel}>{config.label}</Text>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              {formatValue()}
              <Text style={styles.measurementUnit}>{measurement.unit}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.measurementTime}>
            {formatDate(measurement.measuredAt)}
          </Text>
          <Text style={styles.measurementTime}>
            {formatTime(measurement.measuredAt)}
          </Text>
        </View>
      </View>

      {measurement.notes && (
        <Text style={styles.measurementNotes} numberOfLines={2}>
          {measurement.notes}
        </Text>
      )}
    </TouchableOpacity>
  );
};
