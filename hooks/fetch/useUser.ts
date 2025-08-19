import React, {useEffect, useState, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { useAuth } from "@/context/auth.context";

export const setAuthorizationHeader = async () => {
  const token = await SecureStore.getItemAsync("accessToken");

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

export default function useUser() {
  const { user: authUser, isAnonymous } = useAuth();
  const [user, setUser] = useState<UserType>();
  const [loading, setLoading] = useState(true);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      // If user is authenticated with Firebase, create user object from Firebase data
      if (authUser) {
        if (isAnonymous) {
          // Handle anonymous Firebase users
          const guestUser: UserType = {
            id: authUser.uid,
            name: "Guest User",
            email: "guest@example.com",
            password: "",
            phone_number: "",
            avatar: "",
            stripeCustomerId: "",
            githubUserName: "",
            role: "guest",
            verified: false,
            reviews: [],
            orders: [],
            reviewsReplies: [],
            Notification: [],
            Tickets: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          setUser(guestUser);
          setLoading(false);
          return;
        } else {
          // Handle authenticated Firebase users
          const firebaseUser: UserType = {
            id: authUser.uid,
            name: authUser.displayName || authUser.email?.split('@')[0] || "User",
            email: authUser.email || "",
            password: "",
            phone_number: authUser.phoneNumber || "",
            avatar: authUser.photoURL || "",
            stripeCustomerId: "",
            githubUserName: "",
            role: "user",
            verified: authUser.emailVerified,
            reviews: [],
            orders: [],
            reviewsReplies: [],
            Notification: [],
            Tickets: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          setUser(firebaseUser);
          setLoading(false);
          
          // Try to sync with backend server (optional)
          try {
            await setAuthorizationHeader();
            const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URI}/me`);
            if (response.data.user) {
              setUser(response.data.user);
            }
          } catch (serverError) {
            console.log("Backend server not available, using Firebase user data");
            // Continue with Firebase user data - this is not an error
          }
          return;
        }
      }

      // Fallback: Check for legacy token-based auth
      const token = await SecureStore.getItemAsync("accessToken");
      
      // Handle legacy guest users
      if (token === "guest_token") {
        const guestUser: UserType = {
          id: "guest",
          name: await SecureStore.getItemAsync("name") || "Guest User",
          email: await SecureStore.getItemAsync("email") || "guest@example.com",
          password: "",
          phone_number: "",
          avatar: await SecureStore.getItemAsync("avatar") || "",
          stripeCustomerId: "",
          githubUserName: "",
          role: "guest",
          verified: false,
          reviews: [],
          orders: [],
          reviewsReplies: [],
          Notification: [],
          Tickets: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setUser(guestUser);
        setLoading(false);
        return;
      }
      
      // Handle legacy authenticated users
      if (token && token !== "guest_token") {
        await setAuthorizationHeader();
        const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URI}/me`);
        setUser(response.data.user);
        await SecureStore.setItemAsync("name", response.data.user.name);
        await SecureStore.setItemAsync("email", response.data.user.email);
        await SecureStore.setItemAsync("avatar", response.data.user.avatar);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Set a default user if everything fails and we have an auth user
      if (authUser) {
        const fallbackUser: UserType = {
          id: authUser.uid,
          name: authUser.displayName || "User",
          email: authUser.email || "",
          password: "",
          phone_number: "",
          avatar: "",
          stripeCustomerId: "",
          githubUserName: "",
          role: isAnonymous ? "guest" : "user",
          verified: authUser.emailVerified,
          reviews: [],
          orders: [],
          reviewsReplies: [],
          Notification: [],
          Tickets: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setUser(fallbackUser);
      }
    } finally {
      setLoading(false);
    }
  }, [authUser, isAnonymous])

  useEffect(() => {
    fetchUserData();

    return () => {
      setShouldRefetch(false);
    }
  }, [fetchUserData, shouldRefetch, authUser])

  const refetch = () => {
    setShouldRefetch(true);
  }

  return {
    user,
    loading,
    refetch,
  };
}