import React from 'react'
import { Stack } from 'expo-router'
import { ThemeProvider } from '@/context/theme.context'

const _layout = () => {
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