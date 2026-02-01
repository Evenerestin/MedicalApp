import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider, useAppContext } from "../context/AppContext";

const StorybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "false";

export const unstable_settings = {
  initialRouteName: StorybookEnabled ? "(storybook)/index" : "(auth)/index",
};

function RootLayoutNav() {
  const { state } = useAppContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (state.isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inStorybookGroup = segments[0] === "(storybook)";

    const isICEProfilePage =
      segments[0] === "(pages)" &&
      segments[1] === "profile" &&
      segments[2] === "ice";

    if (StorybookEnabled && inStorybookGroup) return;

    if (!state.isAuthenticated && !inAuthGroup && !isICEProfilePage) {
      router.replace("/(auth)");
    } else if (state.isAuthenticated && inAuthGroup) {
      router.replace("/(pages)");
    }
  }, [state.isAuthenticated, state.isLoading, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={StorybookEnabled}>
        <Stack.Screen name="(storybook)/index" />
      </Stack.Protected>

      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(pages)" options={{ animation: "none" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <RootLayoutNav />
      </AppProvider>
    </SafeAreaProvider>
  );
}
