import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styles from '../styles/drinks.js'

import { AppContext } from '../contexts/AppContext.js'

const PLUScreen = (props) => {
  
  const hexConversion = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15
  }
  
  const { 
    pluList, setPluList,
    addToTotal, total,
    addToBasket, basket 
  } = useContext(AppContext);
  
  const fetchPLUs = () => {
    fetch('http://192.168.1.213:6030/api/plus', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(data => {
      setPluList(data.plu_items)
    })
  }
  
  const pressAddToBasket = (plu, priceType) => {
    if (priceType == 'first') {
      addToTotal(parseFloat(plu.first_price) + total)
      addToBasket([...basket, [plu.title, parseFloat(plu.first_price)]])
    } else if (priceType == 'second') {
      addToTotal(parseFloat(plu.second_price) + total)
      addToBasket([...basket, [`${plu.second_modifier} ${plu.title}`, parseFloat(plu.second_price)]])
    }
    
  }
  
  const getSpecificPLUs = (departmentID) => {
    let specificPLUs = [];
    pluList.forEach((plu, idx) => {
      if (plu.department.id === departmentID) {
        specificPLUs.push(plu)
      }
    });
    return specificPLUs;
  }
  
  const renderPLUs = (departmentID) => {
    const specificPLUs = getSpecificPLUs(departmentID)
    let rendering = [];
    specificPLUs.forEach((plu, idx) => {
      rendering.push(
        <View key={`main ${idx}`} style={{ display: 'flex', flexDirection: 'row' }}>
        
          <View key={`firstMod ${idx}`}style={[styles.firstOptionStyle, { marginLeft: wp('5%') }]}>
            <TouchableOpacity key={`firstModButton ${idx}`} style={{ ...styles.firstTouchableStyle, backgroundColor: plu.background }} onPress={() => { pressAddToBasket(plu, 'first') }}>
              <Text key={`firstModLabel ${idx}`} style={{ ...styles.drinkTextStyle, color: plu.text }}>{plu.title}</Text>
            </TouchableOpacity>
          </View>
          
          <View key={`secondMod ${idx}`} style={styles.secondOptionStyle }>
            <TouchableOpacity key={`secondModButton ${idx}`} style={{ ...styles.secondTouchableStyle, backgroundColor: plu.background }} onPress={() => { pressAddToBasket(plu, 'second') }}>
              <Text key={`secondModLabel ${idx}`} style={{ ...styles.drinkTextStyle, color: plu.text }}>{ plu.second_modifier }</Text>
            </TouchableOpacity>
          </View>
          
          <View key={`info ${idx}`} style={{ ...styles.infoOptionStyle, backgroundColor: plu.background }}>
            <TouchableOpacity key={`infoButton ${idx}`} style={styles.infoTouchableStyle} onPress={() => {  }}>
              <Image key={`infoIcon ${idx}`} source={renderInfoPicture(plu.background)} style={{ height: hp('5%'), width: hp('5%'), marginTop: hp('0.5%'), marginLeft: hp('0.5%')}} />
            </TouchableOpacity>
          </View>
          
        </View>
      )
    });
    
    return rendering;
    
  }
  
  const renderInfoPicture = (hexValue) => {
    
    // split into array 
    let hexValueArray = hexValue.split('')
    
    // remove hash 
    hexValueArray.shift()
    
    // group into 3x 2D arrays of 2 elements
    let rgbHexArray = []
    for (let i = 0; i<hexValueArray.length; i+=2) {
      rgbHexArray.push([hexValueArray[i], hexValueArray[i+1]])
    }
    // map first element to x16
    rgbHexArray.forEach((item) => {
      item[0] = hexConversion[item[0]] * 16
      item[1] = hexConversion[item[1]]
    });
    
    // add 2D array values together
    let rgbArray = rgbHexArray 
    rgbArray.forEach((item) => {
      item = item[0] + item[1]
    });
    
    // add all array elements together
    let totalRGBValue = parseInt(rgbArray[0]) + parseInt(rgbArray[1]) + parseInt(rgbArray[2])
    
    // compare addition to half RGB input
    if (totalRGBValue > 382.5) {
      return require('../../assets/info.png')
    } else {
      return (require('../../assets/info_WHITE.png'))
    }
  }
  
  useEffect(() => {
    fetchPLUs()
  }, [])
  
  return (
    <ScrollView style={{ width: wp('100%'), height: hp('82.5%'), backgroundColor: '#FFFFFF' }}>
    
      { renderPLUs(props.departmentID) }
    
    </ScrollView>
  )
}

export default PLUScreen;
