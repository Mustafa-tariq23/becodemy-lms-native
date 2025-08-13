import { View, Text, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { useTheme } from '@/context/theme.context'
import { SafeAreaView } from 'react-native-safe-area-context'
import GradientText from '@/components/common/GradientText'
import { fontSizes } from '@/themes/app.constant'
import SkeltonLoader from '@/utils/skelton'

const courseScreen = () => {
  const { theme } = useTheme()
  return (
    <SafeAreaView className={`flex-1 ${theme.dark ? 'bg-[#131313]' : 'bg-white'} `}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar barStyle={!theme.dark ? 'dark-content' : 'light-content'} />
        <View className='mx-[windowWidth(20)]'>
          <View className='flex-row mt-[windowHeight] pl-3'>
            <Text style={{ fontSize: fontSizes.FONT35 }} className={theme.dark ? 'text-white' : 'text-black'}>
              Popular
            </Text>
            <GradientText
              text=" Courses"
              styles={{
                fontSize: fontSizes.FONT35,
                fontFamily: 'Poppins_500Medium',
              }}
            />
          </View>
          <View className='flex-row items-center w-full justify-start gap-2 pl-3'>
            <View className='bg-[#12BB70] w-4 h-4 rounded-full'>
            </View>
            <Text className='text-white text-center  font-semibold'>Our comprehensive courses tailored for you.</Text>
          </View>

          <View>
            <SkeltonLoader />
            <SkeltonLoader />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default courseScreen