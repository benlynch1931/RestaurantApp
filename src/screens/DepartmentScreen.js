import React, { useContext, useEffect } from 'react';
import { LOCALHOST_IP } from '@env'

import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styles from '../styles/drinks.js'

import { AppContext } from '../contexts/AppContext.js'

const DepartmentScreen = (props) => {
  
  const { departments, setDepartments, setSection, setSelectedDepartment, setTitle } = useContext(AppContext);
  
  const fetchDepartments = () => {
    fetch(`http://92.16.101.121:6030/api/departments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(data => {
      setDepartments(data.departments)
    })
  }
  
  const getSpecificDepartments = (groupID) => {
    let specificDepartments = [];
    departments.forEach((item, idx) => {
      if (item.group.index === groupID) {
        specificDepartments.push(item)
      }
    });
    return specificDepartments;
  }
  
  const renderDepartments = (groupID) => {
    const specificDepartments = getSpecificDepartments(groupID)
    let rendering = [];
    for (let idx=0; idx<specificDepartments.length; idx+=2) {
      // if can render two departments in a row
      if (idx <= specificDepartments.length - 2) {
        rendering.push(
          <View key={`main ${idx}-${idx+1}`} style={styles.rowStyle}>
            <View key={`eachDiv #${idx}`} style={{ ...styles.optionStyle, marginRight: wp('10%') }}>
              <TouchableOpacity key={`eachButton #${idx}`} style={styles.touchableStyle} onPress={() => { setSelectedDepartment(specificDepartments[idx].index); setSection('view-plus'); setTitle(specificDepartments[idx].name) }}>
                <Text key={`eachButtonText #${idx}`} style={styles.textStyle}>{ specificDepartments[idx].name }</Text>
              </TouchableOpacity>
            </View>
            
            <View key={`eachDiv #${idx+1}`} style={styles.optionStyle}>
              <TouchableOpacity key={`eachButton #${idx+1}`} style={styles.touchableStyle} onPress={() => { setSelectedDepartment(specificDepartments[idx+1].index); setSection('view-plus'); setTitle(specificDepartments[idx+1].name) }}>
                <Text key={`eachButtonText #${idx+1}`} style={{ ...styles.textStyle }}>{ specificDepartments[idx+1].name }</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      } else {
        rendering.push(
          <View key={`eachDiv #${idx}`} style={styles.rowStyle}>
            <TouchableOpacity key={`eachButton #${idx}`} style={styles.touchableStyle} onPress={() => { setSelectedDepartment(specificDepartments[idx].index); setSection('view-plus'); setTitle(specificDepartments[idx].name) }}>
              <Text key={`eachButtonText #${idx}`} style={{ ...styles.textStyle }}>{ specificDepartments[idx].name }</Text>
            </TouchableOpacity>
          </View>
        )
      }
    }
    return rendering;
    
  }
  
  useEffect(() => {
    fetchDepartments()
  }, [])
  
  return (
    <ScrollView style={{ width: wp('100%'), height: hp('82.5%'), backgroundColor: '#FFFFFF' }}>
    
      { renderDepartments(props.groupID) }
    
    </ScrollView>
  )
}

export default DepartmentScreen;
