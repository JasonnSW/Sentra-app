import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { UserProvider } from "@/context/user-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../global.css";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    AtkisonBold: require("../assets/fonts/AtkinsonHyperlegible-Bold.ttf"),
    AtkisonRegular: require("../assets/fonts/AtkinsonHyperlegible-Regular.ttf"),
    AtkisonItalic: require("../assets/fonts/AtkinsonHyperlegible-Italic.ttf"),
    AtkisonBoldItalic: require("../assets/fonts/AtkinsonHyperlegible-BoldItalic.ttf"),
    OpenSansRegular: require("../assets/fonts/OpenSans-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <UserProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(main)" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(e-kyc)" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
