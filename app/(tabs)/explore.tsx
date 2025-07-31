import { View, Text, Dimensions } from 'react-native'
import React from 'react'

const explore = () => {
  return (
    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').height }}>
      <Text className='text-black'>explore</Text>
    </View>
  )
}

export default explore