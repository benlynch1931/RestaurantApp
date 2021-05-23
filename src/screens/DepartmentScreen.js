import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styles from '../styles/drinks.js'

import { AppContext } from '../contexts/AppContext.js'

const DepartmentScreen = (props) => {
  
  const { departments, setDepartments } = useContext(AppContext);
  
  const fetchDepartments = () => {
    fetch('http://192.168.1.213:6030/api/departments', {
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
          <View style={styles.rowStyle}>
            <View style={{ ...styles.optionStyle, marginRight: wp('10%') }}>
              <TouchableOpacity style={styles.touchableStyle} onPress={() => {  }}>
                <Text style={styles.textStyle}>{ specificDepartments[idx].name }</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.optionStyle}>
              <TouchableOpacity style={styles.touchableStyle} onPress={() => {  }}>
                <Text style={{ ...styles.textStyle }}>{ specificDepartments[idx+1].name }</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      } else {
        rendering.push(
          <View style={styles.rowStyle}>
            <TouchableOpacity style={styles.touchableStyle} onPress={() => {  }}>
              <Text style={{ ...styles.textStyle }}>{ specificDepartments[idx].name }</Text>
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
