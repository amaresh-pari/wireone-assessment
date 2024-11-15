import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import chagingPods from './chargingPodLocations.json'

const Home = () => {
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    try {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData);
    } catch (error) {
      console.log("Error fetching location");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !location || Object.keys(location).length === 0) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Marker"
        >
          <Image
            source={require("./assets/navigation.png")}
            style={{ width: 40, height: 40 }}
            resizeMode="contain"
          />
        </Marker>

        {chagingPods.chargers.map((charger, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(charger.latitude),
              longitude: parseFloat(charger.longitude),
            }}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    height: 40,
    width: 40,
  },
});

export default Home;
