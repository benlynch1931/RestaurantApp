import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { AppContext } from '../contexts/AppContext.js';

const Navbar = (props) => {

  const { title, total, basket, removeFromBasket, removeFromTotal, setSection, setTitle } = useContext(AppContext);
  const [displayBasket, setDisplayBasket] = useState('none')
  
  const removeItem = (itemName, itemPrice) => {
    if (basket.length > 1) {
      const indexToRemove = basket.indexOf([itemName, itemPrice])
      const newBasket = basket.splice(indexToRemove, 1)
      removeFromBasket(newBasket)
    } else {
      removeFromBasket([])
    }
    const newTotal = total - itemPrice
    removeFromTotal(newTotal)
  }
  
  const iterateBasketItems = () => {
    let render = []
    basket.forEach((item, idx) => {
      render.push(
        <View style={{ position: 'relative', height: hp('5%') }}>
          <View style={{ position: 'absolute', left: wp('5%') }}>
            <TouchableOpacity onPress={() => { removeItem(item[0], item[1]) }}>
              <Text style={{ fontSize: hp('3%') }}>X</Text>
            </TouchableOpacity>
          </View>
          
          <View style={{ position: 'absolute', left: wp('12.5%') }}>
            <Text style={{ fontSize: hp('3%') }}>{item[0]}</Text>
          </View>
          
          <View style={{ position: 'absolute', right: wp('5%') }}>
            <Text style={{ fontSize: hp('3%') }}>£ {item[1].toFixed(2)}</Text>
          </View>
        </View>
      )
    });
    return render  
  }
  
  const renderBasket = () => {
    return (
      <View style={[{ position: 'absolute', width: wp('90%'), height: hp('77.5%'), display: displayBasket, zIndex: 10, backgroundColor: '#FFFFFF', marginTop: -hp('80%'), marginLeft: wp('5%') }]}>
        <View style={{ width: wp('90%'), height: hp('7.5%'), backgroundColor: '#919191' }}>
          <Text style={{ fontSize: hp('5%'), textAlign: 'center', color: '#DBDBDB', marginTop: 0, lineHeight: hp('5%'), marginTop: hp('1.25%') }}>Tab</Text>
          <TouchableOpacity style={{ position: 'absolute', right: wp('2%') }} onPress={() => { setDisplayBasket('none') }}><Text style={{ fontSize: hp('4%'), color: '#DBDBDB', lineHeight: hp('4%'), marginTop: hp('1.75%') }}>X</Text></TouchableOpacity>
        </View>
        
        <ScrollView style={{ width: wp('90%'), height: hp('60%'), paddingTop: hp('1%') }}>{ iterateBasketItems() }</ScrollView>
        <View style={{ position: 'absolute', width: wp('90%'), height: hp('5%'), bottom: hp('5%'), paddingRight: wp('5%') }}><Text style={{ textAlign: 'right', fontSize: hp('3%') }}>£ { total.toFixed(2) }</Text></View>
      </View>
    )
  }
  
  if (props.location == 'top') {

    return (
      <View style={{ position: 'fixed', top: 0, width: wp('100%'), height: hp('10%'), backgroundColor: '#FFFFFF', shadowColor: '#919191', shadowOffset: { height: 10, width: 0 }, shadowRadius: 4, shadowOpacity: 1}}>
        <Image source={require('../../assets/menu.png')} style={{ width: hp('9%'), height: hp('9%'), marginTop: hp('1.25%'), position: 'absolute', left: wp('0%') }} />
        <Text style={{ textAlign: 'center', marginTop: hp('3.25%'), fontSize: hp('3.5%') }}>{ title }</Text>
        <TouchableOpacity onPress={() => { setSection('home'); setTitle('Home') }} style={{ width: hp('4.5%'), height: hp('4.5%'), marginTop: hp('3.5%'), position: 'absolute', right: wp('4.5%') }}>
          <Image source={require('../../assets/home.png')} style={{ width: hp('4.5%'), height: hp('4.5%') }} />
        </TouchableOpacity>
      </View>
    )
  } else if (props.location == 'bottom') {
    return (
      <View style={{ position: 'fixed', bottom: 0, width: wp('100%'),  height: hp('7.5%'), backgroundColor: '#FFFFFF', shadowColor: '#919191', shadowOffset: { height: 10, width: 0 }, shadowRadius: 4, shadowOpacity: 1}}>
        <TouchableOpacity onPress={() => { setDisplayBasket('block') }}><Text style={{ textAlign: 'center', marginTop: hp('1.5%'), fontSize: hp('3.5%') }}>£ { total.toFixed(2).toString() }</Text></TouchableOpacity>
        { renderBasket() }
        {/* useEffect(() => {
          renderBasket()
        }, [basket]) */}
      </View>
      
    )
  }
}

export default Navbar;
