import React from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { ThemeProvider } from '@/context/theme.context'

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
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(routes)/onboarding/index" />
      </Stack>
    </ThemeProvider>
  )
}

export default _layout