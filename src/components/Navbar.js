import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { AppContext } from '../contexts/AppContext.js';

const Navbar = (props) => {

  const { title, total } = useContext(AppContext);
  
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
        <Text style={{ textAlign: 'center', marginTop: hp('1.5%'), fontSize: hp('3.5%') }}>£ { total.toFixed(2).toString() }</Text>
      </View>
    )
  }
}

export default Navbar;
