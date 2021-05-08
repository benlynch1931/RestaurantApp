import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { DrinkContext } from '../../../contexts/DrinkContext.js';

const Wines = (props) => {
  
  const { setScreen } = useContext(DrinkContext);
  
  const optionStyle = {
    width: wp('80%'),
    marginTop: hp('2.5%'),
    backgroundColor: '#FFFFFF',
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 } 
  }
  
  const touchableStyle = {
    width: wp("80%"),
    paddingTop: hp('0.5%'),
    paddingBottom: hp('0.5%')
  }
  
  const textStyle = {
    textAlign: 'center',
    fontSize: hp('5%')
  }
  
  return (
    <ScrollView style={{ width: wp('100%'), backgroundColor: '#E9E9E9', height: hp('90%') }}>
    
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Champagne</Text>
        </TouchableOpacity>
      </View>
    
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Chardonnay</Text>
        </TouchableOpacity>
      </View>
      
      
    </ScrollView>
  )
}

export default Wines;