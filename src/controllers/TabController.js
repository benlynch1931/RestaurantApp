import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import MainTabs from '../screens/tabs/MainTabs.js';




const TabController = () => {
  
  return (
    <KeyboardAwareScrollView>
      <MainTabs />
    </KeyboardAwareScrollView>
  )
}

export default TabController;