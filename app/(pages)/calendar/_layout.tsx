import { Stack } from "expo-router";

export default function CalendarLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="appointment/[id]"
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="appointment/new"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
}
