import { Header } from "@components/molecules/navigation/header/Header";
import { AppointmentsList } from "@components/organisms/appointments/list/AppointmentsList";
import {
  AppointmentsSummary,
  AppointmentSummaryItem,
} from "@components/organisms/appointments/summary/AppointmentsSummary";
import {
  MedicationsSummary,
  MedicationSummaryItem,
} from "@components/organisms/medications/summary/MedicationsSummary";
import { IconBell } from "@tabler/icons-react-native";
import colors from "@theme/colors";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MiniCalendar from "../../molecules/calendar/miniCalendar/MiniCalendar";
import ActionCard from "../../molecules/navigation/actionCard/ActionCard";
import ICECard from "../../molecules/navigation/iceCard/IceCard";

const actionCardPresets = [
  "allergies",
  "medications",
  "vitals",
  "cycle",
] as const;

const generateDefaultDays = () => {
  const today = new Date();
  const days = [];
  for (let i = -3; i <= 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({ date, selected: i === 0, disabled: false });
  }
  return days;
};

interface HomeTemplateProps {
  userName?: string;
  notificationCount?: number;
  onNotificationsPress?: () => void;
  onProfilePress?: () => void;
  getGreeting?: () => string;
  getInitials?: (name: string) => string;
  miniCalendarDays?: any[];
  onDayPress?: (date: Date) => void;
  hasICEProfile?: boolean;
  onICEPress?: () => void;
  onActionCardPress?: (preset: string) => void;
  appointments?: AppointmentSummaryItem[];
  onAddAppointmentPress?: () => void;
  onAppointmentPress?: (id: string) => void;
  medications?: MedicationSummaryItem[];
  onAddMedicationPress?: () => void;
  onMedicationPress?: (id: string) => void;
  onToggleTaken?: (id: string, taken: boolean) => void;
  showMenstrualCalendar?: boolean;
}

const HomeTemplate: React.FC<HomeTemplateProps> = ({
  userName = "User",
  notificationCount = 0,
  onNotificationsPress = () => {},
  onProfilePress = () => {},
  getGreeting = () => "Hello!",
  getInitials = (name: string) => name.charAt(0),
  miniCalendarDays = generateDefaultDays(),
  onDayPress = () => {},
  hasICEProfile = false,
  onICEPress = () => {},
  onActionCardPress = (preset: string) => {},
  appointments = [],
  onAddAppointmentPress = () => {},
  onAppointmentPress = (id: string) => {},
  medications = [],
  onAddMedicationPress = () => {},
  onMedicationPress = (id: string) => {},
  onToggleTaken = (id: string, taken: boolean) => {},
  showMenstrualCalendar = true,
}) => {
  const filteredActionCardPresets = showMenstrualCalendar
    ? actionCardPresets
    : actionCardPresets.filter((preset) => preset !== "cycle");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
        }}
      >
        <View style={{ width: "100%" }}>
          <Header
            userName={userName}
            notificationCount={notificationCount}
            onNotificationsPress={onNotificationsPress}
            onProfilePress={onProfilePress}
          />
        </View>
        <View style={{ width: "100%", marginBottom: 16 }}>
          <MiniCalendar days={miniCalendarDays} onDayPress={onDayPress} />
        </View>

        <View>
          <AppointmentsSummary
            appointments={appointments}
            onAppointmentPress={onAppointmentPress}
            onAddPress={onAddAppointmentPress}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 16,
            gap: 6,
          }}
        >
          {filteredActionCardPresets.map((preset) => (
            <View style={{ flex: 1 }} key={preset}>
              <ActionCard
                preset={preset}
                variant="light"
                onPress={() => onActionCardPress(preset)}
              />
            </View>
          ))}
        </View>
        <ICECard hasICEProfile={hasICEProfile} onPress={onICEPress} />
        <View style={{ marginTop: 16 }}>
          <MedicationsSummary
            medications={medications}
            onMedicationPress={onMedicationPress}
            onToggleTaken={onToggleTaken}
            onAddPress={onAddMedicationPress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeTemplate;
