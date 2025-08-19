import { View, Text, Pressable, Image, Platform } from "react-native";
import React, { useEffect } from "react";
import { BlurView } from "expo-blur";
import { fontSizes, windowHeight, windowWidth } from "@/themes/app.constant";
import { useAuth } from "@/context/auth.context";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import JWT from "expo-jwt";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Ionicons } from "@expo/vector-icons";

export default function AuthModal({
  setModalVisible,
}: {
  setModalVisible: (modal: boolean) => void;
}) {
  const { loginAsGuest } = useAuth();
  // const configureGoogleSignIn = () => {
  //   if (Platform.OS === "ios") {
  //     GoogleSignin.configure({
  //       iosClientId: process.env.EXPO_PUBLIC_IOS_GOOGLE_API_KEY,
  //     });
  //   } else {
  //     GoogleSignin.configure({
  //       webClientId:
  //         "500604689956-74tau857bhoviihkt0jsqitldq4tsjlf.apps.googleusercontent.com",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   configureGoogleSignIn();
  // }, []);

  // github auth start
  const githubAuthEndpoints = {
    authorizationEndpoint: "https://github.com/login/oauth/authorize",
    tokenEndpoint: "https://github.com/login/oauth/access_token",
    revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
  };

  const [request, response] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID!,
      clientSecret: process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET!,
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "becodemy",
      }),
    },
    githubAuthEndpoints
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      fetchAccessToken(code);
    }
  }, []);

  const handleGithubLogin = async () => {
    const result = await WebBrowser.openAuthSessionAsync(
      request?.url!,
      makeRedirectUri({
        scheme: "lms", 
      })
    );

    if (result.type === "success" && result.url) {
      const urlParams = new URLSearchParams(result.url.split("?")[1]);
      const code: any = urlParams.get("code");
      fetchAccessToken(code);
    }
  };

  const fetchAccessToken = async (code: string) => {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `client_id=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}&client_secret=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET}&code=${code}`,
      }
    );
    const tokenData = await tokenResponse.json();
    const access_token = tokenData.access_token;
    if (access_token) {
      fetchUserInfo(access_token);
    } else {
      console.error("Error fetching access token:", tokenData);
    }
  };

  const fetchUserInfo = async (token: string) => {
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = await userResponse.json();
    await authHandler({
      name: userData.name!,
      email: userData.email!,
      avatar: userData.avatar_url!,
    });
  };
  // github auth end

  // const googleSignIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     if (userInfo.data?.user) {
  //       await authHandler({
  //         name: userInfo.data.user.name!,
  //         email: userInfo.data.user.email!,
  //         avatar: userInfo.data.user.photo!,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const authHandler = async ({
    name,
    email,
    avatar,
  }: {
    name: string;
    email: string;
    avatar: string;
  }) => {
    const user = {
      name,
      email,
      avatar,
    };
    const token = JWT.encode(
      {
        ...user,
      },
      process.env.EXPO_PUBLIC_JWT_SECRET_KEY!
    );
    const res = await axios.post(
      `${process.env.EXPO_PUBLIC_SERVER_URI}/login`,
      {
        signedToken: token,
      }
    );
    await SecureStore.setItemAsync("accessToken", res.data.accessToken);
    await SecureStore.setItemAsync("name", name);
    await SecureStore.setItemAsync("email", email);
    await SecureStore.setItemAsync("avatar", avatar);

    setModalVisible(false);
    router.push("/(tabs)");
  };

  const guestLogin = async () => {
    try {
      await loginAsGuest();
      setModalVisible(false);
      router.push("/(tabs)");
    } catch (error) {
      console.error("Error during guest login:", error);
    }
  };

  const handleEmailLogin = () => {
    setModalVisible(false);
    router.push("/(auth)/login");
  };

  const handleEmailSignup = () => {
    setModalVisible(false);
    router.push("/(auth)/signup");
  };

  return (
    <BlurView
      style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: windowWidth(30) }}  className="gap-4 px-12"
    >
      <Pressable
        style={{
          width: windowWidth(420),
          height: windowHeight(480),
          marginHorizontal: windowWidth(50),
          backgroundColor: "#fff",
          borderRadius: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
        className="px-8"
      >
        <Text
          style={{
            fontSize: fontSizes.FONT32,
            fontFamily: "Poppins_700Bold",
            textAlign: "center",
          }}
        >
          Be one of us!
        </Text>
        <Text
          style={{
            fontSize: fontSizes.FONT17,
            paddingTop: windowHeight(5),
            fontFamily: "Poppins_300Light",
            textAlign: "center",
          }}
        >
          Join us and start your journey with us.
        </Text>

        {/* Email/Password Auth Buttons */}
        <View style={{ paddingVertical: windowHeight(15), gap: windowHeight(10) }}>
          <Pressable
            onPress={handleEmailLogin}
            style={{
              paddingHorizontal: windowWidth(30),
              paddingVertical: windowHeight(12),
              backgroundColor: "#3b82f6",
              borderRadius: 25,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: windowWidth(10),
            }}
          >
            <Ionicons name="mail-outline" size={20} color="#fff" />
            <Text
              style={{
                fontSize: fontSizes.FONT16,
                fontFamily: "Poppins_500Medium",
                color: "#fff",
                textAlign: "center",
              }}
            >
              Sign In with Email
            </Text>
          </Pressable>

          <Pressable
            onPress={handleEmailSignup}
            style={{
              paddingHorizontal: windowWidth(30),
              paddingVertical: windowHeight(12),
              backgroundColor: "#fff",
              borderRadius: 25,
              borderWidth: 2,
              borderColor: "#3b82f6",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: windowWidth(10),
            }}
          >
            <Ionicons name="person-add-outline" size={20} color="#3b82f6" />
            <Text
              style={{
                fontSize: fontSizes.FONT16,
                fontFamily: "Poppins_500Medium",
                color: "#3b82f6",
                textAlign: "center",
              }}
            >
              Create Account
            </Text>
          </Pressable>
        </View>

        {/* Divider */}
        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: windowHeight(5) }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "#ddd" }} />
          <Text style={{ marginHorizontal: 10, color: "#666", fontSize: fontSizes.FONT14 }}>or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#ddd" }} />
        </View>

        {/* Social Auth */}
        <View
          style={{
            paddingVertical: windowHeight(5),
            flexDirection: "row",
            gap: windowWidth(20),
            justifyContent: "center",
          }}
        >
          {/* <Pressable onPress={googleSignIn}>
            <Image
              source={require("@/assets/images/onboarding/google.png")}
              style={{
                width: windowWidth(40),
                height: windowHeight(40),
                resizeMode: "contain",
              }}
            />
          </Pressable> */}
          {/* <Pressable onPress={() => handleGithubLogin()}>
            <Image
              source={require("@/assets/images/onboarding/github.png")}
              style={{
                width: windowWidth(40),
                height: windowHeight(40),
                resizeMode: "contain",
              }}
            />
            <Text>Sign in with GitHub</Text>
          </Pressable> */}
          {/* <Pressable>
            <Image
              source={require("@/assets/images/onboarding/apple.png")}
              style={{
                width: windowWidth(40),
                height: windowHeight(40),
                resizeMode: "contain",
              }}
            />
          </Pressable> */}
        </View>
        
        <Pressable
          onPress={guestLogin}
          style={{
            marginTop: windowHeight(10),
            paddingHorizontal: windowWidth(30),
            paddingVertical: windowHeight(12),
            backgroundColor: "#f3f4f6",
            borderRadius: 25,
            borderWidth: 1,
            borderColor: "#ddd",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: windowWidth(10),
          }}
        >
          <Ionicons name="person-outline" size={20} color="#374151" />
          <Text
            style={{
              fontSize: fontSizes.FONT16,
              fontFamily: "Poppins_500Medium",
              color: "#374151",
              textAlign: "center",
            }}
          >
            Continue as Guest
          </Text>
        </Pressable>
      </Pressable>
    </BlurView>
  );
}
