import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { DrinkContext } from '../contexts/DrinkContext.js';

import Main from '../screens/drinks/Main.js'
import Ales from '../screens/drinks/Ales.js'
import Ciders from '../screens/drinks/Ciders.js'
import Lagers from '../screens/drinks/Lagers.js'
import SoftDrinks from '../screens/drinks/SoftDrinks.js'
import Spirits from '../screens/drinks/Spirits.js'
import Wines from '../screens/drinks/wines/Main.js'

import Champagne from '../screens/drinks/wines/Champagne.js'
import Red from '../screens/drinks/wines/Red.js'
import Rose from '../screens/drinks/wines/Rose.js'
import White from '../screens/drinks/wines/White.js'

const DrinkController = (props) => {
  
  const { screen } = useContext(DrinkContext);
  
  if (screen == 'main') {
      return (
        <View>
          <Main />
        </View>
      )
  } else if (screen == 'ales') {
      return (
        <View>
          <Ales />
        </View>
      )
  } else if (screen == 'ciders') {
      return (
        <View>
          <Ciders />
        </View>
      )
  } else if (screen == 'lagers') {
      return (
        <View>
          <Lagers />
        </View>
      )
  } else if (screen == 'softs') {
      return (
        <View>
          <SoftDrinks />
        </View>
      )
  } else if (screen == 'spirits') {
      return (
        <View>
          <Spirits />
        </View>
      )
  } else if (screen == 'wines-main') {
      return (
        <View>
          <Wines />
        </View>
      )
  } else if (screen == 'wines-champagne') {
      return (
        <View>
          <Champagne />
        </View>
      )
  } else if (screen == 'wines-red') {
      return (
        <View>
          <Red />
        </View>
      )
  } else if (screen == 'wines-rose') {
      return (
        <View>
          <Rose />
        </View>
      )
  } else if (screen == 'wines-white') {
      return (
        <View>
          <White />
        </View>
      )
  }
}

export default DrinkController;