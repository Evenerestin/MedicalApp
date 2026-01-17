import { Stack } from "expo-router";

export default function HealthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="vitals" />
      <Stack.Screen name="glucose" />
      <Stack.Screen name="menstrual" />
    </Stack>
  );
}
