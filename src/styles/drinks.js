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
    backgroundColor: '#0000FF',
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
  
  
})

export default styles;