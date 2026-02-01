import {
  IconChevronDown,
  IconChevronUp,
  IconChevronsDown,
  IconChevronsUp,
  IconStopwatch,
} from "@tabler/icons-react-native";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../../buttons/button/Button";
import { styles } from "./TimePicker.styles";

export interface TimePickerProps {
  value?: { hour: number; minute: number };
  onChange?: (val: { hour: number; minute: number }) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface TimePickerRef {
  open: () => void;
  close: () => void;
}

export const TimePicker = React.forwardRef<TimePickerRef, TimePickerProps>(
  ({ value, onChange, label, placeholder = "Select time", disabled }, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [hour, setHour] = useState(value?.hour ?? 12);
    const [minute, setMinute] = useState(value?.minute ?? 0);

    const open = () => !disabled && setModalVisible(true);
    const close = () => setModalVisible(false);

    React.useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    useEffect(() => {
      if (value) {
        setHour(value.hour);
        setMinute(value.minute);
      }
    }, [value]);

    const setAndChange = (h: number, m: number) => {
      setHour(h);
      setMinute(m);
    };

    const incrementHour = () => setAndChange((hour + 1) % 24, minute);
    const decrementHour = () => setAndChange((hour + 23) % 24, minute);
    const incrementHourBy4 = () => setAndChange((hour + 4) % 24, minute);
    const decrementHourBy4 = () => setAndChange((hour + 20) % 24, minute);
    const incrementMinute = () => setAndChange(hour, (minute + 1) % 60);
    const decrementMinute = () => setAndChange(hour, (minute + 59) % 60);
    const incrementMinuteBy25 = () => setAndChange(hour, (minute + 25) % 60);
    const decrementMinuteBy25 = () => setAndChange(hour, (minute + 35) % 60);

    const display = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;

    return (
      <>
        <Modal
          visible={modalVisible}
          transparent
          animationType="none"
          onRequestClose={close}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.timeRow}>
                <View style={styles.timeCol}>
                  <TouchableOpacity
                    onPress={incrementHourBy4}
                    style={styles.arrowBtn}
                  >
                    <IconChevronsUp size={22} color="#1976d2" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={incrementHour}
                    style={styles.arrowBtn}
                  >
                    <IconChevronUp size={24} color="#1976d2" />
                  </TouchableOpacity>
                  <Text style={styles.timeText}>
                    {hour.toString().padStart(2, "0")}
                  </Text>
                  <TouchableOpacity
                    onPress={decrementHour}
                    style={styles.arrowBtn}
                  >
                    <IconChevronDown size={24} color="#1976d2" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={decrementHourBy4}
                    style={styles.arrowBtn}
                  >
                    <IconChevronsDown size={22} color="#1976d2" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.colon}>:</Text>
                <View style={styles.timeCol}>
                  <TouchableOpacity
                    onPress={incrementMinuteBy25}
                    style={styles.arrowBtn}
                  >
                    <IconChevronsUp size={22} color="#1976d2" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={incrementMinute}
                    style={styles.arrowBtn}
                  >
                    <IconChevronUp size={24} color="#1976d2" />
                  </TouchableOpacity>
                  <Text style={styles.timeText}>
                    {minute.toString().padStart(2, "0")}
                  </Text>
                  <TouchableOpacity
                    onPress={decrementMinute}
                    style={styles.arrowBtn}
                  >
                    <IconChevronDown size={24} color="#1976d2" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={decrementMinuteBy25}
                    style={styles.arrowBtn}
                  >
                    <IconChevronsDown size={22} color="#1976d2" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.actionRow}>
                <Button
                  label="Cancel"
                  variant="transparent"
                  size="sm"
                  onPress={close}
                  style={styles.actionBtn}
                />
                <Button
                  label="Save"
                  variant="light"
                  size="sm"
                  onPress={() => {
                    onChange?.({ hour, minute });
                    close();
                  }}
                  style={styles.actionBtn}
                />
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  },
);
