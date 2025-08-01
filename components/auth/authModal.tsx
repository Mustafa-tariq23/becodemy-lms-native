import { View, Text, Pressable, Image, Platform } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant'
import { GoogleSignin } from "@react-native-google-signin/google-signin"
const authModal = () => {

  const configureGoogleSignIn = () => {
    if (Platform.OS === 'ios') {
      GoogleSignin.configure({
        iosClientId: process.env.EXPO_PUBLIC_IOS_GOOGLE_API_KEY,
      })
    }
  }

    const googleSignIn = () => {
      // Implement Google Sign-In logic here
    }

    return (
      <BlurView className="flex-1 justify-center items-center">
        <View style={{
          width: windowWidth(420),
          marginHorizontal: windowWidth(20),
          backgroundColor: "#fff",
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          padding: windowWidth(20),
        }}>
          <View style={{
            paddingVertical: windowHeight(20),
            alignItems: "center",
          }}>
            <Text style={{
              fontSize: fontSizes.FONT35,
              fontFamily: "Poppins_700Bold",
              textAlign: "center",
            }}>
              Be One of Us
            </Text>
            <Text style={{
              fontSize: fontSizes.FONT15,
              fontFamily: "Poppins_400Regular",
              marginTop: windowHeight(10),
              textAlign: "center",
              paddingHorizontal: windowWidth(10),
            }}>
              Join our community and start your learning journey today!
            </Text>
          </View>

          <View style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: windowWidth(40),
            alignItems: "center",
            width: "100%",
            marginTop: windowHeight(20),
            paddingBottom: windowHeight(20),
          }}>
            <Pressable style={{
              padding: windowWidth(10),
              borderRadius: 15,
              backgroundColor: "#f8f9fa",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
              <Image source={require('@/assets/images/onboarding/google.png')} style={{
                width: windowWidth(40),
                height: windowHeight(40),
                resizeMode: "contain",
              }} />
            </Pressable>

            <Pressable onPress={() => googleSignIn()} style={{
              padding: windowWidth(10),
              borderRadius: 15,
              backgroundColor: "#f8f9fa",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
              <Image source={require('@/assets/images/onboarding/github.png')} style={{
                width: windowWidth(40),
                height: windowHeight(40),
                resizeMode: "contain",
              }} />
            </Pressable>
          </View>
        </View>
      </BlurView>
    )
  }

  export default authModal