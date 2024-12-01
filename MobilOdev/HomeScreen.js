import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useUser } from './UserContext';

export default function HomeScreen({ navigation }) {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ana Ekran</Text>
      {user && <Text>Hoşgeldin, {user.email}!</Text>}
      <Button title="Çıkış Yap" onPress={() => navigation.navigate('Login')} />
      <Button title="Test Sonuçları " onPress={() => navigation.navigate('TestList')} />
      <Button title="Profil Düzenleme İşlemleri" onPress={() => navigation.navigate('UserProfile')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});
