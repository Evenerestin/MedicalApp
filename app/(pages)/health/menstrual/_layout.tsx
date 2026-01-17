import { Stack } from "expo-router";

export default function MenstrualLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="log" options={{ presentation: "modal" }} />
    </Stack>
  );
}
