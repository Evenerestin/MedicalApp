import { IconCalendarWeek } from "@tabler/icons-react-native";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./Complex.styles";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export interface ComplexDatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  label?: string;
  minYear?: number;
  maxYear?: number;
  disabled?: boolean;
}

export const ComplexDatePicker: React.FC<ComplexDatePickerProps> = ({
  value,
  onChange,
  label,
  minYear = 1900,
  maxYear = new Date().getFullYear() + 10,
  disabled,
}) => {
  const [day, setDay] = useState(value ? value.getDate() : undefined);
  const [month, setMonth] = useState(value ? value.getMonth() : undefined);
  const [year, setYear] = useState(value ? value.getFullYear() : undefined);
  const [step, setStep] = useState<"day" | "month" | "year" | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [monthModal, setMonthModal] = useState(false);
  const [yearModal, setYearModal] = useState(false);

  const open = () => !disabled && setModalVisible(true);
  const close = () => {
    setModalVisible(false);
    setMonthModal(false);
    setYearModal(false);
    setStep(null);
  };

  const handleDaySelect = (d: number) => {
    setDay(d);
    setModalVisible(false);
    setStep("month");
    setMonthModal(true);
  };

  const handleMonthSelect = (idx: number) => {
    setMonth(idx);
    setMonthModal(false);
    setStep("year");
    setYearModal(true);
  };

  const handleYearSelect = (y: number) => {
    setYear(y);
    setYearModal(false);
    setStep(null);
    setModalVisible(false);
    // Compose date and call onChange
    if (day && month !== undefined && y >= minYear && y <= maxYear) {
      onChange?.(new Date(y, month, day));
    }
  };

  // Display value
  let display = "";
  if (day !== undefined && month !== undefined && year !== undefined) {
    display = `${String(day).padStart(2, "0")} ${MONTHS[month]} ${year}`;
  }

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[styles.input, disabled && { opacity: 0.5 }]}
        onPress={() => {
          if (!disabled) {
            setStep("day");
            setModalVisible(true);
          }
        }}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={display ? styles.value : styles.placeholder}>
          {display || "DD:MMM:YYYY"}
        </Text>
        <IconCalendarWeek size={24} color="#1976d2" />
      </TouchableOpacity>
      {/* Day picker modal */}
      <Modal
        visible={modalVisible && step === "day"}
        transparent
        animationType="none"
        onRequestClose={close}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalLabel}>Day</Text>
            <View style={styles.daysGrid}>
              {Array.from({ length: 31 }).map((_, i) => (
                <TouchableOpacity
                  key={i + 1}
                  style={[styles.dayCell, day === i + 1 && styles.selected]}
                  onPress={() => handleDaySelect(i + 1)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      day === i + 1 && styles.selectedText,
                    ]}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={close}>
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Month picker modal */}
      <Modal
        visible={monthModal}
        transparent
        animationType="none"
        onRequestClose={close}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalLabel}>Month</Text>
            <View style={styles.monthsGrid}>
              {MONTHS.map((m, idx) => (
                <TouchableOpacity
                  key={m}
                  style={[
                    styles.monthCell,
                    month === idx && styles.selected,
                    idx === new Date().getMonth() && styles.today,
                  ]}
                  onPress={() => handleMonthSelect(idx)}
                >
                  <Text
                    style={[
                      styles.monthText,
                      month === idx && styles.selectedText,
                      idx === new Date().getMonth() && styles.todayText,
                    ]}
                  >
                    {m}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={close}>
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Year picker modal */}
      <Modal
        visible={yearModal}
        transparent
        animationType="none"
        onRequestClose={close}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalLabel}>Year</Text>
            <ScrollView style={{ maxHeight: 240 }}>
              <View style={styles.yearsGrid}>
                {Array.from({ length: maxYear - minYear + 1 }).map((_, i) => {
                  const y = minYear + i;
                  return (
                    <TouchableOpacity
                      key={y}
                      style={[
                        styles.yearCell,
                        year === y && styles.selected,
                        y === new Date().getFullYear() && styles.today,
                      ]}
                      onPress={() => handleYearSelect(y)}
                    >
                      <Text
                        style={[
                          styles.yearText,
                          year === y && styles.selectedText,
                          y === new Date().getFullYear() && styles.todayText,
                        ]}
                      >
                        {y}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
            <TouchableOpacity style={styles.closeBtn} onPress={close}>
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
