import { View, Text, Dimensions } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').height}}>
      <Text className='text-black'>index</Text>
    </View>
  )
}

export default index