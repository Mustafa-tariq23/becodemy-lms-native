import React from 'react';
import MapView, { Marker, Region } from 'react-native-maps';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import useLocation from '@/hooks/location/useLocation';

export default function App() {
  const { longitude, latitude } = useLocation();
  const router = useRouter();

  // Region state (provide defaults so Region is always valid numbers)
  const [mapRegion, setMapRegion] = React.useState<Region>({
    latitude: latitude ?? 31.28174,
    longitude: longitude ?? 74.161894,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // Update map center once we obtain a fresh location from the hook
  React.useEffect(() => {
    if (typeof latitude === 'number' && typeof longitude === 'number') {
      setMapRegion(r => ({ ...r, latitude, longitude }));
    }
  }, [latitude, longitude]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header} className="flex-row items-center gap-1 p-2">
        <MaterialIcons name="arrow-left" size={24} onPress={() => router.back()} />
        <Button title="Back" onPress={() => router.back()} />
      </View>
      <MapView
        style={styles.map}
        region={mapRegion}
        onRegionChangeComplete={(region: Region) => setMapRegion(region)}
      >
        <Marker coordinate={{ latitude: mapRegion.latitude, longitude: mapRegion.longitude }} />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  map: { flex: 1 },
  header: { zIndex: 10, backgroundColor: 'transparent' },
});

