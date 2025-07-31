import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { Redirect } from 'expo-router'

import '../global.css'

const index = () => {
  const [loggedInUser, setLoggedInUser] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const subscription = async () => {
      const token = SecureStore.getItem("accessToken");
      setLoggedInUser(token ? true : false);
      setIsLoading(false);
    }

    subscription();
  }, [])

  return (
    <>
      {
        isLoading ? (
          <View className='flex-1 items-center justify-center'>
            <Text className='text-black'>Loading...</Text>
          </View>
            ) : (
            <Redirect href={!loggedInUser ? "/(routes)/onboarding" : "/(tabs)"} />
            )
      }
          </>
        )
}

      export default index