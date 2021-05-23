import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


import { AppContext } from '../../contexts/AppContext.js';
import { TabContext } from '../../contexts/TabContext.js';

const MainTabs = (props) => {

  const { setSection, setTitle, basket, total, removeFromTotal, removeFromBasket, addToTotal, addToBasket } = useContext(AppContext);
  const { 
    tabs, addTab,
    isCurrentTab, setIsCurrentTab,
    currentTabNumber, setCurrentTabNumber,
    currentTabName, setCurrentTabName,
    viewTabInfo, setViewTabInfo 
  } = useContext(TabContext);
  const [ createTabRendering, setCreateTabRendering ] = useState('none')
  const [ viewTabRendering, setViewTabRendering ] = useState('none')
  const [ newTabNumber, setNewTabNumber ] = useState('1')
  const [ newTabName, setNewTabName ] = useState(`Table ${newTabNumber}`)
  const [ deleteTabView, setDeleteTabView ] = useState(false)
  
  
  const exportTab = (selectedTab) => {
    let tabIndexToExport = tabs.indexOf(selectedTab)
    addToTotal(tabs[tabIndexToExport].total)
    addToBasket(tabs[tabIndexToExport].basket)
    setIsCurrentTab(true)
    setCurrentTabNumber(tabs[tabIndexToExport].number)
    setCurrentTabName(tabs[tabIndexToExport].name)
    
    if (tabs.length > 1) {
      let tabToAlter = tabs
      tabToAlter.splice(tabIndexToExport, 1)
      addTab(tabToAlter)
    } else {
      addTab([])
    }
  }
  
  const importToTab = (selectedTab) => {
    let tabToUpdate = tabs[tabs.indexOf(selectedTab)]
    let newTabs = tabs.splice(tabs.indexOf(selectedTab), 1)
    addTab(newTabs)
    tabToUpdate = {
      name: tabToUpdate.name,
      number: tabToUpdate.number,
      basket: [...tabToUpdate.basket, ...basket],
      total: tabToUpdate.total + total
    };
    addTab([
      ...tabs,
      tabToUpdate
    ])
    removeFromTotal(0)
    removeFromBasket([])
  }
  
  const createTab = () => {
    addTab([
      ...tabs,
      {
        name: newTabName || currentTabName,
        number: newTabNumber || currentTabNumber,
        basket: basket,
        total: total
      }
    ]);
    removeFromTotal(0)
    removeFromBasket([])
    setNewTabName('')
    setNewTabNumber('')
    setIsCurrentTab(false)
    setCurrentTabNumber(null)
    setCurrentTabName(null)
    setCreateTabRendering('none')
  }
  
  const closeCreateTabRender = () => {
    setNewTabName('')
    setNewTabNumber('')
    setCreateTabRendering('none')
  }
  
  const renderCreateTab = () => {
    return (
      <View style={{ display: createTabRendering, width: wp('100%'), height: hp('82.5%'), backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute' }}>
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
  
  const viewTab = (selectedTab) => {
    setViewTabInfo(selectedTab)
    setViewTabRendering('block')
    setNewTabName(currentTabName)
    setNewTabNumber(currentTabNumber)
  }
  
  const closeViewTabInfoRender = () => {
    setViewTabInfo({
      name: '',
      number: '',
      basket: [],
      total: 0
    })
    setViewTabRendering('none')
  }
  
  const renderViewTabInfo = () => {
    return (
      <View style={{ display: viewTabRendering, width: wp('100%'), height: hp('82.5%'), backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', zIndex: 9 }}>
        <View style={{ position: 'absolute', right: wp('5%'), top: wp('4%') }}>
          <TouchableOpacity onPress={() => { closeViewTabInfoRender() }}>
            <Text style={{ fontSize: hp('5%'), color: '#FFFFFF' }}>X</Text>
          </TouchableOpacity>
        </View>
      
        <View style={styles.viewTabWindowStyle}>
          <Text style={{ position: 'absolute', fontSize: hp('3%'), left: wp('2.5%'), top: wp('2.5%'), lineHeight: hp('3%') }}>{ viewTabInfo.number }</Text>
          <Text style={{ fontSize: hp('6%'), textAlign: 'center', lineHeight: hp('6%'), marginTop: hp('2%') }}>{ viewTabInfo.name }</Text>
          
          <View style={[{ width: wp('80%'), height: hp('58%'), zIndex: 10, backgroundColor: '#FFFFFF' }]}>
            
            <ScrollView style={{ width: wp('80%'), height: hp('62%'), paddingTop: hp('1%') }}>{ RenderTabItems() }</ScrollView>
            <View style={{ position: 'absolute', width: wp('90%'), height: hp('5%'), bottom: hp('5%'), paddingRight: wp('5%') }}><Text style={{ textAlign: 'right', fontSize: hp('3%'), right: wp('10%') }}>£ { viewTabInfo.total.toFixed(2) }</Text></View>
          </View>
          
        </View>
        
      </View>
    )
  }
  
  const RenderTabItems = () => {
    let render = []
    viewTabInfo.basket.forEach((item, idx) => {
      render.push(
        <View style={{ position: 'relative', height: hp('5%') }}>

          
          <View style={{ position: 'absolute', left: wp('5%') }}>
            <Text style={{ fontSize: hp('3%') }}>1 x {item[0]}</Text>
          </View>
          
          <View style={{ position: 'absolute', right: wp('5%') }}>
            <Text style={{ fontSize: hp('3%') }}>£ {item[1].toFixed(2)}</Text>
          </View>
        </View>
      )
    });
    return render  
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
  
  const renderTabs = (whatRendering) => {
    let rendering = []
    if (whatRendering == 'view') {
      if (total != 0 && basket.length != 0) {
        tabs.forEach((tab, idx) => {
          rendering.push(
            <View style={{ width: wp('90%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%') }}>
              <Text style={[styles.textStyle, { position: 'absolute', marginLeft: wp('2%'), maxWidth: wp('30%'), marginRight: wp('5%') }]}>{tab.name}</Text>
              <Text style={[styles.textStyle, { textAlign: 'center', marginRight: wp('5%') }]}>£ {tab.total.toFixed(2)}</Text>
              <TouchableOpacity style={{ width: hp('4%'), height: hp('4%'), position: 'absolute', right: wp('4%'), marginTop: hp('1.75%') }} onPress={() => { importToTab(tab) }}>
                <Image source={require('../../../assets/addToTab.png')} style={{ width: hp('4%'), height: hp('4%') }}/>
              </TouchableOpacity>
            </View>
          )
        });
      } else {
        tabs.forEach((tab, idx) => {
          rendering.push(
            <View style={{ width: wp('90%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%') }}>
            
              <TouchableOpacity style={{ position: 'absolute', marginLeft: wp('2%'), maxWidth: wp('30%') }} onPress={() => { viewTab(tab) }}>
                <Text style={[styles.textStyle]}>{tab.name}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => { viewTab(tab) }}>
                <Text style={[styles.textStyle, { textAlign: 'center' }]}>£ {tab.total.toFixed(2)}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={{ width: hp('4%'), height: hp('4%'), position: 'absolute', right: wp('8%') + hp('4%'), marginTop: hp('1.75%') }} onPress={() => { exportTab(tab) }}>
                <Image source={require('../../../assets/exportTab_BLACK.png')} style={{ width: hp('4%'), height: hp('4%') }}/>
              </TouchableOpacity>
              
            </View>
          )
        });
      }
    } else {
      tabs.forEach((tab, idx) => {
        rendering.push(
          <View style={{ width: wp('90%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%') }}>
            <Text style={[styles.textStyle, { position: 'absolute', marginLeft: wp('2%'), maxWidth: wp('30%'), marginRight: wp('5%') }]}>{tab.name}</Text>
            <Text style={[styles.textStyle, { textAlign: 'center', marginRight: wp('5%') }]}>£ {tab.total.toFixed(2)}</Text>
            <TouchableOpacity style={{ width: hp('4%'), height: hp('4%'), position: 'absolute', right: wp('4%'), marginTop: hp('1.75%') }} onPress={() => { deleteTabEvent(tab) }}>
              <Text style={{ fontSize: hp('3%'), textAlign:  'right', color: '#FFFFFF' }}>X</Text>
            </TouchableOpacity>
          </View>
        )
      });
    }
    return rendering;
  }
  
  const RenderUpdateButton = () => {
    if (isCurrentTab != false && currentTabNumber != null) {
      return (
        <View style={{ width: wp('42.5%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%') }}>
        <TouchableOpacity
          style={{ width: wp('42.5%'), height: hp('7.5%'), padding: 0 }}
          onPress={() => { updateTab() }}>
          <Text style={[styles.textStyle, { textAlign: 'center' }]}>Update Tab</Text>
        </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={{ width: wp('42.5%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%') }}>
          <Text style={[styles.textStyle, { textAlign: 'center' }]}></Text>
        </View>
      )
    }
  }
  
  const updateTab = () => {
    createTab()
  }
  
  const deleteTabEvent = (tabToDelete) => {
    let tabIndexToExport = tabs.indexOf(tabToDelete)
    if (tabs.length > 1) {
      let tabToAlter = tabs
      tabToAlter.splice(tabIndexToExport, 1)
      addTab(tabToAlter)
    } else {
      addTab([])
    }
  }
  
  const renderDeleteTab = () => {
    return (
      <View style={{ width: wp('42.5%'), height: hp('7.5%'), backgroundColor: '#919191', marginLeft: wp('5%') }}>
        <TouchableOpacity
          style={{ width: wp('42.5%'), height: hp('7.5%'), padding: 0 }}
          onPress={() => { setDeleteTabView(true) }}>
          <Text style={[styles.textStyle, { textAlign: 'center' }]}>Delete Tabs</Text>
        </TouchableOpacity>
      </View>
    )
  }


  if (deleteTabView == false) {
    return (
      <View style={{ width: wp('100%'), backgroundColor: '#E9E9E9', height: hp('82.5%') }}>
        
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: wp('5%') }}>
      
          <View style={{ width: wp('42.5%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%') }}>
            <TouchableOpacity
              style={{ width: wp('42.5%'), height: hp('7.5%'), padding: 0 }}
              onPress={() => { setCreateTabRendering('block') }}>
              <Text style={[styles.textStyle, { textAlign: 'center' }]}>New Tab</Text>
            </TouchableOpacity>
          </View>
          
          { RenderUpdateButton() }
          
        </View>
        
        <View style={{ marginBottom: hp('5%') }}>
        
          { renderDeleteTab() }
          
        </View>
        
        { renderTabs('view') }
        { renderCreateTab() }
        { renderViewTabInfo() }
        
      </View>
    )
  } else {
    return (
      <View style={{ width: wp('100%'), backgroundColor: '#E9E9E9', height: hp('82.5%') }}>
        
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: hp('5%') }}>
      
          { RenderUpdateButton() }
          
          <View style={{ width: wp('42.5%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%') }}>
            <TouchableOpacity
              style={{ width: wp('42.5%'), height: hp('7.5%'), padding: 0 }}
              onPress={() => { setDeleteTabView(false) }}>
              <Text style={[styles.textStyle, { textAlign: 'center' }]}>Close</Text>
            </TouchableOpacity>
          </View>
          
        </View>

        { renderTabs('delete') }
        
      </View>
    )
  }
  
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
