import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import MainTabs from '../screens/tabs/MainTabs.js';




const TabController = () => {
  
  return (
    <View>
      <MainTabs />
    </View>
  )
}

export default TabController;