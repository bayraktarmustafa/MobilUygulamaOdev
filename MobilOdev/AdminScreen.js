import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ClearStorage } from './ClearStorage';

const AdminScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Paneli</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateGuide')}
      >
        <Text style={styles.buttonText}>Kılavuz Oluşturma</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DataEntry')}
      >
        <Text style={styles.buttonText}>Veri Girişi</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PatientTracking')}
      >
        <Text style={styles.buttonText}>Hasta Takibi</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SearchGuide')}
      >
        <Text style={styles.buttonText}>Kılavuz Ara</Text>
      </TouchableOpacity>
      <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('CleatStorage')}
            >
              <Text style={styles.buttonText}>Veri Sıfırla</Text>
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminScreen;
