import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { DrinkContext } from '../../../contexts/DrinkContext.js';
import { AppContext } from '../../../contexts/AppContext.js';

const Wines = (props) => {
  
  const { setTitle, addToTotal, total, addToBasket, basket } = useContext(AppContext)
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
  
  const drinks = [
    {
      label: 'Small Wine',
      price: 3.60
    },
    {
      label: 'Medium Wine',
      price: 4.40
    },
    {
      label: 'Large Wine',
      price: 5.70
    },
    {
      label: 'Btl of Wine',
      price: 15.50
    },
    {
      label: 'Takeaway Btl Wine',
      price: 7.50
    },
    {
      label: 'Btl of Champagne',
      price: 20.00
    }
  ]
  
  const pressAddToBasket = (wine) => {
    addToTotal(wine.price + total)
    addToBasket([...basket, [wine.label, wine.price]])
  }
  
  const renderDrinks = () => {
    let renderedDrinks = []
    drinks.forEach((wine, idx) => {
      renderedDrinks.push(
        <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
          <TouchableOpacity style={touchableStyle} onPress={() => { pressAddToBasket(wine) }}>
            <Text style={textStyle}>{wine.label}</Text>
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
  //   <ScrollView style={{ width: wp('100%'), backgroundColor: '#E9E9E9', height: hp('82.5%') }}>
  // 
  //     <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
  //       <TouchableOpacity style={touchableStyle} onPress={() => { setScreen('wines-champagne'); setTitle('Champagne') }}>
  //         <Text style={textStyle}>Champagnes</Text>
  //       </TouchableOpacity>
  //     </View>
  // 
  //     <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
  //       <TouchableOpacity style={touchableStyle} onPress={() => { setScreen('wines-red'); setTitle('Red') }}>
  //         <Text style={textStyle}>Red</Text>
  //       </TouchableOpacity>
  //     </View>
  // 
  //     <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
  //       <TouchableOpacity style={touchableStyle} onPress={() => { setScreen('wines-rose'); setTitle('Rose') }}>
  //         <Text style={textStyle}>Rose</Text>
  //       </TouchableOpacity>
  //     </View>
  // 
  //     <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
  //       <TouchableOpacity style={touchableStyle} onPress={() => { setScreen('wines-white'); setTitle('White') }}>
  //         <Text style={textStyle}>White</Text>
  //       </TouchableOpacity>
  //     </View>
  // 
  // 
  //   </ScrollView>
  // )
}

export default Wines;