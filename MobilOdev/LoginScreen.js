import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useUser } from './UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      alert('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData);


      if (email === 'mustafa@ogr.sakarya' && password === '123456') {
        setUser(parsedUserData);
        navigation.navigate('Admin');
      }

      else if (parsedUserData.email === email && parsedUserData.password === password) {
        setUser(parsedUserData);
        navigation.navigate('Home');
      } else {
        alert('Geçersiz e-posta veya şifre');
      }
    } else {
      alert('Kullanıcı bulunamadı. Lütfen kayıt olun.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Giriş Yap</Text>
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Giriş Yap" onPress={handleLogin} />
      <Text
        style={styles.register}
        onPress={() => navigation.navigate('Register')}
      >
        Hesabınız yok mu? Kayıt Olun
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#ffffff' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#000000' },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    elevation: 3
  },
  register: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007BFF',
    fontSize: 16
  },
});
