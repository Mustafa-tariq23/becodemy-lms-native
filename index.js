// Root entry to register Firebase background handler before app mounts
import '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('BG message:', remoteMessage);
});

// Load Expo Router entrypoint
import 'expo-router/entry';
