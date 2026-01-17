import { Stack } from "expo-router";

export default function MedicationsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" options={{ presentation: "modal" }} />
      <Stack.Screen name="new" options={{ presentation: "modal" }} />
    </Stack>
  );
}
