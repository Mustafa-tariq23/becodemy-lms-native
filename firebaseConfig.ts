// firebaseConfig.ts
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Basic runtime validation to aid debugging in dev builds.
const missingKeys = Object.entries(firebaseConfig)
  .filter(([, v]) => !v)
  .map(([k]) => k);
if (__DEV__ && missingKeys.length) {
  // eslint-disable-next-line no-console
  console.warn(
    `Firebase config missing environment values for: ${missingKeys.join(', ')}. ` +
      'Check your .env and that it is loaded (EXPO_PUBLIC_ prefix required).'
  );
}

// Initialize Firebase app (avoid re-initialization)
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Auth - Firebase Web SDK automatically handles persistence in React Native/Expo
const auth: Auth = getAuth(app);

export { app, auth };