import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const MainTabs = () => {
  
  const fetchTabs = () => {
    // return fetch(``, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(res => res.json())
    // .then(data => renderTabs(data.tabs))
    const tabs = [
      {
        id: 1,
        name: 'Test Tab',
        total: 3.75
      },
      {
        id: 999,
        name: 'Test Tab',
        total: 999.99
      }
    ]
    return renderTabs(tabs)
  }
  
  const renderTabs = (tabs) => {
    let rendering = []
    tabs.forEach((tab, idx) => {
      rendering.push(
        <View key={`Main-${tab.id}`} style={{ width: wp('90%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%'), display: 'flex', flexDirection: 'row' }}>
        
          <TouchableOpacity key={`ViewButtonId-${tab.id}`} style={{ marginLeft: wp('1.5%'), width: wp('13.5%') }} onPress={() => {  }}>
            <Text key={`TabId-${tab.id}`}style={[styles.textStyle]}>{tab.id}.</Text>
          </TouchableOpacity>
        
          <TouchableOpacity key={`ViewButtonName-${tab.id}`} style={{ marginLeft: wp('1.5%'), width: wp('30.5%') }} onPress={() => {  }}>
            <Text key={`TabName-${tab.id}`}style={[styles.textStyle]}>{tab.name}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity key={`ViewButtonTotal-${tab.id}`} style={{ marginLeft: wp('2%'), width: wp('26.5%') }} onPress={() => {  }}>
            <Text key={`TabTotal-${tab.id}`} style={[styles.textStyle, { textAlign: 'right' }]}>£{tab.total.toFixed(2)}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity key={`TabPush-${tab.id}`} style={{ width: hp('4%'), height: hp('4%'), position: 'absolute', right: wp('3%'), marginTop: hp('1.75%') }} onPress={() => {  }}>
            <Image source={require('../../../assets/addToTab.png')} style={{ width: hp('4%'), height: hp('4%'), transform: [{ rotate: '-90deg' }] }}/>
          </TouchableOpacity>
          
        </View>
      )
    })
    return rendering;
  }
  
  
  
  return (
    <View style={{ width: wp('100%'), backgroundColor: '#E9E9E9', height: hp('82.5%') }}>
      
      <View style={{ display: 'flex', flexDirection: 'row', marginBottom: wp('5%') }}>
    
        <View style={{ width: wp('42.5%'), height: hp('7.5%'), backgroundColor: '#919191', marginTop: hp('2.5%'), marginLeft: wp('5%') }}>
          <TouchableOpacity
            style={{ width: wp('42.5%'), height: hp('7.5%'), padding: 0 }}
            onPress={() => {  }}>
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

      
      { fetchTabs() }
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