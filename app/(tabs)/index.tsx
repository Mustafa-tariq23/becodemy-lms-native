import { View, Text, Dimensions, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

const index = () => {
  const router = useRouter();
  
  const handleLogout = async () => {
    // Clear all stored credentials
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("name");
    await SecureStore.deleteItemAsync("email");
    await SecureStore.deleteItemAsync("avatar");
    
    router.push('/onboarding');
  };
  
  return (
    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').height}}>
      <Text className='text-black'>index</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}

export default index