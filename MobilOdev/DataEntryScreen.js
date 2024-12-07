import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DataEntryScreen = () => {
  const [patientName, setPatientName] = useState('');
  const [testType, setTestType] = useState('');
  const [result, setResult] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const loadUserEmail = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserEmail(parsedUser.email);
      }
    } catch (error) {
      console.error('Kullanıcı bilgisi yüklenirken hata oluştu:', error);
    }
  };

  useEffect(() => {
    loadUserEmail();
  }, []);

  const handleDataEntry = async () => {
    if (!patientName || !testType || !result) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    const testResults = await AsyncStorage.getItem('testResults');
    const resultsArray = testResults ? JSON.parse(testResults) : [];

    const newEntry = {
      id: (resultsArray.length + 1).toString(),
      name: patientName,
      test: testType,
      result: result,
      date: new Date().toISOString(),
      userEmail: userEmail, // Kullanıcı e-posta bilgisi ekleniyor
    };

    resultsArray.push(newEntry);
    await AsyncStorage.setItem('testResults', JSON.stringify(resultsArray));

    Alert.alert('Başarılı', 'Tahlil sonucu kaydedildi.');

    setPatientName('');
    setTestType('');
    setResult('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Veri Girişi</Text>
      <TextInput
        style={styles.input}
        placeholder="Hasta Adı"
        value={patientName}
        onChangeText={setPatientName}
      />
      <TextInput
        style={styles.input}
        placeholder="Tahlil Türü (IgA, IgM, vb.)"
        value={testType}
        onChangeText={setTestType}
      />
      <TextInput
        style={styles.input}
        placeholder="Sonuç"
        value={result}
        onChangeText={setResult}
      />
      <Button title="Kaydet" onPress={handleDataEntry} />
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
});

export default DataEntryScreen;