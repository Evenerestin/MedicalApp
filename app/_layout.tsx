import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider } from "../context/AppContext";

const StorybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "false";

export const unstable_settings = {
  initialRouteName: StorybookEnabled ? "(storybook)/index" : "(pages)/index",
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={StorybookEnabled}>
            <Stack.Screen name="(storybook)/index" />
          </Stack.Protected>

          <Stack.Screen name="(pages)" />
        </Stack>
      </AppProvider>
    </SafeAreaProvider>
  );
}
