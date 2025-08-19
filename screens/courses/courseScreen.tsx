import { View, Text, StatusBar, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@/context/theme.context'
import { SafeAreaView } from 'react-native-safe-area-context'
import GradientText from '@/components/common/GradientText'
import { fontSizes } from '@/themes/app.constant'
import SkeltonLoader from '@/utils/skelton'
import { CoursesData } from '@/configs/constants'
import * as WebBrowser from 'expo-web-browser'

const courseScreen = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600); // simulate fetch delay
    return () => clearTimeout(t);
  }, []);

  const openVideo = async (url: string) => {
    try {
      await WebBrowser.openBrowserAsync(url, {
        toolbarColor: theme.dark ? '#1E1E1E' : '#ffffff',
        enableBarCollapsing: true,
        showTitle: true
      });
    } catch (e) {
      console.warn('Open video failed', e);
    }
  };

  const header = (
    <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
      <StatusBar barStyle={!theme.dark ? 'dark-content' : 'light-content'} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: fontSizes.FONT35 }} className={theme.dark ? 'text-white' : 'text-black'}>
          Popular
        </Text>
        <GradientText
          text=" Courses"
          styles={{ fontSize: fontSizes.FONT35, fontFamily: 'Poppins_500Medium' }}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
        <View className='bg-[#12BB70] w-4 h-4 rounded-full' />
        <Text className='font-semibold' style={{ color: theme.dark ? '#FFFFFF' : '#000000' }}>
          Our comprehensive courses tailored for you.
        </Text>
      </View>
      {loading && (
        <View style={{ marginTop: 12 }}>
          <SkeltonLoader />
          <SkeltonLoader />
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className={`flex-1 ${theme.dark ? 'bg-[#131313]' : 'bg-white'} mb-8 `}>
      <FlatList
        data={loading ? [] : CoursesData}
        keyExtractor={(item, idx) => item.url + idx}
        ListHeaderComponent={header}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openVideo(item.url)}
            activeOpacity={0.85}
            style={{ marginHorizontal: 16, marginTop: 14 }}
          >
            <View
              style={{
                backgroundColor: theme.dark ? '#1E1E1E' : '#FFFFFF',
                borderRadius: 16,
                overflow: 'hidden',
                elevation: 3,
                shadowColor: '#000',
                shadowOpacity: 0.15,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
              }}
            >
              <Image
                source={{ uri: item.thumbnail }}
                style={{ width: '100%', height: 170 }}
                resizeMode='cover'
              />
              <View style={{ padding: 12 }}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: fontSizes.FONT14,
                    fontFamily: 'Poppins_500Medium',
                    color: theme.dark ? '#FFFFFF' : '#1A1A1A'
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default courseScreen