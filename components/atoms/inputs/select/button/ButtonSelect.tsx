import { IconSelector } from "@tabler/icons-react-native";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

export type SelectOption = { label: string; value: string };

export type ButtonSelectProps = {
  data: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: any;
  fullWidth?: boolean;
  variant?: "outline" | "transparent";
};

export const ButtonSelect: React.FC<ButtonSelectProps> = ({
  data,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  style,
  fullWidth = false,
  variant = "outline",
}) => {
  const [visible, setVisible] = useState(false);
  const selected = data.find((item) => item.value === value);

  return (
    <View style={style}>
      <TouchableOpacity
        style={[
          buttonSelectStyles.button,
          variant === "transparent"
            ? buttonSelectStyles.transparent
            : buttonSelectStyles.outline,
          fullWidth
            ? buttonSelectStyles.fullWidth
            : buttonSelectStyles.autoWidth,
          style,
        ]}
        onPress={() => !disabled && setVisible(true)}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <Text
          style={[
            buttonSelectStyles.text,
            fullWidth && buttonSelectStyles.textEllipsis,
          ]}
          numberOfLines={fullWidth ? 1 : undefined}
          ellipsizeMode={fullWidth ? "tail" : undefined}
        >
          {selected ? selected.label : placeholder}
        </Text>
        <View style={{ marginLeft: 8 }} pointerEvents="none">
          <IconSelector size={20} color="#1976d2" />
        </View>
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={buttonSelectStyles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={buttonSelectStyles.dropdown}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={buttonSelectStyles.option}
                  onPress={() => {
                    onChange(item.value);
                    setVisible(false);
                  }}
                >
                  <Text style={buttonSelectStyles.optionText} numberOfLines={2}>
                    {item.label}
                  </Text>
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

const buttonSelectStyles = {
  button: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "flex-start" as const,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: 80,
  },
  outline: {
    borderWidth: 2,
    borderColor: "#1976d2",
    backgroundColor: "#fff",
  },
  transparent: {
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  autoWidth: {
    alignSelf: "flex-start" as const,
    width: undefined,
  },
  fullWidth: {
    alignSelf: "stretch" as const,
    width: "100%",
  },
  text: {
    color: "#1976d2",
    fontWeight: "500" as const,
    fontSize: 16,
    flexShrink: 1,
    minWidth: 0,
  },
  textEllipsis: {
    maxWidth: 9999,
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
    color: "#1976d2",
  },
};
