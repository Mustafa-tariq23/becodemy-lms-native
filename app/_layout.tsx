import React from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { ThemeProvider } from '@/context/theme.context'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'

import {
  Poppins_600SemiBold,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";

// SplashScreen.preventAutoHideAsync();

const _layout = () => {
  const [loaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(routes)/onboarding/index" />
          </Stack>
        </ThemeProvider>
      </GestureHandlerRootView>
  )
}

export default _layout