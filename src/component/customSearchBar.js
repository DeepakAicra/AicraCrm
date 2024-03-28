import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';

const DropdownSearchBar = ({data}) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const handleInputChange = text => {
    setQuery(text);
    setShowDropdown(true); // Show dropdown when input changes
    // Filter data based on input
    const filtered = data.filter(item =>
      item.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const handleItemSelect = item => {
    setQuery(item);
    setShowDropdown(false); // Hide dropdown when item is selected
  };

  return (
    <View style={{padding: 5}}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          borderRadius: 5
        }}
        onChangeText={handleInputChange}
        value={query}
        placeholder="Type to search..."
      />
      {showDropdown && (
        <FlatList
          data={filteredData}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleItemSelect(item)}>
              <Text style={{padding: 10}}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={{maxHeight: 200, backgroundColor: 'white', elevation: 4}}
        />
      )}
    </View>
  );
};

export default DropdownSearchBar;
