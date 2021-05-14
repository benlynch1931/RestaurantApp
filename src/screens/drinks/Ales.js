import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { AppContext } from '../../contexts/AppContext';

const Ales = (props) => {
  
  const [isRendered, setIsRendered] = useState(false)
  
  const { addToTotal, total, addToBasket, basket } = useContext(AppContext)
  
  const firstOptionStyle = {
    width: wp('45%'),
    marginTop: hp('2.5%'),
    backgroundColor: '#FFFFFF',
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 } 
  }
  
  const secondOptionStyle = {
    width: wp('20%'),
    marginTop: hp('2.5%'),
    backgroundColor: '#FFFFFF',
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 } ,
    marginLeft: wp('5%')
  }
  
  const infoOptionStyle = {
    width: wp('15%'),
    marginTop: hp('2.5%'),
    backgroundColor: '#FFFFFF',
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 } ,
    marginLeft: wp('5%')
  }
  
  const firstTouchableStyle = {
    width: wp("45%"),
    paddingTop: hp('0.5%'),
    paddingBottom: hp('0.5%')
  }
  
  const secondTouchableStyle = {
    width: wp("20%"),
    paddingTop: hp('0.5%'),
    paddingBottom: hp('0.5%')
  }
  
  const infoTouchableStyle = {
    width: wp("15%"),
    paddingTop: hp('0.5%'),
    paddingBottom: hp('0.5%')
  }
  
  const textStyle = {
    textAlign: 'center',
    fontSize: hp('4.5%')
  }
  
  
  
  const drinks = [
    {
      label: 'Batch',
      firstPrice: 3.40,
      secondPrice: 1.70,
      alcoholPercentage: 3.5,
      description: ''
    },
    {
      label: 'Bath Gem',
      firstPrice: 3.85,
      secondPrice: 1.95,
      alcoholPercentage: 4.1,
      description: ''
    },
    {
      label: 'Butcombe',
      firstPrice: 3.85,
      secondPrice: 1.95,
      alcoholPercentage: 4,
      description: ''
    },
    {
      label: 'Guest Ale',
      firstPrice: 3.95,
      secondPrice: 2.00,
      alcoholPercentage: 0,
      description: ''
    },
    {
      label: 'Guinness',
      firstPrice: 4.55,
      secondPrice: 2.30,
      alcoholPercentage: 4.1,
      description: ''
    },
    {
      label: 'Otter',
      firstPrice: 3.40,
      secondPrice: 1.70,
      alcoholPercentage: 3.6,
      description: ''
    },
    {
      label: 'Palmers',
      firstPrice: 3.75,
      secondPrice: 1.90,
      alcoholPercentage: 4.2,
      description: ''
    },
    {
      label: 'Tribute',
      firstPrice: 3.75,
      secondPrice: 1.90,
      alcoholPercentage: 4.2,
      description: ''
    }
  ]
  
  const pressAddToBasket = (ale, priceType) => {
    if (priceType == 'first') {
      addToTotal(ale.firstPrice + total)
      addToBasket([...basket, [ale.label, ale.firstPrice]])
    } else if (priceType == 'second') {
      addToTotal(ale.secondPrice + total)
      addToBasket([...basket, [`Half ${ale.label}`, ale.secondPrice]])
    }
    
  }
  
  const renderDrinks = () => {
    let renderedDrinks = []
    drinks.forEach((ale, idx) => {
      renderedDrinks.push(
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ ...firstOptionStyle, marginLeft: wp('5%') }}>
            <TouchableOpacity style={firstTouchableStyle} onPress={() => { pressAddToBasket(ale, 'first') }}>
              <Text style={textStyle}>{ale.label}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ ...secondOptionStyle }}>
            <TouchableOpacity style={secondTouchableStyle} onPress={() => { pressAddToBasket(ale, 'second') }}>
              <Text style={textStyle}>HALF</Text>
            </TouchableOpacity>
          </View>
          <View style={{ ...infoOptionStyle }}>
            <TouchableOpacity style={infoTouchableStyle} onPress={() => {  }}>
              <Text style={textStyle}>I</Text>
            </TouchableOpacity>
          </View>
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

export default Ales;