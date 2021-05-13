import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { AppContext } from '../contexts/AppContext.js';

const HomeScreen = (props) => {

  const { setSection, setTitle } = useContext(AppContext);
  
  const optionStyle = {
    width: wp('80%'),
    marginTop: hp('5%'),
    backgroundColor: '#FFFFFF',
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 } 
  }


  return (
    <ScrollView style={{ width: wp('100%'), backgroundColor: '#E9E9E9', height: hp('82.5%') }}>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={{ width: wp("80%"), paddingTop: hp('7.5%'), paddingBottom: hp('7.5%') }} onPress={() => { setSection('drink'); setTitle('Drinks') }}>
          <Text style={{ alignSelf: 'center', fontSize: hp('5%') }}>Drinks</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={{ width: wp("80%"), paddingTop: hp('7.5%'), paddingBottom: hp('7.5%') }}>
          <Text style={{ alignSelf: 'center', fontSize: hp('5%') }}>Food</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
        <TouchableOpacity style={{ width: wp("80%"), paddingTop: hp('7.5%'), paddingBottom: hp('7.5%') }} onPress={() => { setSection('tab'); setTitle('Tabs') }}>
          <Text style={{ alignSelf: 'center', fontSize: hp('5%') }}>Tabs</Text>
        </TouchableOpacity>
      </View>
      
      {/*<View style={{ width: wp('100%'), height: hp('10%'), marginTop: hp('5%'), backgroundColor: '#FFFFFF'}}>
        <Text style={{ textAlign: 'center' }}>User</Text>
      </View>*/}
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  option: {
    width: wp('80%'),
    height: hp('20%'),
    backgroundColor: '#FFFFFF',
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 } 
  },
});

export default HomeScreen;
