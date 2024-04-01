import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TableItem = ({item}) => (
  <View style={styles.row}>
    <Text style={styles.cell}>{item.id}</Text>
    <Text style={styles.cell}>{item.name}</Text>
    <Text style={styles.cell}>{item.phoneno}</Text>
    <Text style={styles.cell}>{item.email}</Text>
    <Text style={styles.cell}>{item.remarks}</Text>
  </View>
);

const CustomTableModel = ({data}) => (
  <View style={styles.container}>
    <View style={styles.headerRow}>
      <Text style={styles.headerCell}>Id</Text>
      <Text style={styles.headerCell}>Name</Text>
      <Text style={styles.headerCell}>phoneno</Text>
      <Text style={styles.headerCell}>Email</Text>
      <Text style={styles.headerCell}>remarks</Text>
    </View>
    {data.map((item, index) => (
      <TableItem key={index} item={item} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    color: 'white',
  },
  cell: {
    flex: 1,
    color: 'white',
  },
});

export default CustomTableModel;
