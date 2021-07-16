import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { AppContext } from '../../contexts/AppContext';
import styles from '../../styles/drinks.js'

const Ales = (props) => {
  
  const [isRendered, setIsRendered] = useState(false)
  
  const { addToTotal, total, addToBasket, basket } = useContext(AppContext)
  
  const [ selectedDrink, setSelectDrink ] = useState({ firstPrice: 0})
  const [ viewDrinkInfoRendering, setViewDrinkInfoRendering ] = useState('none')
  
  const drinks = [
    {
      firstLabel: 'Batch',
      firstPrice: 3.40,
      secondModifier: 'HALF',
      secondPrice: 1.70,
      alcoholPercentage: 3.5,
      brewery: 'St. Austell',
      description: '',
      background: '#3131E0',
      text: '#FFFFFF'
    },
    {
      firstLabel: 'Bath Gem',
      firstPrice: 3.85,
      secondModifier: 'HALF',
      secondPrice: 1.95,
      alcoholPercentage: 4.1,
      brewery: 'Bath Ales',
      description: 'Full Bodied & Malty',
      background: '#3131E0',
      text: '#FFFFFF'
    },
    {
      firstLabel: 'Butcombe',
      firstPrice: 3.85,
      secondModifier: 'HALF',
      secondPrice: 1.95,
      alcoholPercentage: 4,
      brewery: 'Butcombe',
      description: '',
      background: '#3131E0',
      text: '#FFFFFF'
    },
    {
      firstLabel: 'Guest Ale',
      firstPrice: 3.95,
      secondModifier: 'HALF',
      secondPrice: 2.00,
      alcoholPercentage: 0,
      brewery: 'Varies',
      description: '',
      background: '#3131E0',
      text: '#FFFFFF'
    },
    {
      firstLabel: 'Guinness',
      firstPrice: 4.55,
      secondModifier: 'HALF',
      secondPrice: 2.30,
      alcoholPercentage: 4.1,
      brewery: 'Guinness',
      description: '',
      background: '#3131E0',
      text: '#FFFFFF'
    },
    {
      firstLabel: 'Otter',
      firstPrice: 3.40,
      secondModifier: 'HALF',
      secondPrice: 1.70,
      alcoholPercentage: 3.6,
      brewery: 'Otter Brewery',
      description: '',
      background: '#3131E0',
      text: '#FFFFFF'
    },
    {
      firstLabel: 'Palmers',
      firstPrice: 3.75,
      secondModifier: 'HALF',
      secondPrice: 1.90,
      alcoholPercentage: 4.2,
      brewery: 'Palmers',
      description: '',
      background: '#3131E0',
      text: '#FFFFFF'
    },
    {
      firstLabel: 'Tribute',
      firstPrice: 3.75,
      secondModifier: 'HALF',
      secondPrice: 1.90,
      alcoholPercentage: 4.2,
      brewery: 'St. Austell',
      description: '',
      background: '#3131E0',
      text: '#FFFFFF'
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
      <View style={{ ...styles.viewTabBackgroundStyle, display: viewDrinkInfoRendering }}>
        <View style={{ position: 'absolute', right: wp('5%'), top: wp('4%') }}>
          <TouchableOpacity onPress={() => { setViewDrinkInfoRendering('none'); setSelectDrink({ firstPrice: 0}) }}>
            <Text style={{ fontSize: hp('5%'), color: '#FFFFFF' }}>X</Text>
          </TouchableOpacity>
        </View>
      
        <View style={styles.viewTabWindowStyle}>
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
        <View key={`main ${idx}`} style={{ display: 'flex', flexDirection: 'row' }}>
        
          <View key={`firstMod ${idx}`}style={[styles.firstOptionStyle, { marginLeft: wp('5%') }]}>
            <TouchableOpacity key={`firstModButton ${idx}`} style={{ ...styles.firstTouchableStyle, backgroundColor: ale.background }} onPress={() => { pressAddToBasket(ale, 'first') }}>
              <Text key={`firstModLabel ${idx}`} style={{ ...styles.drinkTextStyle, color: ale.text }}>{ale.firstLabel}</Text>
            </TouchableOpacity>
          </View>
          
          <View key={`secondMod ${idx}`} style={styles.secondOptionStyle }>
            <TouchableOpacity key={`secondModButton ${idx}`} style={{ ...styles.secondTouchableStyle, backgroundColor: ale.background }} onPress={() => { pressAddToBasket(ale, 'second') }}>
              <Text key={`secondModLabel ${idx}`} style={{ ...styles.drinkTextStyle, color: ale.text }}>{ ale.secondModifier }</Text>
            </TouchableOpacity>
          </View>
          
          <View key={`info ${idx}`} style={{ ...styles.infoOptionStyle, backgroundColor: ale.background }}>
            <TouchableOpacity key={`infoButton ${idx}`} style={styles.infoTouchableStyle} onPress={() => { setSelectDrink(ale); setViewDrinkInfoRendering('block') }}>
              <Image key={`infoIcon ${idx}`} source={require('../../../assets/info_WHITE.png')} style={{ height: hp('5%'), width: hp('5%'), marginTop: hp('0.5%'), marginLeft: hp('0.5%')}} />
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