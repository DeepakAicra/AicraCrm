import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#054767',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  detailContainer: {
    marginBottom: 20,
  },
  detailLabel: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    color: '#666666',
    fontSize: 16,
  },
});

export default styles;
