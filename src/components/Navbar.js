import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { AppContext } from '../contexts/AppContext.js';

const Navbar = (props) => {

  const { title, total, basket } = useContext(AppContext);
  const [displayBasket, setDisplayBasket] = useState('none')
  
  const iterateBasketItems = () => {
    let render = []
    basket.forEach((item, idx) => {
      render.push(
        <View style={{ position: 'relative', height: hp('5%') }}>
          <View style={{ position: 'absolute', left: wp('5%') }}>
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
          <Text style={{ fontSize: hp('5%'), textAlign: 'center', color: '#DBDBDB' }}>Tab</Text>
          <TouchableOpacity style={{ position: 'absolute', right: wp('2%') }} onPress={() => { setDisplayBasket('none') }}><Text style={{ fontSize: hp('4%'), color: '#DBDBDB' }}>X</Text></TouchableOpacity>
        </View>
        
        <ScrollView style={{ width: wp('90%'), height: hp('60%'), paddingTop: hp('1%') }}>{ iterateBasketItems() }</ScrollView>
        <View style={{ position: 'absolute', width: wp('90%'), height: hp('10%'), bottom: 0, paddingRight: wp('5%') }}><Text style={{ textAlign: 'right', fontSize: hp('3%') }}>£ { total.toFixed(2) }</Text></View>
      </View>
    )
  }
  
  if (props.location == 'top') {

    return (
      <View style={{ position: 'fixed', top: 0, width: wp('100%'), height: hp('10%'), backgroundColor: '#FFFFFF', shadowColor: '#919191', shadowOffset: { height: 10, width: 0 }, shadowRadius: 4, shadowOpacity: 1}}>
        <Image source={require('../../assets/menu.png')} style={{ width: hp('9%'), height: hp('9%'), marginTop: hp('1.25%'), position: 'absolute' }} />
        <Text style={{ textAlign: 'center', marginTop: hp('3.25%'), fontSize: hp('3.5%') }}>{ title }</Text>
      </View>
    )
  } else if (props.location == 'bottom') {
    return (
      <View style={{ position: 'fixed', bottom: 0, width: wp('100%'),  height: hp('7.5%'), backgroundColor: '#FFFFFF', shadowColor: '#919191', shadowOffset: { height: 10, width: 0 }, shadowRadius: 4, shadowOpacity: 1}}>
        <TouchableOpacity onPress={() => { setDisplayBasket('block') }}><Text style={{ textAlign: 'center', marginTop: hp('1.5%'), fontSize: hp('3.5%') }}>£ { total.toFixed(2).toString() }</Text></TouchableOpacity>
        {renderBasket()}
      </View>
      
    )
  }
}

export default Navbar;
