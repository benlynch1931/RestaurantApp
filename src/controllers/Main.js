import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import HomeScreen from '../screens/HomeScreen';
import DepartmentScreen from '../screens/DepartmentScreen';
import DrinkController from './DrinkController';
import FoodController from './FoodController';
import TabController from './TabController';
import { AppContext } from '../contexts/AppContext.js';

import DrinkContextProvider from '../contexts/DrinkContext.js';

const MainController = (props) => {

  const { section, selectedGroup } = useContext(AppContext);

  // if (section == 'home') {
  //   return (
  //     <View>
  //       <HomeScreen />
  //     </View>
  //   )
  // } else if (section == 'drink') {
  //   return (
  //     <View>
  //       <DrinkContextProvider>
  //         <DrinkController />
  //       </DrinkContextProvider>
  //     </View>
  //   )
  // } else if (section == 'food') {
  //   return (
  //     <View>
  //       <FoodController />
  //     </View>
  //   )
  // } else if (section == 'tab') {
  //   return (
  //     <View>
  //       <TabController />
  //     </View>
  //   )
  // }
  
  if (section == 'view-groups') {
    return (
      <View>
        <HomeScreen />
      </View>
    )
  } else if (section == 'view-departments') {
    return (
      <View>
        <DepartmentScreen groupID={selectedGroup}/>
      </View>
    )
  } else if (section === 'view-tabs') {
    return (
      <View>
        <TabController />
      </View>
    )
  }
}


export default MainController;
