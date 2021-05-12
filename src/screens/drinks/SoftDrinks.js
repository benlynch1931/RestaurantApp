import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { AppContext } from '../../contexts/AppContext';

const SoftDrinks = (props) => {
  
  const { addToTotal, total, addToBasket, basket } = useContext(AppContext)
  
  const optionStyle = {
    width: wp('80%'),
    marginTop: hp('2.5%'),
    marginLeft: wp('10%'),
    backgroundColor: '#FFFFFF',
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 } 
  }
  
  const lastOptionStyle = {
    ...optionStyle,
    marginBottom: hp('2.5%')
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
  
  const drinks = [
    {
      label: 'Appletiser',
      price: 0
    },
    {
      label: 'Coffee',
      price: 2.25
    },
    {
      label: 'Coke',
      price: 3.20
    },
    {
      label: 'Coke BOTTLE',
      price: 1.85
    },
    {
      label: 'Cordial',
      price: 1.00
    },
    {
      label: 'Diet Coke',
      price: 3.20
    },
    {
      label: 'Diet Coke BOTTLE',
      price: 1.85
    },
    {
      label: 'Fentimans',
      price: 3.20
    },
    {
      label: 'Fever Tree Tonic',
      price: 0
    },
    {
      label: 'Frobishers',
      price: 0
    },
    {
      label: 'J2O BOTTLE',
      price: 2.60
    },
    {
      label: 'Schweppes',
      price: 0
    },
    {
      label: 'Sparkling Water',
      price: 0
    },
    {
      label: 'Tea',
      price: 2.20
    }
  ]
  
  const pressAddToBasket = (softDrink) => {
    addToTotal(softDrink.price + total)
    addToBasket([...basket, [softDrink.label, softDrink.price]])
  }
  
  const renderDrinks = () => {
    let renderedDrinks = []
    drinks.forEach((softDrink, idx) => {
      renderedDrinks.push(
        <View style={idx == drinks.length - 1  ? lastOptionStyle : optionStyle }>
          <TouchableOpacity style={touchableStyle} onPress={() => { pressAddToBasket(softDrink) }}>
            <Text style={textStyle}>{softDrink.label}</Text>
          </TouchableOpacity>
        </View>
      )
    });
    return renderedDrinks
  }

    return (
      <ScrollView style={{ width: wp('100%'), backgroundColor: '#E9E9E9', height: hp('82.5%'), paddingBottom: hp('2.5%') }}>
        { renderDrinks() }
      </ScrollView>
    )
}

export default SoftDrinks;