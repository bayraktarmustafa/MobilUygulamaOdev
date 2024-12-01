import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DataEntryScreen from './DataEntryScreen';
import CreateGuideScreen from './CreateGuideScreen';
import PatientTrackingScreen from './PatientTrackingScreen';
import SearchGuideScreen from './SearchGuideScreen';
const AdminScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Paneli</Text>
       <Button title="Kılavuz Oluşturma" onPress={() => navigation.navigate('CreateGuide')} />
      <Button title="Veri Girişi" onPress={() => navigation.navigate('DataEntry')} />
      <Button title="Hasta Takibi" onPress={() => navigation.navigate('PatientTracking')} />
      <Button title="Kılavuz Ara" onPress={() => navigation.navigate('SearchGuide')} />


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
});

export default AdminScreen;
