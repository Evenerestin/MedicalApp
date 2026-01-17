import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  Appointment,
  GlucoseMeasurement,
  Medication,
  VitalMeasurement,
} from "../../../types";
import { styles } from "./Home.styles";

export interface HomeScreenProps {
  userName: string;
  todayAppointments: Appointment[];
  upcomingMedications: Array<{
    time: string;
    medications: Medication[];
  }>;
  recentVitals: {
    bloodPressure?: VitalMeasurement;
    heartRate?: VitalMeasurement;
    weight?: VitalMeasurement;
    glucose?: GlucoseMeasurement;
  };
  hasICEProfile: boolean;
  notificationCount?: number;
  onNotificationsPress?: () => void;
  onProfilePress?: () => void;
  onCalendarPress?: () => void;
  onMedicationsPress?: () => void;
  onVitalsPress?: () => void;
  onGlucosePress?: () => void;
  onICEPress?: () => void;
  onAppointmentPress?: (appointment: Appointment) => void;
  onViewAllAppointments?: () => void;
  onViewAllMedications?: () => void;
}

export const HomeScreen = ({
  userName,
  todayAppointments,
  upcomingMedications,
  recentVitals,
  hasICEProfile,
  notificationCount = 0,
  onNotificationsPress,
  onProfilePress,
  onCalendarPress,
  onMedicationsPress,
  onVitalsPress,
  onGlucosePress,
  onICEPress,
  onAppointmentPress,
  onViewAllAppointments,
  onViewAllMedications,
}: HomeScreenProps) => {
  const today = new Date();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
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

  const getGreeting = () => {
    const hour = today.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? "PM" : "AM";
    const displayHours = hour % 12 || 12;
    return {
      time: `${displayHours}:${minutes}`,
      period,
    };
  };

  const quickActions = [
    {
      icon: "calendar",
      label: "Calendar",
      color: "#e8eef6",
      iconColor: "#152b4f",
      onPress: onCalendarPress,
    },
    {
      icon: "medical",
      label: "Medications",
      color: "#e3f2fd",
      iconColor: "#1976d2",
      onPress: onMedicationsPress,
    },
    {
      icon: "heart",
      label: "Vitals",
      color: "#ffebee",
      iconColor: "#e53935",
      onPress: onVitalsPress,
    },
    {
      icon: "water",
      label: "Glucose",
      color: "#fff3e0",
      iconColor: "#f57c00",
      onPress: onGlucosePress,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={onNotificationsPress}
          >
            <Ionicons name="notifications-outline" size={24} color="#ffffff" />
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>
                  {notificationCount > 9 ? "9+" : notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatar} onPress={onProfilePress}>
            <Text style={styles.avatarText}>{getInitials(userName)}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.dateBanner}>
          <View style={styles.dateIcon}>
            <Ionicons name="calendar-outline" size={24} color="#152b4f" />
          </View>
          <View style={styles.dateInfo}>
            <Text style={styles.dateDay}>{dayNames[today.getDay()]}</Text>
            <Text style={styles.dateSubtext}>
              {monthNames[today.getMonth()]} {today.getDate()},{" "}
              {today.getFullYear()}
            </Text>
          </View>
        </View>

        <View style={styles.quickActions}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickActionButton}
              onPress={action.onPress}
            >
              <View
                style={[
                  styles.quickActionIcon,
                  { backgroundColor: action.color },
                ]}
              >
                <Ionicons
                  name={action.icon as any}
                  size={24}
                  color={action.iconColor}
                />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.iceQuickAccess} onPress={onICEPress}>
          <View style={styles.iceIcon}>
            <Ionicons name="medkit" size={24} color="#ffffff" />
          </View>
          <View style={styles.iceContent}>
            <Text style={styles.iceTitle}>ICE Profile</Text>
            <Text style={styles.iceSubtitle}>
              {hasICEProfile
                ? "View emergency information"
                : "Create your emergency profile"}
            </Text>
          </View>
          <View style={styles.iceArrow}>
            <Ionicons name="chevron-forward" size={24} color="#ffffff" />
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Appointments</Text>
            <TouchableOpacity onPress={onViewAllAppointments}>
              <Text style={styles.sectionViewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {todayAppointments.length > 0 ? (
            todayAppointments.slice(0, 3).map((appointment) => {
              const { time, period } = formatTime(appointment.time);
              return (
                <TouchableOpacity
                  key={appointment.id}
                  style={styles.appointmentCard}
                  onPress={() => onAppointmentPress?.(appointment)}
                >
                  <View style={styles.appointmentTime}>
                    <Text style={styles.appointmentTimeText}>{time}</Text>
                    <Text style={styles.appointmentTimePeriod}>{period}</Text>
                  </View>
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.appointmentTitle}>
                      {appointment.title}
                    </Text>
                    {appointment.doctorName && (
                      <Text style={styles.appointmentDoctor}>
                        Dr. {appointment.doctorName}
                      </Text>
                    )}
                    {appointment.address && (
                      <Text style={styles.appointmentLocation}>
                        📍 {appointment.address}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.emptyCard}>
              <Ionicons
                name="calendar-outline"
                size={40}
                color="#cccccc"
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyText}>No appointments today</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Medication Reminders</Text>
            <TouchableOpacity onPress={onViewAllMedications}>
              <Text style={styles.sectionViewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {upcomingMedications.length > 0 ? (
            upcomingMedications.slice(0, 2).map((reminder, index) => (
              <View key={index} style={styles.medicationReminderCard}>
                <View style={styles.medicationReminderHeader}>
                  <Ionicons name="alarm-outline" size={20} color="#e53935" />
                  <Text style={styles.medicationReminderTitle}>
                    {reminder.time}
                  </Text>
                </View>
                <View style={styles.medicationList}>
                  {reminder.medications.map((med) => (
                    <View key={med.id} style={styles.medicationItem}>
                      <View style={styles.medicationDot} />
                      <Text style={styles.medicationName}>{med.name}</Text>
                      <Text style={styles.medicationDose}>
                        {med.dosage}
                        {med.unit}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyCard}>
              <Ionicons
                name="medical-outline"
                size={40}
                color="#cccccc"
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyText}>No medication reminders</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Health Summary</Text>
          </View>

          <View style={styles.healthSummaryRow}>
            {recentVitals.bloodPressure && (
              <View style={styles.healthSummaryItem}>
                <View style={styles.healthSummaryCard}>
                  <View style={styles.healthSummaryCardHeader}>
                    <Ionicons name="heart" size={16} color="#e53935" />
                    <Text style={styles.healthSummaryCardTitle}>
                      Blood Pressure
                    </Text>
                  </View>
                  <View
                    style={{ flexDirection: "row", alignItems: "baseline" }}
                  >
                    <Text style={styles.healthSummaryValue}>
                      {recentVitals.bloodPressure.value}
                      {recentVitals.bloodPressure.secondaryValue && (
                        <Text>
                          /{recentVitals.bloodPressure.secondaryValue}
                        </Text>
                      )}
                    </Text>
                    <Text style={styles.healthSummaryUnit}>mmHg</Text>
                  </View>
                </View>
              </View>
            )}

            {recentVitals.heartRate && (
              <View style={styles.healthSummaryItem}>
                <View style={styles.healthSummaryCard}>
                  <View style={styles.healthSummaryCardHeader}>
                    <Ionicons name="pulse" size={16} color="#e91e63" />
                    <Text style={styles.healthSummaryCardTitle}>
                      Heart Rate
                    </Text>
                  </View>
                  <View
                    style={{ flexDirection: "row", alignItems: "baseline" }}
                  >
                    <Text style={styles.healthSummaryValue}>
                      {recentVitals.heartRate.value}
                    </Text>
                    <Text style={styles.healthSummaryUnit}>bpm</Text>
                  </View>
                </View>
              </View>
            )}

            {recentVitals.weight && (
              <View style={styles.healthSummaryItem}>
                <View style={styles.healthSummaryCard}>
                  <View style={styles.healthSummaryCardHeader}>
                    <Ionicons name="scale" size={16} color="#4caf50" />
                    <Text style={styles.healthSummaryCardTitle}>Weight</Text>
                  </View>
                  <View
                    style={{ flexDirection: "row", alignItems: "baseline" }}
                  >
                    <Text style={styles.healthSummaryValue}>
                      {recentVitals.weight.value}
                    </Text>
                    <Text style={styles.healthSummaryUnit}>kg</Text>
                  </View>
                </View>
              </View>
            )}

            {recentVitals.glucose && (
              <View style={styles.healthSummaryItem}>
                <View style={styles.healthSummaryCard}>
                  <View style={styles.healthSummaryCardHeader}>
                    <Ionicons name="water" size={16} color="#f57c00" />
                    <Text style={styles.healthSummaryCardTitle}>Glucose</Text>
                  </View>
                  <View
                    style={{ flexDirection: "row", alignItems: "baseline" }}
                  >
                    <Text style={styles.healthSummaryValue}>
                      {recentVitals.glucose.value}
                    </Text>
                    <Text style={styles.healthSummaryUnit}>
                      {recentVitals.glucose.unit}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
