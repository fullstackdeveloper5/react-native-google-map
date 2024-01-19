/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Navigation from './src/Navigation';
import { SafeAreaProvider } from "react-native-safe-area-context";
function App(){


  return (
    <SafeAreaProvider>
      <Navigation /> 
    </SafeAreaProvider>
  );
}


export default App;
