import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchGuideScreen = () => {
  const [age, setAge] = useState('');
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);

  useEffect(() => {
    const loadGuides = async () => {
      const storedGuides = await AsyncStorage.getItem('guides');
      if (storedGuides) {
        setGuides(JSON.parse(storedGuides));
      }
    };

    loadGuides();
  }, []);

  const handleSearch = () => {
    if (age) {
      const results = guides.filter(guide => guide.age === age);
      if (results.length > 0) {
        setFilteredGuides(results);
      } else {
        alert('Girilen yaş için kılavuz bulunamadı.');
        setFilteredGuides([]);
      }
    } else {
      alert('Lütfen bir yaş girin.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kılavuz Ara</Text>
      <TextInput
        style={styles.input}
        placeholder="Yaş"
        value={age}
        keyboardType="numeric"
        onChangeText={setAge}
      />
      <Button title="Ara" onPress={handleSearch} />

      <FlatList
        data={filteredGuides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.guideContainer}>
            <Text style={styles.guideText}>
              {item.name} - Yaş: {item.age} - Min: {item.min}, Max: {item.max}
            </Text>
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
  guideContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginVertical: 5,
  },
  guideText: {
    fontSize: 16,
  },
});

export default SearchGuideScreen;
