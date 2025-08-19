import { View, Text, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { Redirect } from 'expo-router'
import messaging from '@react-native-firebase/messaging'
import analytics from '@react-native-firebase/analytics'
import inAppMessaging from '@react-native-firebase/in-app-messaging'
import installations from '@react-native-firebase/installations';
import notifee, { AndroidImportance, EventType, AuthorizationStatus } from '@notifee/react-native'
import '../global.css'

const Index = () => {
  const [loggedInUser, setLoggedInUser] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // Log app open for analytics/In-App Messaging targeting
  // useEffect(() => {
  //   analytics().logAppOpen().catch(() => {})
  // }, [])


  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    if (enabled) console.log('Authorization status:', authStatus)
  }

  // notifee notification

  useEffect(() => {
    async function requestPermission() {
      const settings = await notifee.requestPermission();

      if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
        console.log('✅ Notifications authorized:', settings);
      } else {
        console.log('❌ User declined notifications');
      }
    }

    requestPermission();
  }, []);

  useEffect(() => {
    async function onDisplayNotification() {
      await notifee.displayNotification({
        title: 'Hello 👋',
        body: 'This is an instant local notification',
        android: {
          channelId: 'default',
          pressAction: {
            id: 'default',
          },
        },
      });
    }
  }, []);

  // Enable and unsuppress In-App Messaging immediately
  useEffect(() => {
    ; (async () => {
      try {
        // Ensure automatic data collection (needed for FIAM eligibility/analytics)
        await inAppMessaging().setAutomaticDataCollectionEnabled(true)
        // Make sure messages are not suppressed
        await inAppMessaging().setMessagesDisplaySuppressed(false)
        // (Optional) Trigger a custom event you can target in the Firebase console
        await inAppMessaging().triggerEvent('app_start')
      } catch (e) {
        console.warn('In-App Messaging init failed', e)
      }
    })()
  }, [])


  useEffect(() => {
    let foregroundUnsubscribe: (() => void) | undefined

      ; (async () => {
        try {
          // iOS notification permission (Firebase messaging covers Android)
          if (Platform.OS === 'ios') {
            try { await notifee.requestPermission(); } catch { }
          }
          // Ensure Android channel exists (id must match when displaying)
          if (Platform.OS === 'android') {
            await notifee.createChannel({
              id: 'default',
              name: 'Default',
              importance: AndroidImportance.HIGH,
            })
          }
          await requestUserPermission()
          const token = await messaging().getToken()
          console.log('FCM Token:', token)

          const id = await installations().getId();
          console.log('Installation ID:', id);
          return id;
        } catch (e) {
          console.error('Error getting FCM token:', e)
        }
      })()

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Initial notification:', remoteMessage.notification)
        }
      })
      .catch(e => console.error('Error getting initial notification:', e))

    const openedSub = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Opened from background:', remoteMessage.notification)
    })

    // Background handler moved to root index.js so it registers before app startup

    foregroundUnsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message:', remoteMessage)
      try {
        const { notification, data } = remoteMessage
        // Prefer notification payload values, fallback to data keys
        const rawTitle = notification?.title || (data?.title as any) || 'New notification'
        const rawBody = notification?.body || (data?.body as any) || undefined
        const title: string = typeof rawTitle === 'string' ? rawTitle : 'New notification'
        const body: string | undefined = typeof rawBody === 'string' ? rawBody : undefined
        await notifee.displayNotification({
          title,
          body,
          data: (data as any) || undefined,
          android: {
            channelId: 'default',
            // pressAction lets the notification open the app when tapped
            pressAction: { id: 'default' },
            importance: AndroidImportance.HIGH,
          },
        })
      } catch (e) {
        console.warn('Failed to display foreground notification', e)
      }
    })

    // Optional: respond to Notifee events (e.g., user taps while foreground)
    const notifeeSub = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        console.log('Notification press (foreground):', detail.notification?.data)
        // TODO: Navigate based on detail.notification?.data if needed
      }
    })

    return () => {
      foregroundUnsubscribe && foregroundUnsubscribe()
      openedSub() // unsubscribe
      notifeeSub()
    }
  }, [])

  useEffect(() => {
    ; (async () => {
      try {
        const token = await SecureStore.getItemAsync('accessToken')
        setLoggedInUser(!!token)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  if (isLoading) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text className='text-black'>Loading...</Text>
      </View>
    )
  }

  return <Redirect href={!loggedInUser ? '/(routes)/onboarding' : '/(tabs)'} />
}

export default Index