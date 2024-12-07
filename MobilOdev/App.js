import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './UserContext';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import AdminScreen from './AdminScreen';
import CreateGuideScreen from './CreateGuideScreen';
import DataEntryScreen from './DataEntryScreen';
import PatientTrackingScreen from './PatientTrackingScreen';
import SearchGuideScreen from './SearchGuideScreen';
import TestListScreen from './TestListScreen';
import UserProfileScreen from './UserProfileScreen';
import ClearStorage from './ClearStorage';
const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Admin" component={AdminScreen} />
          <Stack.Screen name="DataEntry" component={DataEntryScreen} />
          <Stack.Screen name="CreateGuide" component={CreateGuideScreen} />
          <Stack.Screen name="PatientTracking" component={PatientTrackingScreen} />
           <Stack.Screen name="SearchGuide" component={SearchGuideScreen} />
           <Stack.Screen name="UserProfile" component={UserProfileScreen} />
           <Stack.Screen name="TestList" component={TestListScreen} />
           <Stack.Screen name="CleatStorage" component={ClearStorage} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
