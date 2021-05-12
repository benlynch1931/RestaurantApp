import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { DrinkContext } from '../../contexts/DrinkContext.js';
import { AppContext } from '../../contexts/AppContext.js';

const Main = (props) => {
  
  const { setScreen } = useContext(DrinkContext)
  const { setTitle } = useContext(AppContext)
  
  const rowStyle = {
    width: wp('80%'),
    marginTop: hp('5%'),
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 },
    marginLeft: wp('10%'),
    display: 'flex',
    flexDirection: 'row'
  }
  
  const optionStyle = {
    backgroundColor: '#FFFFFF',
    width: wp('100%'),
    flex: 1
  }
  
  const touchableStyle = {
    width: '100%',
    height: hp('20%')
  }
  
  const textStyle = {
    fontSize: hp('5%'),
    textAlign: 'center',
    lineHeight: hp('5%'),
    marginTop: hp('7.5%')
  }
  
  return (
    <ScrollView style={{ width: wp('100%'), backgroundColor: '#E9E9E9', height: hp('82.5%') }}>
    
    
    {/* ROW 1 */}
    <View style={rowStyle}>
    
      <View style={{ ...optionStyle, marginRight: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => { setScreen('ales'); setTitle('Ales') }}>
          <Text style={textStyle}>Ales</Text>
        </TouchableOpacity>
      </View>
      
      <View style={optionStyle}>
        <TouchableOpacity style={touchableStyle} onPress={() => { setScreen('ciders'); setTitle('Ciders') }}>
          <Text style={textStyle}>Ciders</Text>
        </TouchableOpacity>
      </View>
      
    </View>
    
    
    {/* ROW 2 */}
    <View style={rowStyle}>
    
      <View style={{ ...optionStyle, marginRight: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => { setScreen('lagers'); setTitle('Lagers') }}>
          <Text style={textStyle}>Lagers</Text>
        </TouchableOpacity>
      </View>
      
      <View style={optionStyle}>
        <TouchableOpacity style={touchableStyle} onPress={() => { setScreen('softs'); setTitle('Soft Drinks') }}>
          <Text style={[textStyle, { marginTop: hp('5%') }]}>Soft Drinks</Text>
          </TouchableOpacity>
      </View>
      
    </View>
    
    
    {/* ROW 3 */}
    <View style={{ ...rowStyle, marginLeft: wp('10%'), marginBottom: hp('5%') }}>
    
      <View style={{ ...optionStyle, marginRight: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => { setScreen('spirits'); setTitle('Spirits') }}>
          <Text style={textStyle}>Spirits</Text>
        </TouchableOpacity>
      </View>
    
      <View style={optionStyle}>
        <TouchableOpacity style={touchableStyle} onPress={() => { setScreen('wines-main'); setTitle('Wines') }}>
          <Text style={textStyle}>Wines</Text>
        </TouchableOpacity>
      </View>
    </View>
    
    </ScrollView>
  )
}

export default Main;