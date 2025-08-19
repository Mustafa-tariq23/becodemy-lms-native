import React from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { ThemeProvider } from '@/context/theme.context'
import { AuthProvider } from '@/context/auth.context'
import MainNavigation from '@/components/navigation/MainNavigation'
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
        <AuthProvider>
          <ThemeProvider>
            <MainNavigation />
          </ThemeProvider>
        </AuthProvider>
      </GestureHandlerRootView>
  )
}

export default _layout
