import { View } from "react-native";
import { Title } from "./Title";

export default {
  title: "Atoms/Data/Typography/Title",
  component: Title,
};

export const Levels = () => (
  <View style={{ gap: 8 }}>
    <Title level={1}>Heading 1</Title>
    <Title level={2}>Heading 2</Title>
    <Title level={3}>Heading 3</Title>
    <Title level={4}>Heading 4</Title>
    <Title level={5}>Heading 5</Title>
    <Title level={6}>Heading 6</Title>
    <Title level={7}>Heading 7</Title>
  </View>
);

export const Colors = () => (
  <View style={{ gap: 8 }}>
    <Title level={1} color="#1976d2">
      Primary Color
    </Title>
    <Title level={2} color="#d32f2f">
      Danger Color
    </Title>
    <Title level={3} color="#388e3c">
      Success Color
    </Title>
  </View>
);

export const Underline = () => (
  <View style={{ gap: 8 }}>
    <Title level={2} underline>
      Underline Heading
    </Title>
  </View>
);

export const Italic = () => (
  <View style={{ gap: 8 }}>
    <Title level={3} italic>
      Italic Heading
    </Title>
  </View>
);

export const Center = () => (
  <View style={{ gap: 8 }}>
    <Title level={4} center>
      Centered Heading
    </Title>
  </View>
);

export const LetterSpacing = () => (
  <View style={{ gap: 8 }}>
    <Title level={5} letterSpacing={2}>
      Letter Spacing 2px
    </Title>
    <Title level={6} letterSpacing={4}>
      Letter Spacing 4px
    </Title>
  </View>
);

export const Combinations = () => (
  <View style={{ gap: 8 }}>
    <Title level={7} underline italic center color="#1976d2" letterSpacing={3}>
      Underline Italic Centered Primary Spacing
    </Title>
  </View>
);
