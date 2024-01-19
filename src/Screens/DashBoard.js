/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { useNavigation } from '@react-navigation/native';


const DashBoard = () => {

  const navigation = useNavigation();
 
  return (
    <SafeAreaView style={{flex:1,height:"100%"}}>
     <View style={{ alignSelf:"center", flex:1}}>

<TouchableOpacity style={{ backgroundColor: "green", alignContent: "center", marginBottom:50,padding:10,marginTop:50 }}
onPress={()=>{navigation.navigate("draw")}}
>
  <Text style={{ textAlign: "center", color: "#fff" }}>Draw On Map</Text>
  </TouchableOpacity>

<TouchableOpacity style={{ backgroundColor: "green", alignContent: "center",padding:10 }} onPress={()=>{navigation.navigate("select")}}><Text style={{ textAlign: "center", color: "#fff" }}>Walk & Select</Text></TouchableOpacity>

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

export default DashBoard;
