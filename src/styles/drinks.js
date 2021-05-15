import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
  drinksColours: {
    color: '#FFFFFF'
  },
  rowStyle: {
    width: wp('80%'),
    marginTop: hp('5%'),
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 },
    marginLeft: wp('10%'),
    display: 'flex',
    flexDirection: 'row'
  },
  optionStyle: {
    backgroundColor: '#FFFFFF',
    width: wp('100%'),
    flex: 1
  },
  touchableStyle: {
    backgroundColor: '#3131E0',
    width: '100%',
    height: hp('20%')
  },
  textStyle: {
    fontSize: hp('5%'),
    textAlign: 'center',
    lineHeight: hp('5%'),
    marginTop: hp('7.5%'),
    color: '#FFFFFF'
  },
  
  firstOptionStyle: {
    width: wp('45%'),
    minHeight: hp('6%'),
    marginTop: hp('2.5%'),
    backgroundColor: '#FFFFFF',
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 } 
  },
  secondOptionStyle: {
    width: wp('20%'),
    minHeight: hp('6%'),
    marginTop: hp('2.5%'),
    backgroundColor: '#FFFFFF',
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 } ,
    marginLeft: wp('5%')
  },
  
  infoOptionStyle: {
    width: hp('6%'),
    minHeight: hp('6%'),
    marginTop: hp('2.5%'),
    backgroundColor: '#FFFFFF',
    shadowColor: '#919191',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: { height: 0 } ,
    marginLeft: wp('5%')
  },
  
  firstTouchableStyle: {
    width: wp("45%"),
    paddingTop: hp('0.5%'),
    paddingBottom: hp('0.5%')
  },
  
  secondTouchableStyle: {
    width: wp("20%"),
    paddingTop: hp('0.5%'),
    paddingBottom: hp('0.5%')
  },
  
  infoTouchableStyle: {
    width: hp('6%')
  },
  
  drinkTextStyle: {
    textAlign: 'center',
    fontSize: hp('4.5%')
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
  },
  viewTabBackgroundStyle: {
    width: wp('100%'),
    height: hp('82.5%'),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    zIndex: 9
  }
  
  
})

export default styles;