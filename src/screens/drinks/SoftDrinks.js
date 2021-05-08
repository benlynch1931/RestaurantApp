import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SoftDrinks = (props) => {
  
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
    paddingTop: hp('0.75%'),
    paddingBottom: hp('0.75%')
  }
  
  const textStyle = {
    textAlign: 'center',
    fontSize: hp('4%')
  }
  
  return (
    <ScrollView style={{ width: wp('100%'), backgroundColor: '#E9E9E9', height: hp('82.5%') }}>
    
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Appletiser</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Coffee</Text>
        </TouchableOpacity>
      </View>
    
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Coke</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Coke BOTTLE</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Cordial</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Diet Coke</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Diet Coke BOTTLE</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Fentimans</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Fever Tree Tonic</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Frobishers</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>J2O BOTTLE</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Schweppes</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Sparkling Water</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
          <Text style={textStyle}>Tea</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  )
}

export default SoftDrinks;