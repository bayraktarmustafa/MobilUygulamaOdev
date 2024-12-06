import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PatientTrackingScreen = () => {
  const [patientName, setPatientName] = useState('');
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    const storedResults = await AsyncStorage.getItem('results');
    if (storedResults) {
      const parsedResults = JSON.parse(storedResults);

      // Debugging: Verileri kontrol et
      console.log('Stored Results:', parsedResults);

      // Büyük/küçük harf duyarsız arama
      const filteredResults = parsedResults.filter(result =>
        result.name.toLowerCase() === patientName.toLowerCase()
      );
      setResults(filteredResults);

      // Eğer sonuç yoksa kullanıcıya bilgi ver
      if (filteredResults.length === 0) {
        alert('Hasta adıyla eşleşen sonuç bulunamadı.');
      }
    } else {
      alert('Henüz tahlil sonucu bulunmamaktadır.');
    }
  };

  const handleSearch = () => {
    if (!patientName) {
      alert('Lütfen hasta adını girin.');
      return;
    }
    fetchResults();
  };

  const compareResults = (currentResult, previousResult) => {
    if (!previousResult) return 'Yeni sonuç';

    const changes = [];
    if (currentResult.IgA > previousResult.IgA) changes.push('IgA: ↑');
    else if (currentResult.IgA < previousResult.IgA) changes.push('IgA: ↓');

    if (currentResult.IgM > previousResult.IgM) changes.push('IgM: ↑');
    else if (currentResult.IgM < previousResult.IgM) changes.push('IgM: ↓');

    if (currentResult.IgG > previousResult.IgG) changes.push('IgG: ↑');
    else if (currentResult.IgG < previousResult.IgG) changes.push('IgG: ↓');

    return changes.length ? changes.join(', ') : 'Değişim yok';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hasta Takibi</Text>
      <TextInput
        style={styles.input}
        placeholder="Hasta Adı"
        value={patientName}
        onChangeText={setPatientName}
      />
      <Button title="Ara" onPress={handleSearch} />
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const previousResult = results[index - 1] || null; // Önceki sonucu al
          const comparison = compareResults(item, previousResult);
          return (
            <View style={styles.resultItem}>
              <Text style={styles.resultText}>
                {item.date}: IgA: {item.IgA}, IgM: {item.IgM}, IgG: {item.IgG} ({comparison})
              </Text>
            </View>
          );
        }}
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
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  resultText: {
    fontSize: 18,
  },
});

export default PatientTrackingScreen;
