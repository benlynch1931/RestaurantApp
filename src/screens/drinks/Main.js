import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { DrinkContext } from '../../contexts/DrinkContext.js';
import { AppContext } from '../../contexts/AppContext.js';

import styles from '../../styles/drinks.js'

const Main = (props) => {
  
  const { setScreen } = useContext(DrinkContext)
  const { setTitle } = useContext(AppContext)
  

  
  return (
    <ScrollView style={{ width: wp('100%'), backgroundColor: '#E9E9E9', height: hp('82.5%') }}>
    
    
    {/* ROW 1 */}
    <View style={styles.rowStyle}>
    
      <View style={{ ...styles.optionStyle, marginRight: wp('10%') }}>
        <TouchableOpacity style={[styles.touchableStyle]} onPress={() => { setScreen('ales'); setTitle('Ales') }}>
          <Text style={styles.textStyle}>Ales</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.optionStyle}>
        <TouchableOpacity style={styles.touchableStyle} onPress={() => { setScreen('ciders'); setTitle('Ciders') }}>
          <Text style={styles.textStyle}>Ciders</Text>
        </TouchableOpacity>
      </View>
      
    </View>
    
    
    {/* ROW 2 */}
    <View style={styles.rowStyle}>
    
      <View style={{ ...styles.optionStyle, marginRight: wp('10%') }}>
        <TouchableOpacity style={styles.touchableStyle} onPress={() => { setScreen('lagers'); setTitle('Lagers') }}>
          <Text style={styles.textStyle}>Lagers</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.optionStyle}>
        <TouchableOpacity style={styles.touchableStyle} onPress={() => { setScreen('softs'); setTitle('Soft Drinks') }}>
          <Text style={[styles.textStyle, { marginTop: hp('5%') }]}>Soft Drinks</Text>
          </TouchableOpacity>
      </View>
      
    </View>
    
    
    {/* ROW 3 */}
    <View style={{ ...styles.rowStyle, marginLeft: wp('10%'), marginBottom: hp('5%') }}>
    
      <View style={{ ...styles.optionStyle, marginRight: wp('10%') }}>
        <TouchableOpacity style={styles.touchableStyle} onPress={() => { setScreen('spirits'); setTitle('Spirits') }}>
          <Text style={styles.textStyle}>Spirits</Text>
        </TouchableOpacity>
      </View>
    
      <View style={styles.optionStyle}>
        <TouchableOpacity style={styles.touchableStyle} onPress={() => { setScreen('wines-main'); setTitle('Wines') }}>
          <Text style={styles.textStyle}>Wines</Text>
        </TouchableOpacity>
      </View>
    </View>
    
    </ScrollView>
  )
}

export default Main;