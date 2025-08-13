import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import useLocation from '@/hooks/location/useLocation';

export default function App() {
  const { longitude, latitude } = useLocation();
  const router = useRouter();

  const [mapRegion, setMapRegion] = React.useState({
    latitude: latitude ?? 31.28174,
    longitude: longitude ?? 74.161894,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View>
      <SafeAreaView>
        <View className='items-center justify-start p-2 flex-row gap-0'>
          <MaterialIcons name="arrow-left" size={24} />
          <Button title="Back" onPress={() => router.back()} />
        </View>
        <MapView
          style={{ width: '100%', height: '100%' }}
          region={mapRegion}
          onRegionChangeComplete={setMapRegion}
        >
          {(typeof mapRegion.latitude === 'number' && typeof mapRegion.longitude === 'number') && (
            <Marker coordinate={{ latitude: mapRegion.latitude, longitude: mapRegion.longitude }} />
          )}
        </MapView>
      </SafeAreaView>
    </View>
  );
}

