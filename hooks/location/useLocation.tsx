import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import * as Location from 'expo-location';

const useLocation = () => {
  const [errorMsg, setErrorMsg] = React.useState("");
  const [longitude, setLongitude] = React.useState<number>();
  const [latitude, setLatitude] = React.useState<number>();

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return
    }

    let { coords } = await Location.getCurrentPositionAsync({});

    if (coords) {
      const { longitude, latitude } = coords;
      console.log("Longitude: ", longitude, "Latitude: ", latitude);
      setLongitude(longitude);
      setLatitude(latitude);

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      })

      console.log("Location details: ", response);
    }
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  return { errorMsg, longitude, latitude };
}

export default useLocation