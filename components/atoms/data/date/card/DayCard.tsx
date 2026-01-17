import React from "react";
import { Text, View } from "react-native";
import { styles } from "./DayCard.styles";

export interface DayCardProps {
  date: Date;
  isSelected?: boolean;
  isToday?: boolean;
  style?: any;
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DayCard: React.FC<DayCardProps> = ({
  date,
  isSelected = false,
  isToday = false,
  style,
}) => {
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayNum = ("0" + date.getDate()).slice(-2);

  const cardStyle = React.useMemo(() => {
    let style = { ...styles.card };
    if (isToday && isSelected) {
      style = { ...style, ...styles.card_filled };
    } else if (isToday) {
      style = { ...style, ...styles.card_outline };
    } else if (isSelected) {
      style = { ...style, ...styles.card_light };
    }
    return style;
  }, [isToday, isSelected]);

  const textColor = React.useMemo(() => {
    if (isToday && isSelected) {
      return "#fff";
    } else if (isToday || isSelected) {
      return "#1976d2";
    }
    return "#757575";
  }, [isToday, isSelected]);

  const labelStyle = [styles.dayLabel, { color: textColor }];
  const numStyle = [styles.dayNum, { color: textColor }];
  return (
    <View style={cardStyle}>
      <View style={styles.upperHalf}>
        <Text style={labelStyle}>{monthName}</Text>
        <Text style={numStyle}>{dayNum}</Text>
      </View>
      <View style={styles.lowerHalf}>
        <Text style={labelStyle}>{dayName}</Text>
      </View>
    </View>
  );
};
