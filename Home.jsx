import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import chagingPods from "./chargingPodLocations.json";
import ChargingPodCard from "./ChargingPodCard";
import { SearchBar } from "@rneui/themed";

const Home = () => {
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [snapshot, setSnapshot] = useState(null);
  const mapRef = useRef();

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

  const handleSearchChange = (e) => {
    setSearch(e);
  };

  const handleCaptureScreen = async () => {
    try {
      const _snapshot = await mapRef.current.takeSnapshot({
        format: "png",
        quality: 0.8,
        result: "file",
      });
      setSnapshot(_snapshot);
    } catch (error) {
      console.log("Error taking snapshot:", error);
    }
  };

  console.log(snapshot);

  if (loading || !location || Object.keys(location).length === 0) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
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

      <SafeAreaView style={styles.searchWrap}>
        <TouchableOpacity onPress={handleCaptureScreen}>
          <Image
            source={require("./assets/camera.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <SearchBar
          placeholder="Search for compatible chargers"
          lightTheme={false}
          onChangeText={handleSearchChange}
          value={search}
          containerStyle={{ width: "80%", padding: 0, borderRadius: 10 }}
          inputContainerStyle={{ height: 40, borderRadius: 10 }}
        />
      </SafeAreaView>

      <ScrollView style={styles.carousel} horizontal>
        {chagingPods.chargers.map((charger, index) => (
          <ChargingPodCard key={index} chargingPod={charger} />
        ))}
      </ScrollView>
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
  carousel: {
    position: "absolute",
    bottom: 0,
    paddingBottom: 20,
  },
  searchWrap: {
    position: "absolute",
    top: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
});

export default Home;
