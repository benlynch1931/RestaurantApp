import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { AppContext } from '../../contexts/AppContext';

const Ales = (props) => {
  
  const [isRendered, setIsRendered] = useState(false)
  
  const { addToTotal, total, addToBasket, basket } = useContext(AppContext)
  
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
  
  let renderedDrinks = []
  
  const drinks = [
    {
      label: 'Batch',
      price: 3.40,
      alcoholPercentage: 3.5,
      description: ''
    },
    {
      label: 'Bath Gem',
      price: 3.85,
      alcoholPercentage: 4.1,
      description: ''
    },
    {
      label: 'Butcombe',
      price: 3.85,
      alcoholPercentage: 4,
      description: ''
    },
    {
      label: 'Guest Ale',
      price: 3.95,
      alcoholPercentage: 0,
      description: ''
    },
    {
      label: 'Guinness',
      price: 4.55,
      alcoholPercentage: 4.1,
      description: ''
    },
    {
      label: 'Otter',
      price: 3.40,
      alcoholPercentage: 3.6,
      description: ''
    },
    {
      label: 'Palmers IPA',
      price: 3.75,
      alcoholPercentage: 4.2,
      description: ''
    },
    {
      label: 'Tribute',
      price: 3.75,
      alcoholPercentage: 4.2,
      description: ''
    }
  ]
  
  const addToBasket = (ale) => {
    addToTotal(ale.price + total)
    addToBasket([...basket, [ale.label, ale.price]])
  }
  
  const renderDrinks = () => {
    drinks.forEach((ale, idx) => {
      renderedDrinks.push(
        <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
          <TouchableOpacity style={touchableStyle} onPress={() => { addToBasket(ale) }}>
            <Text style={textStyle}>{ale.label}</Text>
          </TouchableOpacity>
        </View>
      )
    });
    return renderedDrinks
  }

    return (
      <ScrollView style={{ width: wp('100%'), backgroundColor: '#E9E9E9', height: hp('82.5%') }}>
        { renderDrinks() }
      </ScrollView>
    )


  
  
  // return (
  //   <ScrollView style={{ width: wp('100%'), backgroundColor: '#E9E9E9', height: hp('90%') }}>
  // 
  //     <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
  //       <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
  //         <Text style={textStyle}>Batch</Text>
  //       </TouchableOpacity>
  //     </View>
  // 
  //     <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
  //       <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
  //         <Text style={textStyle}>Bath Gem</Text>
  //       </TouchableOpacity>
  //     </View>
  // 
  //     <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
  //       <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
  //         <Text style={textStyle}>Butcombe</Text>
  //       </TouchableOpacity>
  //     </View>
  // 
  //     <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
  //       <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
  //         <Text style={textStyle}>Guest Ale</Text>
  //       </TouchableOpacity>
  //     </View>
  // 
  //     <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
  //       <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
  //         <Text style={textStyle}>Guinnes</Text>
  //       </TouchableOpacity>
  //     </View>
  // 
  //     <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
  //       <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
  //         <Text style={textStyle}>Otter</Text>
  //       </TouchableOpacity>
  //     </View>
  // 
  //     <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
  //       <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
  //         <Text style={textStyle}>Palmers</Text>
  //       </TouchableOpacity>
  //     </View>
  // 
  //     <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
  //       <TouchableOpacity style={touchableStyle} onPress={() => {  }}>
  //         <Text style={textStyle}>Tribute</Text>
  //       </TouchableOpacity>
  //     </View>
  // 
  //   </ScrollView>
  // )
}

export default Ales;