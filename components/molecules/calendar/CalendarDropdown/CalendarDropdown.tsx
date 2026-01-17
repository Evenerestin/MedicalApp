import React from "react";
import { View } from "react-native";
import {
  InputSelect,
  SelectOption,
} from "../../../atoms/inputs/select/input/InputSelect";
import styles from "./CalendarDropdown.styles";

interface CalendarDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const CalendarDropdown: React.FC<CalendarDropdownProps> = ({
  options,
  value,
  onChange,
}) => {
  const data: SelectOption[] = options.map((o) => ({ label: o, value: o }));
  return (
    <View style={styles.container}>
      <InputSelect data={data} value={value} onChange={onChange} />
    </View>
  );
};
