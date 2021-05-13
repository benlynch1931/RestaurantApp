import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


import { AppContext } from '../../contexts/AppContext.js';
import { TabContext } from '../../contexts/TabContext.js';

const MainTabs = (props) => {

  const { setSection, setTitle, basket, total, removeFromTotal, removeFromBasket, addToTotal, addToBasket } = useContext(AppContext);
  const { tabs, addTab } = useContext(TabContext);
  const [ createTabRendering, setCreateTabRendering ] = useState('none')
  // const [ displayCreateTabButton, setDisplayCreateTabButton ] = useState('block')
  const [ newTabNumber, setNewTabNumber ] = useState('1')
  const [ newTabName, setNewTabName ] = useState(`Table ${newTabNumber}`)
  
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
    marginTop: hp('1.25%')
  }
  
  const textInputStyle = { 
    backgroundColor: '#E4E4E4',
    width: wp('25%'),
    height: hp('5%'),
    shadowColor: '#919191',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    fontSize: hp('3%'),
    position: 'absolute',
    right: 0
  }
  
  const createTabWindowStyle = { 
    width: wp('90%'),
    height: hp('40%'),
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: hp('25%'),
    left: wp('5%'),
    boxSizing: 'border-box',
    padding: wp('5%') ,
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 } ,
    zIndex: 9
  }
  
  const textInputLabelStyle = { 
    fontSize: hp('3%'),
    lineHeight: hp('3%'),
    marginTop: hp('1%'),
    position: 'absolute',
    textAlign: 'right', 
    width: wp('30%') 
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
  
  const importToTab = (selectedTab) => {
    
  }
  
  const createTab = () => {
    addTab([
      ...tabs,
      {
        name: newTabName,
        number: newTabNumber,
        basket: basket,
        total: total
      }
    ]);
    removeFromTotal(0)
    removeFromBasket([])
    setNewTabName('')
    setNewTabNumber('')
    setCreateTabRendering('none')
  }
  
  const closeCreatTabRender = () => {
    setNewTabName('')
    setNewTabNumber('')
    setCreateTabRendering('none')
    
  }
  
  const renderCreateTab = () => {
    return (
      <View style={{ display: createTabRendering, width: wp('100%'), height: hp('82.5%'), backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute' }}>
        <View style={{ position: 'absolute', right: wp('5%'), top: wp('4%') }}>
          <TouchableOpacity onPress={() => { closeCreatTabRender() }}>
            <Text style={{ fontSize: hp('5%'), color: '#FFFFFF' }}>X</Text>
          </TouchableOpacity>
        </View>
      
        <View style={createTabWindowStyle}>
          <View style={{ marginBottom: hp('2.5%') }}>
            <Text style={{ fontSize: hp('3%'), textAlign: 'center' }}>Create a new tab</Text>
          </View>
          <View style={{ position: 'relative', marginBottom: hp('2.5%'), height: hp('6%') }}>
            <Text style={textInputLabelStyle}>Tab Number: </Text>
            <TextInput 
              value={newTabNumber}
              onChangeText={(val) => { setNewTabNumber(val) }}
              keyboardType='numeric'
              style={textInputStyle}
            />
          </View>
          <View style={{ position: 'relative', marginBottom: hp('5%'), height: hp('6%') }}>
            <Text style={textInputLabelStyle}>Tab Name: </Text>
            <TextInput 
              value={newTabName}
              onChangeText={(val) => { setNewTabName(val) }}
              style={textInputStyle}
            />
          </View>
          { renderCreateTabButton() }
        </View>
        
      </View>
    )
  }
  
  const renderCreateTabButton = () => {
    if (newTabName != '' && newTabNumber != '') {
      return (
        <View>
          <TouchableOpacity style={{ backgroundColor: '#E4E4E4', width: wp('40%'), height: hp('7%'), borderRadius: 4, marginLeft: wp('20%') }} onPress={() => { createTab() }}>
            <Text style={{ textAlign: 'center', fontSize: hp('3%'), marginTop: hp('2%'), lineHeight: hp('3%') }}>Create Tab</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (null)
    }
  }
  
  const renderTabs = () => {
    let rendering = []
    if (total != 0 && basket.length != 0) {
      tabs.forEach((tab, idx) => {
        rendering.push(
          <View style={{ width: wp('90%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%') }}>
            <Text style={[textStyle, { position: 'absolute', marginLeft: wp('2%'), maxWidth: wp('30%'), marginRight: wp('5%') }]}>{tab.name}</Text>
            <Text style={[textStyle, { textAlign: 'center', marginRight: wp('5%') }]}>£ {tab.total.toFixed(2)}</Text>
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
            style={{ width: wp('42.5%'), height: hp('7.5%'), padding: 0 }}
            onPress={() => { setCreateTabRendering('block') }}>
            <Text style={[textStyle, { textAlign: 'center' }]}>New Tab</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{ width: wp('42.5%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%') }}>
          <Text>{ test }</Text>
        </View>
        
      </View>
      
      { renderCreateTab() }
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
