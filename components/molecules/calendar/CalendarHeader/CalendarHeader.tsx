import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ActionIcon } from "../../../atoms/buttons/actionicon/ActionIcon";
import { Text } from "../../../atoms/data/typography/text/Text";
import styles from "./CalendarHeader.styles";

interface CalendarHeaderProps {
  month: string;
  year: number;
  onPrev: () => void;
  onNext: () => void;
  onMonthPress?: () => void;
  onYearPress?: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  month,
  year,
  onPrev,
  onNext,
  onMonthPress,
  onYearPress,
}) => (
  <View style={styles.container}>
    <ActionIcon
      icon={<IconChevronLeft />}
      onPress={onPrev}
      size="sm"
      variant="transparent"
    />
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      <TouchableOpacity onPress={onMonthPress}>
        <Text style={styles.title}>{month}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onYearPress}>
        <Text style={styles.title}>{year}</Text>
      </TouchableOpacity>
    </View>
    <ActionIcon
      icon={<IconChevronRight />}
      onPress={onNext}
      size="sm"
      variant="transparent"
    />
  </View>
);
