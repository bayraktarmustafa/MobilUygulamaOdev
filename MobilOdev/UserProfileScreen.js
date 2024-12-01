import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfileScreen = () => {
  const [userData, setUserData] = useState({ email: '', name: '', password: '' });
  const [isEditing, setIsEditing] = useState(false);

  const loadUserData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('user');
      if (storedData) {
        setUserData(JSON.parse(storedData));
      } else {
        Alert.alert('Bilgi', 'Kullanıcı bilgileri bulunamadı.');
      }
    } catch (error) {
      console.error('Kullanıcı verileri yüklenirken hata oluştu:', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      Alert.alert('Başarılı', 'Profil bilgileriniz güncellendi.');
      setIsEditing(false);
    } catch (error) {
      console.error('Veriler kaydedilirken hata oluştu:', error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profilim</Text>
      <TextInput
        style={styles.input}
        value={userData.name}
        onChangeText={(text) => setUserData({ ...userData, name: text })}
        editable={isEditing}
        placeholder="Adınız"
      />
      <TextInput
        style={styles.input}
        value={userData.email}
        onChangeText={(text) => setUserData({ ...userData, email: text })}
        editable={isEditing}
        placeholder="E-posta"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={userData.password}
        onChangeText={(text) => setUserData({ ...userData, password: text })}
        editable={isEditing}
        placeholder="Şifre"
        secureTextEntry
      />
      {isEditing ? (
        <Button title="Kaydet" onPress={handleSaveChanges} />
      ) : (
        <Button title="Düzenle" onPress={() => setIsEditing(true)} />
      )}
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
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
});

export default UserProfileScreen;
