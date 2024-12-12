
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateGuideScreen = () => {
  const [guideName, setGuideName] = useState('');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
   const [age, setAge] = useState('');
  const [guides, setGuides] = useState([]);

  useEffect(() => {

    const loadGuides = async () => {
      const storedGuides = await AsyncStorage.getItem('guides');
      if (storedGuides) {
        setGuides(JSON.parse(storedGuides));
      }
    };

    loadGuides();
  }, []);

  const handleCreateGuide = async () => {
    if (guideName && minValue && maxValue&& age ) {
      const newGuide = { id: Math.random().toString(), name: guideName, min: minValue, max: maxValue,age:age };
      const updatedGuides = [...guides, newGuide];


      await AsyncStorage.setItem('guides', JSON.stringify(updatedGuides));
      setGuides(updatedGuides);
      alert(`Kılavuz Oluşturuldu: ${guideName} - Yaş${age} - Min: ${minValue}, Max: ${maxValue}`);
      setGuideName('');
      setMinValue('');
      setMaxValue('');
      setAge('');
    } else {
      alert('Lütfen tüm alanları doldurun.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kılavuz Oluştur</Text>
      <TextInput
        style={styles.input}
        placeholder="Kılavuz Adı"
        value={guideName}
        onChangeText={setGuideName}
      />
      <TextInput
              style={styles.input}
              placeholder="Yaş"
              value={age}
              keyboardType="numeric"
              onChangeText={setAge}
            />
      <TextInput
        style={styles.input}
        placeholder="Min Değer"
        value={minValue}
        keyboardType="numeric"
        onChangeText={setMinValue}
      />
      <TextInput
        style={styles.input}
        placeholder="Max Değer"
        value={maxValue}
        keyboardType="numeric"
        onChangeText={setMaxValue}
      />
      <Button title="Kılavuzu Oluştur" onPress={handleCreateGuide} />

      <FlatList
        data={guides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.guideContainer}>
            <Text style={styles.guideText}>{item.name} - Yaş: {item.age} - Min: {item.min}, Max: {item.max}</Text>
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

export default CreateGuideScreen;
