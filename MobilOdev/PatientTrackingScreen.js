import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const referenceRanges = {
  IgA: { low: 0, high: 400 },
  IgM: { low: 40, high: 230 },
  IgG: { low: 700, high: 1600 },
};

const getResultStatus = (testType, value) => {
  const range = referenceRanges[testType];
  if (!range) return 'Bilinmiyor';
  if (value < range.low) return 'Düşük';
  if (value > range.high) return 'Yüksek';
  return 'Normal';
};

const PatientTrackingScreen = () => {
  const [patientName, setPatientName] = useState('');
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    const storedResults = await AsyncStorage.getItem('testResults');
    if (storedResults) {
      const parsedResults = JSON.parse(storedResults);
      console.log('Stored Results:', parsedResults);


      const filteredResults = parsedResults.filter(result =>
        result.name.toLowerCase() === patientName.toLowerCase()
      );

      setResults(filteredResults);

      if (filteredResults.length === 0) {
        Alert.alert('Bilgi', 'Hasta adıyla eşleşen sonuç bulunamadı.');
      }
    } else {
      Alert.alert('Bilgi', 'Henüz tahlil sonucu bulunmamaktadır.');
    }
  };

  const handleSearch = () => {
    if (!patientName) {
      Alert.alert('Hata', 'Lütfen hasta adını girin.');
      return;
    }
    fetchResults();
  };

  const compareResults = (currentResult, previousResult) => {
    const changes = {};
    const tests = ['IgA', 'IgM', 'IgG'];

    tests.forEach(test => {
      const currentValue = currentResult.test === test ? parseFloat(currentResult.result) : null;
      const previousValue = previousResult && previousResult.test === test ? parseFloat(previousResult.result) : null;

      if (currentValue !== null && previousValue !== null) {
        if (currentValue > previousValue) {
          changes[test] = `${previousValue} → ${currentValue} ↑`;
        } else if (currentValue < previousValue) {
          changes[test] = `${previousValue} → ${currentValue} ↓`;
        } else {
          changes[test] = `${currentValue} (Değişim yok)`;
        }
      } else if (currentValue !== null && previousValue === null) {
        changes[test] = `Yeni sonuç (${currentValue})`;
      }
    });

    return changes;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hasta Takibi</Text>
      <TextInput
        style={styles.input}
        placeholder="Hasta Adı"
        value={patientName}
        onChangeText={text => setPatientName(text)}
      />
      <Button title="Ara" onPress={handleSearch} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          const previousResult = results[index - 1] || null;
          const comparison = compareResults(item, previousResult);

          return (
            <View style={styles.resultItem}>
              <Text style={styles.resultDate}>{item.date.split('T')[0]}</Text>
              <Text style={styles.resultText}>
                IgA: {item.test === 'IgA' ? item.result : '-'}, {' '}
                IgM: {item.test === 'IgM' ? item.result : '-'}, {' '}
                IgG: {item.test === 'IgG' ? item.result : '-'} {' '}
                {comparison.IgA && `IgA: ${comparison.IgA}, `}
                {comparison.IgM && `IgM: ${comparison.IgM}, `}
                {comparison.IgG && `IgG: ${comparison.IgG}`}
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
  resultDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 18,
  },
});

export default PatientTrackingScreen;
