import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Ales = (props) => {
  
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
          <Text style={textStyle}>Batch</Text>
        </TouchableOpacity>
      </View>
    
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Bath Gem</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Butcombe</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Guest Ale</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Guinnes</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Otter</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Palmers</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Tribute</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  )
}

export default Ales;