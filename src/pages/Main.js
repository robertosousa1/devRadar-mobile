import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    }

    loadInitialPosition();
  }, [])

  if (!currentRegion) {
    return null;
  }

  return (
    <MapView initialRegion={currentRegion} style={styles.map}>
      <Marker coordinate={{latitude: -23.5669643, longitude: -46.8088636}}>
        <Image style={styles.avatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/17255765?s=400&u=3f3723d564c8ae3670f8931a73565c2120cdb3cd&v=4' }} />
        
        <Callout onPress={() => {
          navigation.navigate('Profile', { github_username: 'robertosousa1' })
        }} style={styles.callout}>
          <View>
            <Text style={styles.devName}>Roberto Alves</Text>
            <Text style={styles.devBio}>Engineer/Developer, pursuing a bachelor's in Software Engineering and Artificial Intelligence. Data Science enthusiastic.</Text>
            <Text style={styles.devTechs}>NodeJS, ReactJS, React Native</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  );
}




const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF'
  },
  callout: {
    width: 260,
  },
  devName: {
    fontWeight: 'bold',
  },
  devBio: {
    color: '#666',
    marginTop: 5,
  },
  devTechs: {
    marginTop: 5,
  },
})

export default Main;