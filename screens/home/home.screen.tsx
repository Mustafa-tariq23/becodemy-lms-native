import { View, Text, Dimensions, Button, Modal, TouchableOpacity, PermissionsAndroid } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/theme.context';
import WelcomeHeader from '../../components/home/welcomeHeader';
import HomeBanner from '@/components/home/homeBanner';
import { ScrollView } from 'react-native';
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant';
import { verticalScale } from 'react-native-size-matters';
import GradientText from '@/components/common/GradientText';
import SkeltonLoader from '@/utils/skelton'
import useLocation from '@/hooks/location/useLocation';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  let [loading, setLoading] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  let { errorMsg, longitude, latitude } = useLocation();


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
          <Text>location</Text>
        </View>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeBanner />
        <View style={{ marginHorizontal: windowWidth(20), marginTop: verticalScale(-25) }}>
          <View style={{ flexDirection: "row", marginTop: windowHeight(5) }}>
            <Text style={{ fontSize: fontSizes.FONT35 }} className={theme.dark ? 'text-white' : 'text-black'}>
              Popular
            </Text>
            <GradientText text=" Courses" styles={{ fontSize: fontSizes.FONT35, fontFamily: 'Poppins_500Medium' }} />
          </View>
          <View className='flex-row items-center'>
            <View className='bg-[#12BB70] w-4 h-4 rounded-full '>
            </View>
            <Text style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: fontSizes.FONT18,
              color: theme.dark ? '#FFFFFF' : '#000000',
              paddingLeft: windowWidth(5)
            }}>
              Our comprehensive Project based courses
            </Text>
          </View>
        </View>

        {
          loading ? (
            <>
              <SkeltonLoader />
              <SkeltonLoader />
            </>
          ) : (
            <>
              <View>

              </View>
            </>
          )
        }

      </ScrollView>
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


//  <Text className='text-black'>index</Text>
//       <Button title="Logout" onPress={handleLogout} />