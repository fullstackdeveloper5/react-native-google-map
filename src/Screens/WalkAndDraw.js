/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Animated,
  Button,

} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MapView from 'react-native-maps';
import { Marker, Polygon, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import WebView from 'react-native-webview';



const WalkAndDraw = () => {
  const [position, setPosition] = useState({});
  const [polyline_coordinates, setpolyline_coordinates] = useState([]);
  
  const getlocationData = async()=>{
    Geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
    )
  }
  const addPointToArray = ()=>{
    
    var tempArray = [...polyline_coordinates];
    tempArray?.push({latitude:position?.latitude,longitude:position?.longitude});
    setpolyline_coordinates(tempArray);
    console.log(polyline_coordinates)
  }
  const removePointFromArray = ()=>{
    
    setpolyline_coordinates([]);
  }
  useEffect(() => {
    setInterval(() => {
      getlocationData();
    }, 2000);
  }, [polyline_coordinates]);
  return (
    <SafeAreaView style={{height:"100%", position:"relative"}}>
      {Object.keys(position).length > 0 &&
      <MapView
      initialRegion={position}
      style={{flex:1, height:"100%"}}
      mapType='satellite'
      minZoomLevel={18}
      zoomEnabled={true}
      showsUserLocation={true}
      onUserLocationChange= {(coordinate)=>{
        if(typeof coordinate?.nativeEvent?.coordinate?.latitude != "undefined"){
         
          setPosition({
            latitude: coordinate?.nativeEvent.coordinate?.latitude,
            longitude: coordinate?.nativeEvent.coordinate?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }
        console.log(coordinate?.nativeEvent?.coordinate?.latitude,"sdjkfhdjksfh");
      }}
    >
      {polyline_coordinates?.length > 0 &&
      <Polyline
          key={"polyline.id"}
          coordinates={polyline_coordinates}
          strokeColor="red"
          fillColor="rgba(255,0,0,0.5)"
          strokeWidth={5}/>
      }
      </MapView>
      }
      <View style={{
        position:"absolute",
        bottom:50, 
        marginLeft:40,
        width:"80%",
        left:0,
        right:0,
        margin:"auto"
        }}>
      <Button
        onPress={()=>{
          addPointToArray();
        }}
        title="Add"
        color="#841584"
        style={{marginLeft:20}}
      />
    </View>
      <View style={{
        position:"absolute",
        bottom:10, 
        marginLeft:40,
        // flexDirection:"row",
        width:"80%",
        left:0,
        right:0,
        margin:0
        }}>
        <Button
        onPress={()=>{
          removePointFromArray();
        }}
        title="Redraw"
        color="#841584"
        style={{}}
      />
    </View>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default WalkAndDraw;
