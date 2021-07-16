import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { AppContext } from '../../contexts/AppContext.js';
import { pushNewTabToDatabase, extractBasketInfo, isLastItemInBasket, formatTabs, updateExistingTabInDatabase, removeItemFromExistingTab, addItemsToExistingTab, createNewOrder, updateReportings } from '../../components/TabLogic.js'
import { LOCALHOST_IP } from '@env'

const MainTabs = () => {
  
  const { basket, setBasket, total, setTotal } = useContext(AppContext);
  
  const [displaySingleTab, setDisplaySingleTab] = useState('none')
  const [ displayCreateTab, setDisplayCreateTab ] = useState('none')
  const [singleTabInfo, setSingleTabInfo] = useState(null)
  const [tabs, setTabs] = useState([])
  
  const [ newTabNumber, setNewTabNumber ] = useState('')
  const [ newTabName, setNewTabName ] = useState('')
  
  useEffect(() => {
    fetchTabs()
  }, [])
  
  
  const fetchTabs = () => {
    fetch(`http://${LOCALHOST_IP}:6030/api/tabs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => formatTabs(data.tabs))
    .then(tabs => setTabs(tabs))
    
  }
  
  const renderCreateTabButton = () => {
    let tabIdList = []
    tabs.forEach((tab, i) => {
      tabIdList.push(tab.id)
    });
    if (newTabName != '' && newTabNumber != '') {
      if (tabIdList.includes(parseInt(newTabNumber))) {
        return (
          <View>
          <Text style={{ textAlign: 'center', fontSize: hp('2.5%'), lineHeight: hp('2.5%'), color: '#FF0000' }}>Tab already in use</Text>
          </View>
        )
      } else if (newTabNumber > 999) {
        return (
          <View>
          <Text style={{ textAlign: 'center', fontSize: hp('2.5%'), lineHeight: hp('2.5%'), color: '#FF0000' }}>Tab Number too high (>999)</Text>
          </View>
        )
      } else {
        
        return (
          <View>
            <TouchableOpacity style={{ backgroundColor: '#E4E4E4', width: wp('40%'), height: hp('7%'), borderRadius: 4, marginLeft: wp('20%') }} onPress={() => { createTab() }}>
              <Text style={{ textAlign: 'center', fontSize: hp('3%'), marginTop: hp('2%'), lineHeight: hp('3%') }}>Create Tab</Text>
            </TouchableOpacity>
          </View>
        )
      }
      
    } else {
      return (
        <View>
        <Text style={{ textAlign: 'center', fontSize: hp('2.5%'), lineHeight: hp('2.5%'), color: '#FF0000' }}>Missing tab name or number</Text>
        </View>
      )
      
    }
  }
  
  const createTab = () => {
    pushNewTabToDatabase(newTabName, newTabNumber, total, basket)
    createNewOrder(basket, newTabNumber, total, false)
    updateReportings('GROSS_total', total)
    closeCreateTabRender()
    setBasket([])
    setTotal(0)
  }
  
  const closeCreateTabRender = () => {
    setNewTabName('')
    setNewTabNumber('')
    setDisplayCreateTab('none')
    fetchTabs()
  }
  
  const renderCreateTab = () => {
    return (
      <View style={{ display: displayCreateTab, width: wp('100%'), height: hp('82.5%'), backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', zIndex: 20 }}>
        <View style={{ position: 'absolute', right: wp('5%'), top: wp('4%') }}>
          <TouchableOpacity onPress={() => { closeCreateTabRender() }}>
            <Text style={{ fontSize: hp('5%'), color: '#FFFFFF' }}>X</Text>
          </TouchableOpacity>
        </View>
      
        <View style={styles.createTabWindowStyle}>
          <View style={{ marginBottom: hp('2.5%') }}>
            <Text style={{ fontSize: hp('3%'), textAlign: 'center' }}>Create a new tab</Text>
          </View>
          <View style={{ position: 'relative', marginBottom: hp('2.5%'), height: hp('6%') }}>
            <Text style={styles.textInputLabelStyle}>Tab Number: </Text>
            <TextInput 
              value={newTabNumber}
              onChangeText={(val) => { setNewTabNumber(val) }}
              keyboardType='numeric'
              style={styles.textInputStyle}
            />
          </View>
          <View style={{ position: 'relative', marginBottom: hp('5%'), height: hp('6%') }}>
            <Text style={styles.textInputLabelStyle}>Tab Name: </Text>
            <TextInput 
              value={newTabName}
              onChangeText={(val) => { setNewTabName(val) }}
              style={styles.textInputStyle}
            />
          </View>
          { renderCreateTabButton() }
        </View>
        
      </View>
    )
  }
  
  const renderTabs = (tabs) => {
    let rendering = []
    tabs.forEach((tab, idx) => {
      rendering.push(
        <View key={`Main-${tab.id}`} style={{ width: wp('90%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%'), display: 'flex', flexDirection: 'row' }}>
          
          <TouchableOpacity key={`Main-${tab.id}`} onPress={() => { renderSingleTabInfo(tab, idx) }} style={{ width: wp('86%'), height: hp('5%'), backgroundColor: '#919191', display: 'flex', flexDirection: 'row' }} >
            <View key={`ViewButtonId-${tab.id}`} style={{ marginLeft: wp('1.5%'), width: wp('13.5%') }}>
              <Text key={`TabId-${tab.id}`}style={[styles.textStyle]}>{tab.id}.</Text>
            </View>
          
            <View key={`ViewButtonName-${tab.id}`} style={{ marginLeft: wp('1.5%'), width: wp('30.5%') }}>
              <Text key={`TabName-${tab.id}`}style={[styles.textStyle]}>{tab.name}</Text>
            </View>
            
            <View key={`ViewButtonTotal-${tab.id}`} style={{ marginLeft: wp('2%'), width: wp('26.5%') }}>
              <Text key={`TabTotal-${tab.id}`} style={[styles.textStyle, { textAlign: 'right' }]}>£{tab.total.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
          
          
            { renderImportTabButton(tab, idx) }
          
          
        </View>
      )
    })
    return rendering;
  }
  
  const renderSingleTabInfo = (tabInfo, tabIndexPosition) => {
    const rendering = []
    // const formattedBasket = extractBasketInfo(tabInfo.basket)
    const formattedBasket = tabInfo.basket
    // const renderFormattedBasket
    setDisplaySingleTab('block')
    rendering.push(
      <View style={{ width: wp('100%'), height: hp('82.5%'), backgroundColor: 'rgba(0, 0, 0, 0.5)' }}> 
        <View style={{ width: wp('80%'), height: hp('70.5%'), marginLeft: wp('10%'), marginTop: hp('8%'), backgroundColor: '#FFFFFF' }}>
        
          <View style={{ width: wp('80%'), height: hp('7.5%'), backgroundColor: '#919191' }}>
            <Text style={{ fontSize: hp('5%'), textAlign: 'center', color: '#DBDBDB', marginTop: 0, lineHeight: hp('5%'), marginTop: hp('1.25%') }}>{tabInfo.name}</Text>
            <TouchableOpacity style={{ position: 'absolute', right: wp('2%') }} onPress={() => { setDisplaySingleTab('none'); setSingleTabInfo(null) }}><Text style={{ fontSize: hp('4%'), color: '#DBDBDB', lineHeight: hp('4%'), marginTop: hp('1.75%') }}>X</Text></TouchableOpacity>
          </View>
          <View style={{ width: wp('80%'), height: hp('2.5%'), backgroundColor: '#919191' }}> 
            <Text style={{ textAlign: 'center', color: '#DBDBDB', fontSize: hp('2%'), lineHeight: hp('2%'), marginBottom: hp('0.5%') }}>{tabInfo.id}</Text>
          </View>
          
          
          <ScrollView style={{ width: wp('80%'), paddingTop: wp('2.5%'), paddingRight: wp('2.5%'), paddingBottom: wp('2.5%'), boxSizing: 'border-box', height: hp('55%') }}>
            {renderFormattedBasket(formattedBasket, tabIndexPosition)}
          </ScrollView>
          
          
          <View style={{ paddingRight: wp('2.5%'), paddingBottom: wp('2.5%') }}>
            <Text style={{ fontSize: hp('3%'), lineHeight: hp('3%'), textAlign: 'right' }}>£{tabInfo.total.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    )
    
    setSingleTabInfo(rendering)
    
  }
  
  const renderFormattedBasket = (basket, tabIndexPosition) => {
    const rendering = []
    basket.forEach((item, idx) => {
      // console.log(item.price)
      rendering.push(
        <View style={{ marginTop: hp('1%'), height: hp('5%'), marginBottom: isLastItemInBasket(idx, basket.length) }}>
        
          <TouchableOpacity style={{ width: wp('5%'), position: 'absolute', left: wp('2%') }} onPress={() => { removeItemHandler(item.label, basket, idx, tabIndexPosition) }}>
            <Image source={require('../../../assets/delete.png')} style={{ width: hp('3%'), height: hp('3.5%'), marginTop: hp('0.5%') }}/>
          </TouchableOpacity>
          
          <Text style={{ fontSize: hp('3%'), lineHeight: hp('3%'), maxWidth: wp('10%'), position: 'absolute', left: wp('10%'), marginTop: hp('1%') }}>{item.quantity}</Text>
          
          <Text style={{ fontSize: hp('3%'), lineHeight: hp('3%'), maxWidth: wp('35%'), position: 'absolute', left: wp('20%'), marginTop: hp('1%') }}>{item.label}</Text>
          
          <Text style={{ fontSize: hp('3%'), lineHeight: hp('3%'), position: 'absolute', right: 0, marginTop: hp('1%') }}>£{(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      )
    });
    
    return rendering;
  }
  
  const removeItemHandler = (itemLabel, basket, basketIndex, currentTabIndexPosition) => {
    const [newTabList, updatedTab] = removeItemFromExistingTab(itemLabel, basket, basketIndex, currentTabIndexPosition, tabs)
    setTabs(newTabList)
    updateExistingTabInDatabase(updatedTab.name, updatedTab.id, updatedTab.total, updatedTab.basket)
    renderSingleTabInfo(tabs[currentTabIndexPosition], currentTabIndexPosition)
  }
  
  const addItemsToExistingTabHandler = (basket, tab, currentTabIndexPosition) => {
    const [updatedTabList, updatedTab] = addItemsToExistingTab(basket, tab, currentTabIndexPosition, tabs)
    createNewOrder(basket, tab.id, total, false)
    setTabs(updatedTabList) 
    updateExistingTabInDatabase(updatedTab.name, updatedTab.id, updatedTab.total, updatedTab.basket)
    updateReportings('GROSS_total', total)
    setBasket([])
    setTotal(0)

  }
  
  const renderImportTabButton = (tab, currentTabIndexPosition) => {
    if (basket.length > 0) {
      return (
        <TouchableOpacity key={`TabPush-${tab.id}`} style={{ width: hp('4%'), height: hp('4%'), position: 'absolute', right: wp('3%'), marginTop: hp('1.75%') }} onPress={() => { addItemsToExistingTabHandler(basket, tab, currentTabIndexPosition) }}>
          <Image source={require('../../../assets/addToTab.png')} style={{ width: hp('4%'), height: hp('4%'), transform: [{ rotate: '-90deg' }] }} />
        </TouchableOpacity>
      )
    } else {
      return (
        <View key={`TabPush-${tab.id}`} style={{ width: hp('4%'), height: hp('4%'), position: 'absolute', right: wp('3%'), marginTop: hp('1.75%') }} onPress={() => {  }}></View>
      )
    }
  }
  
  const renderNewTabButton = () => {
    if (basket.length > 0) {
      return (
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: wp('5%') }}>
      
          <View style={{ width: wp('42.5%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%') }}>
            <TouchableOpacity
              style={{ width: wp('42.5%'), height: hp('7.5%'), padding: 0 }}
              onPress={() => { setDisplayCreateTab('block') }}>
              <Text style={[styles.textStyle, { textAlign: 'center' }]}>New Tab</Text>
            </TouchableOpacity>
          </View>
          
          <View style={{ width: wp('42.5%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%') }}>
            <TouchableOpacity
              style={{ width: wp('42.5%'), height: hp('7.5%'), padding: 0 }}
              onPress={() => {  }}>
              <Text style={[styles.textStyle, { textAlign: 'center' }]}>UNUSED</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      )
    } else {
      return (
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: wp('5%') }}>
      
          <View style={{ width: wp('42.5%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%') }}>
            <View style={{ width: wp('42.5%'), height: hp('7.5%'), padding: 0 }}></View>
          </View>
          
          <View style={{ width: wp('42.5%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%') }}>
            <View style={{ width: wp('42.5%'), height: hp('7.5%'), padding: 0 }}></View>
          </View>
          
        </View>
      )
    }
  }
  
  
  return (
    <View style={{ width: wp('100%'), backgroundColor: '#E9E9E9', height: hp('82.5%') }}>
    
      <View style={{ display: displaySingleTab, position: 'absolute', zIndex: 20 }}>
      { singleTabInfo }
      </View>
      
      { renderCreateTab() }
      
      { renderNewTabButton() }

      
      { renderTabs(tabs) }
      
      { /*enderCreateTab() }
      { renderViewTabInfo() */}
      
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
  optionStyle: {
    width: wp('80%'),
    marginTop: hp('5%'),
    backgroundColor: '#FFFFFF',
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 } 
  },
  textStyle: {
    fontSize: hp('3%'),
    color: '#DBDBDB',
    marginTop: 0,
    lineHeight: hp('5%'),
    marginTop: hp('1.25%')
  },
  textInputStyle: { 
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
  },
  createTabWindowStyle: { 
    width: wp('90%'),
    height: hp('40%'),
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: hp('25%'),
    left: wp('5%'),
    padding: wp('5%') ,
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 } ,
    zIndex: 9
  },
  textInputLabelStyle: { 
    fontSize: hp('3%'),
    lineHeight: hp('3%'),
    marginTop: hp('1%'),
    position: 'absolute',
    textAlign: 'right', 
    width: wp('30%') 
  },
  viewTabWindowStyle: { 
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
});

export default MainTabs;