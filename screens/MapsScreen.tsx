import React, { useState, useEffect } from 'react';
import { View, Button, Alert, StyleSheet, Pressable, Text } from 'react-native';
import MapView, { Polyline, LatLng, Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import AppButton from '../components/AppButton';
import { FontAwesome5 } from '@expo/vector-icons';



export default function MapsScreen() {
  const [path, setPath] = useState<LatLng[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [initialRegion, setInitialRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);



  const [userLocation, setUserLocation] = useState<LatLng | null>(null);


  const [locationSubscription, setLocationSubscription] = useState<Location.LocationSubscription | null>(null);



  useEffect(() => {
    const loadStoredPath = async () => {
      try {
        const storedPath = await AsyncStorage.getItem('route');
        console.log(storedPath)
        if (storedPath) {
          setPath(JSON.parse(storedPath));
        }
      } catch (error) {
        console.error('Error loading stored path:', error);
      }
    };
    loadStoredPath();
  }, []);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location permission is required to get your current location.');
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      } catch (error) {
        console.error('Error getting current location:', error);
      }
    };
    getCurrentLocation();
  }, []);

  const startRecording = async () => {
    setIsRecording(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to record routes.');
      return;
    }

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000, // update every x seconds
        distanceInterval: 1, // update every x meters
      },
      (newLocation) => {
        const newCoordinate: LatLng = {
          latitude: newLocation.coords.latitude,
          longitude: newLocation.coords.longitude,
        };
        setPath((prevPath) => [...prevPath, newCoordinate]);
        setUserLocation(newCoordinate);
        storePath([...path, newCoordinate]); // Store path locally
      }
    );


    setLocationSubscription(subscription);

    // setIsRecording(false);
  };

  const storePath = async (pathToStore: LatLng[]) => {
    try {
      await AsyncStorage.setItem('route', JSON.stringify(pathToStore));
    } catch (error) {
      console.error('Error storing path:', error);
    }
  };

  // const stopRecording = async () => {
  //   setIsRecording(false);
  // };

  const stopRecording = async () => {
    setIsRecording(false);

    console.log(locationSubscription)
    if (locationSubscription) {
      console.log("stopping ");
      locationSubscription.remove(); 
      setLocationSubscription(null);
    }

  };

  const resetPath = () => {
    setPath([]);
    AsyncStorage.removeItem('route');
  };

  const savePath = async () => {
    // Send path to server
    try {
      Alert.alert("Sucessful")
      const storedPath = await AsyncStorage.getItem('route');
      console.log(storedPath)
      // resetPath();
    } catch (error) {
      console.error('Error saving path to server:', error);
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      {initialRegion && (
        <MapView
          style={{ flex: 1, paddingTop: 10 }}
          showsUserLocation
          followsUserLocation
          initialRegion={initialRegion}
        >
          {path.length > 0 && <Polyline coordinates={path} strokeWidth={5} strokeColor='red' />}
          {userLocation &&
            <Marker coordinate={userLocation}>

              <FontAwesome5 name="tractor" size={24} color="black" />
            </Marker>

          }

        </MapView>
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>


        <View>

          <AppButton

            onPress={startRecording}
            disabled={isRecording}
            text="Start"
          />
        </View>


        <View>

          <AppButton

            onPress={stopRecording}

            disabled={!isRecording}
            text="Stop"
          />
        </View>

        <View>

          <AppButton

            onPress={resetPath}
            disabled={path.length === 0}
            text="Reset"
          />
        </View>

        <View>

          <AppButton

            onPress={savePath}
            disabled={path.length === 0}
            text="Save"
          />
        </View>

      </View>
    </View>
  );
}






const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10

  },
  textStyle: {
    textAlign: "center",
    color: "white",
    fontSize: 15

  }
})