import { View, SafeAreaView} from 'react-native'
import React from 'react'
import { useTheme } from '@/context/theme.context'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { videoLessonsData } from '@/configs/constants'
import SourceCodeCard from '@/components/cards/SourceCodeCard'

const resourcesScreen = () => {
  const { theme } = useTheme()
  const bottomTabBarHeight = useBottomTabBarHeight()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.dark ? '#131313' : 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='pb-[bottomTabBarHeight - 20]]'>
          <FlatList 
            data={videoLessonsData} 
            renderItem={({ item }) => (
              <SourceCodeCard item={item} />
            )}
            showsVerticalScrollIndicator={false}
            className='pt-[verticalScale(10)]'
          />
        </View>
      </ScrollView>
    </SafeAreaView> 
  )
}

export default resourcesScreen