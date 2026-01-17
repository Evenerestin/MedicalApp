import { IconAlertCircle, IconCheck } from "@tabler/icons-react-native";
import React from "react";
import { View } from "react-native";
import { Badge } from "./Badge";

export default {
  title: "Atoms/Data/Badge",
  component: Badge,
};

export const Base = () => (
  <View style={{ padding: 24 }}>
    <Badge>Default</Badge>
  </View>
);

export const Sizes = () => (
  <View style={{ flexDirection: "row", gap: 8, padding: 24 }}>
    <Badge size="sm">Small</Badge>
    <Badge size="md">Medium</Badge>
    <Badge size="lg">Large</Badge>
  </View>
);

export const Light = () => (
  <View style={{ flexDirection: "row", gap: 8, padding: 24 }}>
    <Badge>Filled</Badge>
    <Badge leftSection={<IconCheck size={16} />}>Success</Badge>
    <Badge rightSection={<IconAlertCircle size={16} />}>Warning</Badge>
    <Badge
      leftSection={<IconCheck size={16} />}
      rightSection={<IconAlertCircle size={16} />}
    >
      Both
    </Badge>
  </View>
);

export const Filled = () => (
  <View style={{ flexDirection: "row", gap: 8, padding: 24 }}>
    <Badge variant="filled">Filled</Badge>
    <Badge variant="filled" leftSection={<IconCheck size={16} />}>
      Success
    </Badge>
    <Badge variant="filled" rightSection={<IconAlertCircle size={16} />}>
      Warning
    </Badge>
    <Badge
      variant="filled"
      leftSection={<IconCheck size={16} />}
      rightSection={<IconAlertCircle size={16} />}
    >
      Both
    </Badge>
  </View>
);

export const Colors = () => (
  <View>
    <View style={{ flexDirection: "row", gap: 8, padding: 24 }}>
      <Badge color="#1976d2">Primary</Badge>
      <Badge color="#e53935">Error</Badge>
      <Badge color="#43a047">Success</Badge>
      <Badge color="#fbc02d">Warning</Badge>
    </View>
    <View style={{ flexDirection: "row", gap: 8, padding: 24 }}>
      <Badge variant="filled" color="#1976d2">
        Primary
      </Badge>
      <Badge variant="filled" color="#e53935">
        Error
      </Badge>
      <Badge variant="filled" color="#43a047">
        Success
      </Badge>
      <Badge variant="filled" color="#fbc02d">
        Warning
      </Badge>
    </View>
  </View>
);

export const Icons = () => (
  <View style={{ flexDirection: "row", gap: 8, padding: 24 }}>
    <Badge leftSection={<IconCheck size={16} color="#43a047" />}>Success</Badge>
    <Badge rightSection={<IconAlertCircle size={16} color="#e53935" />}>
      Warning
    </Badge>
    <Badge
      leftSection={<IconCheck size={16} color="#fff" />}
      rightSection={<IconAlertCircle size={16} color="#fff" />}
      backgroundColor="#1976d2"
      color="#fff"
    >
      Both
    </Badge>
  </View>
);
