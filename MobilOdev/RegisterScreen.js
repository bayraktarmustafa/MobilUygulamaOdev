import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useUser } from './UserContext';

export default function RegisterScreen({ navigation }) {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async () => {
      if (!isValidEmail(email)) {
          alert('Lütfen geçerli bir e-posta adresi girin.');
          return;
      }

      if (password.length < 6) {
          alert('Şifre en az 6 karakter olmalıdır.');
          return;
      }

      if (password !== confirmPassword) {
          alert('Şifreler uyuşmuyor.');
          return;
      }


      const userData = { name,email, password };
      await setUser(userData);
      alert('Kayıt işlemi başarılı! Giriş yapabilirsiniz.');
      navigation.navigate('Login');
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Kayıt Ol</Text>
      <TextInput
              style={styles.input}
              placeholder="Adınız"
              value={name}
              onChangeText={setName}
            />
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
      <TextInput
        style={styles.input}
        placeholder="Şifreyi Onayla"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Kayıt Ol" onPress={handleRegister} />
      <Text
        style={styles.login}
        onPress={() => navigation.navigate('Login')}
      >
        Zaten hesabınız var mı? Giriş Yapın
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#e0f7fa' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#00796b' },
  inputContainer: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#b2dfdb',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    elevation: 3
  },
  login: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007BFF',
    fontSize: 16
  },
});