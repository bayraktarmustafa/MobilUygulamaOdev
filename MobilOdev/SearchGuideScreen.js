import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchGuideScreen = () => {
  const [age, setAge] = useState('');
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);

  const fetchGuides = async () => {
    const storedGuides = await AsyncStorage.getItem('guides');
    if (storedGuides) {
      setGuides(JSON.parse(storedGuides));
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  const handleSearch = () => {
    if (!age) {
      alert('Lütfen yaşı girin.');
      return;
    }

    const results = guides.filter(guide => {
      // Burada yaşa göre kılavuz arama kriterlerinizi belirleyebilirsiniz.
      return true; // Tüm kılavuzları gösteriyor, burada yaş kontrolü eklemelisiniz.
    });

    setFilteredGuides(results);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kılavuz Ara</Text>
      <TextInput
        style={styles.input}
        placeholder="Yaş"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <Button title="Ara" onPress={handleSearch} />
      <FlatList
        data={filteredGuides}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.guideItem}>
            <Text style={styles.guideText}>{item.name}</Text>
            <Text style={styles.guideText}>Min: {item.min}, Max: {item.max}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
  guideItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  guideText: {
    fontSize: 18,
  },
});

export default SearchGuideScreen;
