import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import styles from './styles';
import Header from '../../component/generalHeader/header';

const ContactSelectedDetails = ({navigation, route}) => {
  const selectedItem = route.params.selectedItem;

  return (
    <View style={styles.container}>
      <Header
        backgroundColor={styles.header.backgroundColor}
        iconName={'chevron-left'}
        title={'Contact Details'}
        textColor={styles.headerTitle.color}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.mainView}>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Name</Text>
            <Text style={styles.detailText}>{selectedItem.name}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Organization</Text>
            <Text style={styles.detailText}>{selectedItem.organization}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Mobile Number</Text>
            <Text style={styles.detailText}>{selectedItem.phoneno}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailText}>{selectedItem.email}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Alternate Mobile Number</Text>
            <Text style={styles.detailText}>{selectedItem.altphoneno}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Submited Date</Text>
            <Text style={styles.detailText}>{selectedItem.submited_date}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Remarks</Text>
            <Text style={styles.detailText}>{selectedItem.Remarks}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactSelectedDetails;
