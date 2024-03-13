import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({title, backgroundColor, textColor, onPress}) => {
  return (
    <View style={styles.headerView(backgroundColor)}>
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons
          name="arrow-left-thin"
          size={35}
          color="#fefefe"
          style={styles.iconStyle}
        />
      </TouchableOpacity>
      <Text style={styles.headerTxt(textColor)}>{title}</Text>
    </View>
  );
};

export default Header;
