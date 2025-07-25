import { QueryProvider } from "@/components/queryProvider";
import { BookOpen } from "@/lib/icons/bookOpen";
import { User } from "@/lib/icons/user";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { PortalHost } from "@rn-primitives/portal";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "~/global.css";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { useTabBarStore } from "@/lib/stores/tabBarStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const { isVisible } = useTabBarStore();
  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <QueryProvider>
          <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
            <Tabs
              screenOptions={{
                animation: "shift",
                tabBarStyle: {
                  paddingTop: 5,
                  paddingBottom: 10,
                  display: isVisible ? "flex" : "none",
                },
              }}
            >
              <Tabs.Screen
                name="index"
                options={{
                  headerShown: false,
                  title: "Главная",
                  tabBarIcon: ({ color, focused, size }) => (
                    <BookOpen size={size} color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="profile"
                options={{
                  title: "Профиль",
                  headerShown: false,
                  tabBarIcon: ({ color, focused, size }) => (
                    <User size={size} color={color} />
                  ),
                }}
              />

              <Tabs.Screen
                name="courses"
                options={{
                  href: null,
                  headerShown: false,
                }}
              />
            </Tabs>
            <PortalHost />
          </ThemeProvider>
        </QueryProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
