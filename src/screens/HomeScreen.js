import React, { useContext, useEffect } from 'react';
import { LOCALHOST_IP } from '@env'

import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { AppContext } from '../contexts/AppContext.js';

const HomeScreen = (props) => {

  const { setSection, setTitle, setGroups, groups, setSelectedGroup } = useContext(AppContext);
  
  const optionStyle = {
    width: wp('80%'),
    marginTop: hp('5%'),
    backgroundColor: '#FFFFFF',
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 } 
  }
  
  const fetchGroups = () => {
    fetch(`http://${LOCALHOST_IP}:6030/api/groups`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(data => {
      setGroups(data.groups)
    })
  }
  
  const renderGroups = () => {
    let rendering = [];
    groups.forEach((group, idx) => {
      rendering.push(
        <View style={{ ...optionStyle, marginLeft: wp('10%') }}>
          <TouchableOpacity style={{ width: wp("80%"), paddingTop: hp('7.5%'), paddingBottom: hp('7.5%') }} onPress={() => { setSelectedGroup(group.index); setSection('view-departments'); setTitle(group.group) }}>
            <Text style={{ alignSelf: 'center', fontSize: hp('5%') }}>{ group.group }</Text>
          </TouchableOpacity>
        </View>
      )
    });
    rendering.push(
      <View style={{ ...optionStyle, marginLeft: wp('10%'), marginBottom: hp('5%') }}>
        <TouchableOpacity style={{ width: wp("80%"), paddingTop: hp('7.5%'), paddingBottom: hp('7.5%') }} onPress={() => { setSection('view-tabs'); setTitle('Tabs') }}>
          <Text style={{ alignSelf: 'center', fontSize: hp('5%') }}>TABS</Text>
        </TouchableOpacity>
      </View>
    )
    return rendering;
  }
  
  useEffect(() => {
    fetchGroups()
  }, [])


  return (
    <ScrollView style={{ width: wp('100%'), backgroundColor: '#E9E9E9', height: hp('82.5%') }}>
    
      { renderGroups() }
    
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
