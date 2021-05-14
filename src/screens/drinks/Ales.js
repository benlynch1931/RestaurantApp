import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { AppContext } from '../../contexts/AppContext';

const Ales = (props) => {
  
  const [isRendered, setIsRendered] = useState(false)
  
  const { addToTotal, total, addToBasket, basket } = useContext(AppContext)
  
  const [ selectedDrink, setSelectDrink ] = useState({ firstPrice: 0})
  const [ viewDrinkInfoRendering, setViewDrinkInfoRendering ] = useState('none')
  
  const firstOptionStyle = {
    width: wp('45%'),
    minHeight: hp('6%'),
    marginTop: hp('2.5%'),
    backgroundColor: '#FFFFFF',
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 } 
  }
  
  const secondOptionStyle = {
    width: wp('20%'),
    minHeight: hp('6%'),
    marginTop: hp('2.5%'),
    backgroundColor: '#FFFFFF',
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 } ,
    marginLeft: wp('5%')
  }
  
  const infoOptionStyle = {
    width: hp('6%'),
    minHeight: hp('6%'),
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
    width: hp('5%')
  }
  
  const textStyle = {
    textAlign: 'center',
    fontSize: hp('4.5%')
  }
  
  const viewTabWindowStyle = { 
    width: wp('90%'),
    height: hp('70%'),
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: hp('10%'),
    left: wp('5%'),
    padding: wp('5%') ,
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 } ,
    zIndex: 9
  }
  
  
  
  const drinks = [
    {
      firstLabel: 'Batch',
      firstPrice: 3.40,
      secondModifier: 'HALF',
      secondPrice: 1.70,
      alcoholPercentage: 3.5,
      brewery: 'St. Austell',
      description: ''
    },
    {
      firstLabel: 'Bath Gem',
      firstPrice: 3.85,
      secondModifier: 'HALF',
      secondPrice: 1.95,
      alcoholPercentage: 4.1,
      brewery: 'Bath Ales',
      description: 'Full Bodied & Malty'
    },
    {
      firstLabel: 'Butcombe',
      firstPrice: 3.85,
      secondModifier: 'HALF',
      secondPrice: 1.95,
      alcoholPercentage: 4,
      brewery: 'Butcombe',
      description: ''
    },
    {
      firstLabel: 'Guest Ale',
      firstPrice: 3.95,
      secondModifier: 'HALF',
      secondPrice: 2.00,
      alcoholPercentage: 0,
      brewery: 'Varies',
      description: ''
    },
    {
      firstLabel: 'Guinness',
      firstPrice: 4.55,
      secondModifier: 'HALF',
      secondPrice: 2.30,
      alcoholPercentage: 4.1,
      brewery: 'Guinness',
      description: ''
    },
    {
      firstLabel: 'Otter',
      firstPrice: 3.40,
      secondModifier: 'HALF',
      secondPrice: 1.70,
      alcoholPercentage: 3.6,
      brewery: 'Otter Brewery',
      description: ''
    },
    {
      firstLabel: 'Palmers',
      firstPrice: 3.75,
      secondModifier: 'HALF',
      secondPrice: 1.90,
      alcoholPercentage: 4.2,
      brewery: 'Palmers',
      description: ''
    },
    {
      firstLabel: 'Tribute',
      firstPrice: 3.75,
      secondModifier: 'HALF',
      secondPrice: 1.90,
      alcoholPercentage: 4.2,
      brewery: 'St. Austell',
      description: ''
    }
  ]
  
  const pressAddToBasket = (ale, priceType) => {
    if (priceType == 'first') {
      addToTotal(ale.firstPrice + total)
      addToBasket([...basket, [ale.firstLabel, ale.firstPrice]])
    } else if (priceType == 'second') {
      addToTotal(ale.secondPrice + total)
      addToBasket([...basket, [`${ale.secondModifier} ${ale.firstLabel}`, ale.secondPrice]])
    }
    
  }
  
  const renderViewDrinkInfo = () => {
    return (
      <View style={{ display: viewDrinkInfoRendering, width: wp('100%'), height: hp('82.5%'), backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', zIndex: 9 }}>
        <View style={{ position: 'absolute', right: wp('5%'), top: wp('4%') }}>
          <TouchableOpacity onPress={() => { setViewDrinkInfoRendering('none'); setSelectDrink({ firstPrice: 0}) }}>
            <Text style={{ fontSize: hp('5%'), color: '#FFFFFF' }}>X</Text>
          </TouchableOpacity>
        </View>
      
        <View style={viewTabWindowStyle}>
          <Text style={{ position: 'absolute', fontSize: hp('3%'), left: wp('2.5%'), top: wp('2.5%'), lineHeight: hp('3%') }}>{ }</Text>
          <Text style={{ fontSize: hp('6%'), lineHeight: hp('6%'), marginTop: hp('2%') }}>{ selectedDrink.firstLabel }</Text>
          <Text style={{ fontSize: hp('3%'), lineHeight: hp('6%') }}>{ selectedDrink.brewery }</Text>
          <Text style={{ fontSize: hp('3%'), lineHeight: hp('6%'), marginTop: hp('2%') }}>ABV: { selectedDrink.alcoholPercentage }% | £{ selectedDrink.firstPrice.toFixed(2) }</Text>
          <View style={{ borderBottomWidth: 1 }}></View>
          <Text style={{ fontSize: hp('6%'), lineHeight: hp('6%'), marginTop: hp('2%') }}>{ selectedDrink.description }</Text>
          
  
          
          
        </View>
        
      </View>
    )
  }
  
  const renderDrinks = () => {
    let renderedDrinks = []
    drinks.forEach((ale, idx) => {
      renderedDrinks.push(
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ ...firstOptionStyle, marginLeft: wp('5%') }}>
            <TouchableOpacity style={firstTouchableStyle} onPress={() => { pressAddToBasket(ale, 'first') }}>
              <Text style={textStyle}>{ale.firstLabel}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ ...secondOptionStyle }}>
            <TouchableOpacity style={secondTouchableStyle} onPress={() => { pressAddToBasket(ale, 'second') }}>
              <Text style={textStyle}>{ ale.secondModifier }</Text>
            </TouchableOpacity>
          </View>
          <View style={{ ...infoOptionStyle }}>
            <TouchableOpacity style={infoTouchableStyle} onPress={() => { setSelectDrink(ale); setViewDrinkInfoRendering('block') }}>
              <Image source={require('../../../assets/info.png')} style={{ height: hp('5%'), width: hp('5%'), marginTop: hp('0.5%'), marginLeft: hp('0.5%')}} />
            </TouchableOpacity>
          </View>
        </View>
      )
    });
    return renderedDrinks
  }

    return (
      <View>
        <ScrollView style={{ width: wp('100%'), backgroundColor: '#E9E9E9', height: hp('82.5%') }}>
          { renderDrinks() }
        </ScrollView>
        { renderViewDrinkInfo() }
      </View>
    )


  

}

export default Ales;