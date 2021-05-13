import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { AppContext } from '../../contexts/AppContext.js';
import { TabContext } from '../../contexts/TabContext.js';

const MainTabs = (props) => {

  const { setSection, setTitle, basket, total, removeFromTotal, removeFromBasket, addToTotal, addToBasket } = useContext(AppContext);
  const { tabs, addTab } = useContext(TabContext);
  
  const [test, setTest] = useState(null)
  
  const optionStyle = {
    width: wp('80%'),
    marginTop: hp('5%'),
    backgroundColor: '#FFFFFF',
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 } 
  }
  
  const textStyle = {
    fontSize: hp('3%'),
    color: '#DBDBDB',
    marginTop: 0,
    lineHeight: hp('5%'),
    marginTop: hp('1.25%'),
    marginRight: wp('5%')
  }
  
  const exportTab = (selectedTab) => {
    let tabIndexToExport = 0
    tabs.forEach((tab, idx) => {
      if (tab == selectedTab) {
        tabIndexToExport = idx
      }
    });
    addToTotal(tabs[tabIndexToExport].total)
    addToBasket(tabs[tabIndexToExport].basket)
    let removedTab = []
    if (tabs.length > 1) {
      removedTab = tabs.splice(tabIndexToExport, 1)
    }
    addTab(removedTab)
  }
  
  const renderTabs = () => {
    let rendering = []
    if (total != 0 && basket.length != 0) {
      tabs.forEach((tab, idx) => {
        rendering.push(
          <View style={{ width: wp('90%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%') }}>
            <Text style={[textStyle, { position: 'absolute', marginLeft: wp('2%'), maxWidth: wp('30%') }]}>{tab.name}</Text>
            <Text style={[textStyle, { textAlign: 'center' }]}>£ {tab.total.toFixed(2)}</Text>
            <TouchableOpacity style={{ width: hp('4%'), height: hp('4%'), position: 'absolute', right: wp('4%'), marginTop: hp('1.75%') }} onPress={() => { exportTab() }}>
              <Image source={require('../../../assets/addToTab.png')} style={{ width: hp('4%'), height: hp('4%') }}/>
            </TouchableOpacity>
          </View>
        )
      });
    } else {
      tabs.forEach((tab, idx) => {
        rendering.push(
          <View style={{ width: wp('90%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%') }}>
            <Text style={[textStyle, { position: 'absolute', marginLeft: wp('2%'), maxWidth: wp('30%') }]}>{tab.name}</Text>
            <Text style={[textStyle, { textAlign: 'center' }]}>£ {tab.total.toFixed(2)}</Text>
            <TouchableOpacity style={{ width: hp('4%'), height: hp('4%'), position: 'absolute', right: wp('8%') + hp('4%'), marginTop: hp('1.75%') }} onPress={() => { exportTab(tab) }}>
              <Image source={require('../../../assets/exportTab_BLACK.png')} style={{ width: hp('4%'), height: hp('4%') }}/>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: hp('4%'), height: hp('4%'), position: 'absolute', right: wp('4%'), marginTop: hp('1.75%') }} onPress={() => {  }}>
              <Image source={require('../../../assets/addToTab.png')} style={{ width: hp('4%'), height: hp('4%') }}/>
            </TouchableOpacity>
          </View>
        )
      });
    }
    return rendering;
  }


  return (
    <View style={{ width: wp('100%'), backgroundColor: '#E9E9E9', height: hp('82.5%') }}>
      
      <View style={{ display: 'flex', flexDirection: 'row', marginBottom: hp('5%') }}>
    
        <View style={{ width: wp('42.5%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%') }}>
          <TouchableOpacity
            style={{ width: wp('42.5%'), height: hp('7.5%') }}
            onPress={() => {
              addTab([
                ...tabs,
                {
                  name: 'Testing Tab',
                  basket: basket,
                  total: total
                }
              ]);
              removeFromTotal(0)
              removeFromBasket([])
            }}>
            <Text style={[textStyle, { textAlign: 'center' }]}>New Tab</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{ width: wp('42.5%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%') }}>
          <Text>{ test }</Text>
        </View>
        
      </View>
      
        
      { renderTabs() }
      
    </View>
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

export default MainTabs;
