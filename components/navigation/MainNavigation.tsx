import React from 'react';
import { Stack } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '@/context/auth.context';

export default function MainNavigation() {
  const { user, initializing } = useAuth();

  console.log('MainNavigation - initializing:', initializing, 'user:', user ? 'logged in' : 'not logged in');

  // Show loading while Firebase restores auth state
  if (initializing) {
    console.log('Showing loading screen - Firebase restoring auth state');
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (!user) {
    console.log('No user - showing onboarding');
    // User is not authenticated - show onboarding with auth options
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(routes)/onboarding/index" />
        <Stack.Screen name="(auth)" />
      </Stack>
    );
  }

  console.log('User authenticated - showing main app');
  // User is authenticated - show main app stack
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(routes)" />
      <Stack.Screen name="index" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
