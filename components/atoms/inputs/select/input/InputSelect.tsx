import { IconSelector } from "@tabler/icons-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export type SelectOption = { label: string; value: string };

export type InputSelectProps = {
  data: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: any;
  label?: string;
  description?: string;
  required?: boolean;
};

export const InputSelect: React.FC<InputSelectProps> = ({
  data,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  style,
  label,
  description,
  required = false,
}) => {
  const [visible, setVisible] = useState(false);
  const selected = data.find((item) => item.value === value);

  return (
    <View style={style}>
      {label && (
        <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 2 }}>
          {label}
          {required && (
            <Text style={{ color: "#e53935", fontWeight: "900" }}> *</Text>
          )}
        </Text>
      )}
      {description && (
        <Text
          style={{
            fontSize: 12,
            color: "#757575",
            marginBottom: 4,
            fontWeight: "400",
          }}
        >
          {description}
        </Text>
      )}
      <TouchableOpacity
        style={inputSelectStyles.inputWrapper}
        onPress={() => !disabled && setVisible(true)}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <Text
          style={inputSelectStyles.inputText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {selected ? selected.label : placeholder}
        </Text>
        <View style={{ marginLeft: 8 }} pointerEvents="none">
          <IconSelector size={20} color="#ccccd6" />
        </View>
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={inputSelectStyles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={inputSelectStyles.dropdown}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={inputSelectStyles.option}
                  onPress={() => {
                    onChange(item.value);
                    setVisible(false);
                  }}
                >
                  <Text style={inputSelectStyles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              scrollEnabled={data.length > 6}
              style={{ maxHeight: Math.min(data.length, 6) * 48 }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const inputSelectStyles = {
  inputWrapper: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fafafd",
    borderColor: "#e4e4ea",
    minWidth: 80,
  },
  inputText: {
    color: "#757575",
    fontSize: 16,
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    minWidth: 200,
    maxHeight: 300,
    paddingVertical: 8,
    elevation: 4,
  },
  option: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    color: "#757575",
  },
};
