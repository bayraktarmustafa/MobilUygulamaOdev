import React from 'react';
import { View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClearStorageScreen = () => {
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Başarılı', 'Tüm veriler başarıyla silindi.');
    } catch (error) {
      console.error('Veri silinirken hata oluştu:', error);
      Alert.alert('Hata', 'Veri silinirken bir hata oluştu.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Verileri Sıfırla" onPress={clearStorage} />
    </View>
  );
};

export default ClearStorageScreen;
