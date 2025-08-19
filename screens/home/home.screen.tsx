import { View, Text, Dimensions, Button, Modal, TouchableOpacity, PermissionsAndroid, Image, FlatList } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/theme.context';
import WelcomeHeader from '../../components/home/welcomeHeader';
import HomeBanner from '@/components/home/homeBanner';
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant';
import { verticalScale } from 'react-native-size-matters';
import GradientText from '@/components/common/GradientText';
import SkeltonLoader from '@/utils/skelton'
import useLocation from '@/hooks/location/useLocation';
import { MaterialIcons } from '@expo/vector-icons';
import { Background } from '@react-navigation/elements';
import { videoLessonsData } from '@/configs/constants';
import useUserData from '@/hooks/useUserData';
import * as WebBrowser from 'expo-web-browser';

const HomeScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  let [loading, setLoading] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  let { errorMsg, longitude, latitude } = useLocation();
  const { name } = useUserData();

  const handleOpenVideo = React.useCallback(async (url: string) => {
    try {
      await WebBrowser.openBrowserAsync(url, {
        enableBarCollapsing: true,
        showTitle: true,
        toolbarColor: theme.dark ? '#1E1E1E' : '#ffffff',
        secondaryToolbarColor: theme.dark ? '#121212' : '#f2f2f2'
      });
    } catch (e) {
      console.warn('Failed to open browser', e);
    }
  }, [theme.dark]);

  React.useEffect(() => {
    // When user data (name) is available (or determined for guest) set loading false.
    if (name !== '') {
      setLoading(false);
    }
  }, [name]);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'Allow access to your location ' +
            'so we can suggest you amazing courses according to your geolocation.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <LinearGradient colors={theme.dark ? ['#180D41', '#2A2D32', '#131313'] : ['#FFFFFF', '#F7F7F7']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{ height: Dimensions.get('window').height, justifyContent: "flex-start", backgroundColor: theme.dark ? "#101010" : "#ffffff" }} >
      <WelcomeHeader />
      <TouchableOpacity onPress={() => router.push('/(routes)/location')}>
        <View className='flex-row items-center justify-center gap-2 p-2'>
          <MaterialIcons name="location-on" size={24} color="black" />
          <Text>Location</Text>
        </View>
      </TouchableOpacity>

      {(
        <FlatList
          data={loading ? [] : videoLessonsData.slice(0,6)}
          keyExtractor={(item, idx) => item.url + idx}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: verticalScale(40) }}
          ListHeaderComponent={(
            <View>
              <HomeBanner />
              <View style={{ marginHorizontal: windowWidth(20), marginTop: verticalScale(-25) }}>
                <View style={{ flexDirection: 'row', marginTop: windowHeight(5) }}>
                  <Text style={{ fontSize: fontSizes.FONT35 }} className={theme.dark ? 'text-white' : 'text-black'}>
                    Popular
                  </Text>
                  <GradientText text=" Courses" styles={{ fontSize: fontSizes.FONT35, fontFamily: 'Poppins_500Medium' }} />
                </View>
                <View className='flex-row items-center'>
                  <View className='bg-[#12BB70] w-4 h-4 rounded-full ' />
                  <Text
                    style={{
                      fontFamily: 'Poppins_400Regular',
                      fontSize: fontSizes.FONT18,
                      color: theme.dark ? '#FFFFFF' : '#000000',
                      paddingLeft: windowWidth(5),
                    }}
                  >
                    Our comprehensive Project based courses
                  </Text>
                </View>
                {loading && (
                  <View style={{ marginTop: verticalScale(10) }}>
                    <SkeltonLoader />
                    <SkeltonLoader />
                  </View>
                )}
              </View>
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ marginHorizontal: windowWidth(20), marginTop: verticalScale(14), marginBottom: verticalScale(20) }}
              onPress={() => handleOpenVideo(item.url)}
              activeOpacity={0.85}
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
                  style={{ width: '100%', height: verticalScale(160) }}
                  resizeMode='cover'
                />
                <View style={{ padding: 12 }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: fontSizes.FONT14,
                      fontFamily: 'Poppins_500Medium',
                      color: theme.dark ? '#FFFFFF' : '#1A1A1A',
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <Modal visible={openModal} animationType="slide">
        <TouchableOpacity>
          <Text>Allow to access Location.</Text>
          <Button title="Allow" onPress={() => { }} />
        </TouchableOpacity>
      </Modal>
    </LinearGradient>
  )
}

export default HomeScreen;