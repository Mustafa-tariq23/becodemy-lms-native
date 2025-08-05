import { View, Text, Pressable, Image, Platform, Alert } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { router } from 'expo-router'

WebBrowser.maybeCompleteAuthSession()

const authModal = () => {

  const guestSignIn = () => {
    // Navigate to home page as guest user
    router.replace('/(tabs)')
  }

  const googleSignIn = async () => {
    try {
      console.log('Google Sign-In pressed')
      
      // Google OAuth 2.0 endpoints
      const discovery = {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://www.googleapis.com/oauth2/v4/token',
        revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
      }

      // Get the appropriate client ID for the platform
      const clientId = Platform.OS === 'ios' 
        ? process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID
        : process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID

      if (!clientId) { 
        Alert.alert('Configuration Error', 'Google OAuth client ID not found. Please check your environment variables.')
        return
      }

            // Create the authentication request
      const request = new AuthSession.AuthRequest({
        clientId: clientId,
        scopes: ['openid', 'profile', 'email'],
        redirectUri: AuthSession.makeRedirectUri({
          scheme: 'lms'
        }),
        responseType: AuthSession.ResponseType.Code,
        extraParams: {
          access_type: 'offline',
        },
      })

      console.log('Google OAuth - Using redirect URI:', request.redirectUri)
      console.log('Google OAuth - Using client ID:', clientId)

      // Prompt for authentication
      const result = await request.promptAsync(discovery)

      if (result.type === 'success') {
        console.log('Google OAuth Success:', result)
        
        // Exchange the authorization code for tokens
        const tokenResult = await AuthSession.exchangeCodeAsync(
          {
            clientId: clientId,
            code: result.params.code,
            extraParams: request.codeVerifier ? {
              code_verifier: request.codeVerifier,
            } : {},
            redirectUri: AuthSession.makeRedirectUri({
              scheme: 'lms'
            }),
          },
          discovery
        )

        console.log('Token exchange result:', tokenResult)

        // Get user info
        if (tokenResult.accessToken) {
          const userInfoResponse = await fetch(
            `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenResult.accessToken}`
          )
          const userInfo = await userInfoResponse.json()
          console.log('User info:', userInfo)
          
          Alert.alert(
            'Sign-in Successful!', 
            `Welcome ${userInfo.name || userInfo.email}!`,
            [
              {
                text: 'Continue',
                onPress: () => router.replace('/(tabs)')
              }
            ]
          )
          
          // Here you would typically:
          // 1. Send the tokens to your backend
          // 2. Store user session
          // 3. Navigate to the main app
        }
      } else if (result.type === 'cancel') {
        console.log('User cancelled the sign-in')
      } else {
        console.log('Sign-in error:', result)
        Alert.alert('Sign-in Error', 'Something went wrong. Please try again.')
      }
      
    } catch (error) {
      console.error('Google Sign-In error:', error)
      Alert.alert('Sign-in Error', 'Unable to sign in. Please try again.')
    }
  }

  const githubSignIn = async () => {
    try {
      console.log('GitHub Sign-In pressed')
      
      // GitHub OAuth 2.0 endpoints
      const discovery = {
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: 'https://github.com/login/oauth/access_token',
      }

      // You'll need to register your app with GitHub and get a client ID
      const clientId = process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID

      if (!clientId) {
        Alert.alert(
          'Configuration Needed', 
          'GitHub OAuth not configured. Please add EXPO_PUBLIC_GITHUB_CLIENT_ID to your environment variables.'
        )
        return
      }

      // Create redirect URI - use custom scheme for builds
      const redirectUri = AuthSession.makeRedirectUri({
        scheme: 'lms'
      })

      console.log('GitHub OAuth - Using redirect URI:', redirectUri)
      console.log('GitHub OAuth - Using client ID:', clientId)

      const request = new AuthSession.AuthRequest({
        clientId: clientId,
        scopes: ['user:email'],
        redirectUri: redirectUri,
        responseType: AuthSession.ResponseType.Code,
      })

      const result = await request.promptAsync(discovery)

      if (result.type === 'success') {
        console.log('GitHub OAuth Success:', result)
        Alert.alert(
          'GitHub Sign-in', 
          'GitHub authentication successful!',
          [
            {
              text: 'Continue',
              onPress: () => router.replace('/(tabs)')
            }
          ]
        )
        // Handle GitHub authentication success
      } else if (result.type === 'cancel') {
        console.log('User cancelled GitHub sign-in')
      } else {
        console.log('GitHub sign-in error:', result)
        Alert.alert('Sign-in Error', 'GitHub authentication failed.')
      }
      
    } catch (error) {
      console.error('GitHub Sign-In error:', error)
      Alert.alert('Sign-in Error', 'Unable to sign in with GitHub.')
    }
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
              <Image source={require('@/assets/images/onboarding/google.png')} style={{
                width: windowWidth(40),
                height: windowHeight(40),
                resizeMode: "contain",
              }} />
            </Pressable>

            <Pressable onPress={() => githubSignIn()} style={{
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

          {/* Guest Sign-in Option */}
          <View style={{
            width: "100%",
            marginTop: windowHeight(15),
            paddingBottom: windowHeight(10),
          }}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: windowHeight(15),
            }}>
              <View style={{
                flex: 1,
                height: 1,
                backgroundColor: "#e0e0e0",
              }} />
              <Text style={{
                marginHorizontal: windowWidth(15),
                fontSize: fontSizes.FONT12,
                color: "#666",
                fontFamily: "Poppins_400Regular",
              }}>
                or
              </Text>
              <View style={{
                flex: 1,
                height: 1,
                backgroundColor: "#e0e0e0",
              }} />
            </View>

            <Pressable 
              onPress={guestSignIn}
              style={{
                width: "100%",
                padding: windowWidth(15),
                borderRadius: 12,
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "#e0e0e0",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{
                fontSize: fontSizes.FONT16,
                fontFamily: "Poppins_500Medium",
                color: "#666",
              }}>
                Continue as Guest
              </Text>
            </Pressable>
          </View>
        </View>
      </BlurView>
    )
  }

  export default authModal