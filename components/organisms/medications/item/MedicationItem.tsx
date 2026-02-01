import colors from "@theme/colors";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import type { MedicationFrequency } from "../../../../types";
import { Badge } from "../../../atoms/data/badge/Badge";
import { Checkbox } from "../../../atoms/inputs/checkbox/Checkbox";
import { styles } from "./MedicationItem.styles";

export interface MedicationItemProps {
  name: string;
  dosage: string;
  unit: string;
  time?: string;
  isActive: boolean;
  frequency?: MedicationFrequency;
  onToggleActive?: (checked: boolean) => void;
  onPress?: () => void;
}

export const MedicationItem: React.FC<MedicationItemProps> = ({
  name,
  dosage,
  unit,
  time,
  isActive,
  frequency,
  onToggleActive,
  onPress,
}) => {
  const showCheckbox = frequency !== "as_needed";

  return (
    <View
      style={[styles.container, isActive ? styles.active : styles.inactive]}
    >
      <TouchableOpacity
        style={styles.infoSection}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.dosage}>
          {dosage}
          {unit}
        </Text>
      </TouchableOpacity>
      {time && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch",
            marginRight: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#f0f4f8",
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 12,
              minWidth: 36,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: "#666666",
                textAlign: "center",
              }}
            >
              {time}
            </Text>
          </View>
        </View>
      )}
      {showCheckbox && (
        <Checkbox
          checked={isActive}
          onChange={onToggleActive || (() => {})}
          variant="outline"
          size="lg"
          style={{ marginLeft: 0 }}
        />
      )}
    </View>
  );
};
