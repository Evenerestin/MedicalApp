import { Stack } from "expo-router";

export default function ICELayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="edit" options={{ presentation: "modal" }} />
    </Stack>
  );
}
