import React, {useEffect, useState, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
export const setAuthorizationHeader = async () => {
  const token = await SecureStore.getItemAsync("accessToken");

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

export default function useUser() {
  const [user, setUser] = useState<UserType>();
  const [loading, setLoading] = useState(true);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      
      // Handle guest users
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
      
      // Handle authenticated users
      await setAuthorizationHeader();
      const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URI}/me`);
      setUser(response.data.user);
      await SecureStore.setItemAsync("name", response.data.user.name);
      await SecureStore.setItemAsync("email", response.data.user.email);
      await SecureStore.setItemAsync("avatar", response.data.user.avatar);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    fetchUserData();

    return () => {
      setShouldRefetch(false);
    }
  }, [fetchUserData, shouldRefetch])

  const refetch = () => {
    setShouldRefetch(true);
  }

  return {
    user,
    loading,
    refetch,
  };
}