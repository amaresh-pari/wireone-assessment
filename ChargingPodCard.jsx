import { StyleSheet, Text, View, Image } from "react-native";
import { useState, useEffect } from "react";
import { chargerTypes, powerOutput } from "./chargerTypes";

const ChargingPodCard = ({ chargingPod }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrap}>
        <View style={{marginRight: 10}}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
            {chargingPod.name}
          </Text>
          <View style={styles.address}>
            <Text style={{ marginRight: 10, color: "#aeaeae" }}>
              {chargingPod.address}
            </Text>
            <Text style={{ color: "#e03a6f" }}>
              {(chargingPod.distance / 1000).toFixed(1)} Km
            </Text>
          </View>
        </View>
        <Image
          source={require("./assets/cursor.png")}
          style={{ width: 20, height: 20 }}
        />
      </View>

      <Text style={styles.connectors}>SUPPORTED CONNECTORS</Text>

      {chargingPod.connector_types.map((connector, index) => (
        <View style={styles.charger}>
          <View style={styles.chargerType}>
            <Image
              source={require("./assets/charger.png")}
              style={{ width: 30, height: 30 }}
            />
            <View>
              <Text style={{ color: "#ffff" }}>
                {chargerTypes[connector.split("-")[0]]}
              </Text>
              <Text style={{ color: "#44d7b6" }}>
                {powerOutput[connector.split("-")[0]]}
              </Text>
            </View>
          </View>
          <Text style={{ color: "#fff" }}>X{connector.split("-")[1]}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1d1e27",
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 300,
    height: 250,
  },
  headerWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  address: {
    flexDirection: "row",
  },
  name: {
    textTransform: "uppercase",
    color: "#fff",
  },
  connectors: {
    marginTop: 20,
    marginBottom: 20,
    color: "#44d7b6",
  },
  charger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  chargerType: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ChargingPodCard;
