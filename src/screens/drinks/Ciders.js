import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { AppContext } from '../../contexts/AppContext';

const Ciders = (props) => {
  
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
  
  const drinks = [
    {
      label: 'Ashton Press',
      price: 3.65
    },
    {
      label: 'Black Rat',
      price: 3.50
    },
    {
      label: 'Dry',
      price: 3.65
    },
    {
      label: 'Haze',
      price: 3.80
    },
    {
      label: 'Rattler',
      price: 4.40
    }
  ]
  
  const pressAddToBasket = (ale) => {
    addToTotal(ale.price + total)
    addToBasket([...basket, [ale.label, ale.price]])
  }
  
  const renderDrinks = () => {
    let renderedDrinks = []
    drinks.forEach((cider, idx) => {
      renderedDrinks.push(
        <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
          <TouchableOpacity style={touchableStyle} onPress={() => { pressAddToBasket(cider) }}>
            <Text style={textStyle}>{cider.label}</Text>
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
}

export default Ciders;