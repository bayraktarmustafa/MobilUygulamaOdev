import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useUser } from './UserContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./assets/unilogo.png')}
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>Hoşgeldin, {user?.name || 'Kullanıcı'}!</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TestList')}
        >
          <Icon name="file-tray-full-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Test Sonuçları</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UserProfile')}
        >
          <Icon name="person-circle-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Profil Düzenleme</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={() => navigation.navigate('Login')}
        >
          <Icon name="log-out-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    padding: 20,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  menu: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '80%',
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
