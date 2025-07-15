import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MorseScreen from './screens/MorseScreen';

// 👉 Stack tipi tanımı
export type RootStackParamList = {
  Home: undefined;
  Morse: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Morse" component={MorseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
