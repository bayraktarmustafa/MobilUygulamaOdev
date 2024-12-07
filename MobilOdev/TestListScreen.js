import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
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

const getStatusColor = (status) => {
  switch (status) {
    case 'Düşük': return '#FF5733';
    case 'Normal': return '#4CAF50';
    case 'Yüksek': return '#FFC107';
    default: return '#000000';
  }
};

const TestListScreen = () => {
  const [testResults, setTestResults] = useState([]);
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

  const loadTestResults = async () => {
    try {
      const storedResults = await AsyncStorage.getItem('testResults');
      if (storedResults) {
        const allResults = JSON.parse(storedResults);


        const userResults = allResults.filter(
          (result) => result.userEmail === userEmail
        );

        setTestResults(userResults);

        if (userResults.length === 0) {
          Alert.alert('Bilgi', 'Henüz kayıtlı tahlil sonucu bulunmamaktadır.');
        }
      } else {
        Alert.alert('Bilgi', 'Henüz kayıtlı tahlil sonucu bulunmamaktadır.');
      }
    } catch (error) {
      console.error('Tahlil sonuçları yüklenirken hata oluştu:', error);
    }
  };

  useEffect(() => {
    loadUserEmail();
  }, []);

  useEffect(() => {
    if (userEmail) {
      loadTestResults();
    }
  }, [userEmail]);

  const renderItem = ({ item }) => {
    const status = getResultStatus(item.test, parseFloat(item.result));
    const statusColor = getStatusColor(status);
    return (
      <View style={styles.item}>
        <Text style={styles.patientName}>Hasta Adı: {item.name}</Text>
        <Text style={styles.testType}>Tahlil Türü: {item.test}</Text>
        <Text style={[styles.result, { color: statusColor }]}>
          Sonuç: {item.result} ({status})
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geçmiş Tahliller</Text>
      <FlatList
        data={testResults}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    flexGrow: 1,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  testType: {
    fontSize: 14,
    color: '#555',
  },
  result: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TestListScreen;
