import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  headerView: backgroundColor => ({
    backgroundColor: backgroundColor,
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
  }),
  iconStyle: {
    marginLeft: 5,
  },
  headerTxt: textColor => ({
    color: textColor,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  }),
});
