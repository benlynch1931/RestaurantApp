import React, { useContext, useEffect } from 'react';
import { LOCALHOST_IP } from '@env'

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
    setTotal, total,
    addToBasket, basket 
  } = useContext(AppContext);
  
  const fetchPLUs = (departments_id) => {
    fetch(`http://92.16.101.121:6030/api/plus?departments_id=${departments_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.plu_items.length)
      setPluList(data.plu_items)
    })
  }
  
  const pressAddToBasket = (plu, priceType) => {
    let title = "";
    let price = 0
    let exists = false
    if (priceType === 'first') {
      title = plu.title
      price = plu.first_price
    } else if (priceType === 'second') {
      title = `${plu.second_modifier} ${plu.title}`
      price = plu.second_price
    }
    let newBasket = []
    basket.forEach((item, idx) => {
      if (item.label === title) {
        exists = true
        item.quantity += 1
      }
      newBasket.push(item)
    });
    if (exists === false) {
      
      newBasket.push({
        label: title,
        quantity: 1,
        price: parseFloat(price),
        displayBar: plu.display_bar,
        displayKitchen: plu.display_kitchen
      })
    }
    setTotal(total + parseFloat(price))
    addToBasket(newBasket)
    
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
      if (plu.title != '' && plu.title != 'NO DESCRIPTION') {
        rendering.push(
          <View key={`main ${idx}`} style={{ display: 'flex', flexDirection: 'row' }}>
          
            <View key={`firstMod ${idx}`} style={plu.second_quantity != 0 ? [styles.firstOptionStyle, { marginLeft: wp('5%') }] : [styles.firstOptionStyle, { width: wp('70%'), marginLeft: wp('5%') }]}>
              <TouchableOpacity key={`firstModButton ${idx}`} style={ plu.second_quantity != 0 ? { ...styles.firstTouchableStyle, backgroundColor: plu.background, borderWidth: isPluButtonDisabled(plu) ? 2 : 0, borderColor: '#FF0000' } : { ...styles.firstTouchableStyle, width: wp('70%'), backgroundColor: plu.background, borderWidth: isPluButtonDisabled(plu) ? 2 : 0, borderColor: '#FF0000' }} onPress={() => { pressAddToBasket(plu, 'first') }} disabled={ isPluButtonDisabled(plu) }>
                <Text key={`firstModLabel ${idx}`} style={{ ...styles.drinkTextStyle, color: isPluButtonDisabled(plu) ? '#FF0000' : plu.text }}>{plu.title}</Text>
              </TouchableOpacity>
            </View>
            
            <View key={`secondMod ${idx}`} style={plu.second_quantity != 0 ? styles.secondOptionStyle : { display: 'none' } }>
              <TouchableOpacity key={`secondModButton ${idx}`} style={plu.second_quantity != 0 ? { ...styles.secondTouchableStyle, backgroundColor: plu.background, borderWidth: isPluButtonDisabled(plu) ? 2 : 0, borderColor: '#FF0000' } : { display: 'none' }} onPress={() => { pressAddToBasket(plu, 'second') }} disabled={ isPluButtonDisabled(plu) }>
                <Text key={`secondModLabel ${idx}`} style={{ ...styles.drinkTextStyle, color: isPluButtonDisabled(plu) ? '#FF0000' : plu.text }}>{ plu.second_modifier }</Text>
              </TouchableOpacity>
            </View>
            
            <View key={`info ${idx}`} style={{ ...styles.infoOptionStyle, backgroundColor: plu.background }}>
              <TouchableOpacity key={`infoButton ${idx}`} style={styles.infoTouchableStyle} onPress={() => {  }}>
                <Image key={`infoIcon ${idx}`} source={renderInfoPicture(plu.background)} style={{ height: hp('5%'), width: hp('5%'), marginTop: hp('0.5%'), marginLeft: hp('0.5%')}} />
              </TouchableOpacity>
            </View>
            
          </View>
        )
      }
      
    });
    
    return rendering;
    
  }
  
  const isPluButtonDisabled = (plu) => {
    if (plu.stock_controlled === true) {
      if (plu.stock_count === 0) {
        return true
      }
      return false
    }
    return false
  }
  
  const renderInfoPicture = (hexValue) => {
    // split into array 
    let hexValueArray = hexValue.split('')
    
    // remove hashtag
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
    fetchPLUs(props.departmentID)
  }, [])
  
  return (
    <ScrollView style={{ width: wp('100%'), height: hp('82.5%'), backgroundColor: '#FFFFFF' }}>
    
      { renderPLUs(props.departmentID) }
    
    </ScrollView>
  )
}

export default PLUScreen;
