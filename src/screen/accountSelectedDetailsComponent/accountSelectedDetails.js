import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import styles from './styles';
import Header from '../../component/generalHeader/header';

const AccountSelectedDetails = ({navigation, route}) => {
  const selectedItem = route.params.selectedItem;

  return (
    <View style={styles.container}>
      <Header
        backgroundColor={styles.header.backgroundColor}
        iconName={'chevron-left'}
        title={'Account Details'}
        textColor={styles.headerTitle.color}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.mainView}>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Entity Name</Text>
            <Text style={styles.detailText}>{selectedItem.Entity_Name}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Mobile Number</Text>
            <Text style={styles.detailText}>{selectedItem.Mobile_Number}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailText}>{selectedItem.Email}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Lead_Category</Text>
            <Text style={styles.detailText}>{selectedItem.Lead_Category}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>POC</Text>
            <Text style={styles.detailText}>{selectedItem.POC}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Industry</Text>
            <Text style={styles.detailText}>{selectedItem.Industry}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Company Services</Text>
            <Text style={styles.detailText}>
              {selectedItem.companyservices}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Address</Text>
            <Text style={styles.detailText}>{selectedItem.Address}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Follow Up Date</Text>
            <Text style={styles.detailText}>{selectedItem.Follow_Up_Date}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Follow Up Time</Text>
            <Text style={styles.detailText}>{selectedItem.FollowupTime}</Text>
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

export default AccountSelectedDetails;
