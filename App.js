import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Navbar from './src/components/Navbar';
import Main from './src/controllers/Main.js';

import AppContextProvider from './src/contexts/AppContext.js';

export default function App() {
  return (
    <View style={{ width: '100%', backgroundColor: '#E9E9E9', overflow: 'scroll' }}>
      <AppContextProvider>
        <Navbar location={'top'} />
        <Main />
        <Navbar location={'bottom'} />
      </AppContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E9E9',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
});
