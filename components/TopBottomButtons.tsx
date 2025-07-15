import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // App.tsx ile aynı klasördeyse



export default function TopBottomButtons() {
    
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
    <>
      {/* Top Left - Settings */}
      <TouchableOpacity
        style={[styles.button, styles.topLeft]}
        onPress={() => console.log('Settings tıklandı')}
      >
        <Ionicons name="settings-outline" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Top Right - No Ads */}
      <TouchableOpacity
        style={[styles.button, styles.topRight]}
        onPress={() => console.log('No Ads tıklandı')}
      >
        <Ionicons name="close-circle-outline" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Left - Morse */}
      <TouchableOpacity
        style={[styles.button, styles.bottomLeft]}
        onPress={() => navigation.navigate('Morse')}
      >
        <Ionicons name="flash-outline" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Right - Screen Light */}
      <TouchableOpacity
        style={[styles.button, styles.bottomRight]}
        onPress={() => console.log('Renk seçici açılacak')}
      >
        <Ionicons name="color-palette-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    backgroundColor: '#1a1a1aCC',
    padding: 12,
    borderRadius: 30,
    elevation: 6,
  },
  topLeft: {
    top: 40,
    left: 20,
  },
  topRight: {
    top: 40,
    right: 20,
  },
  bottomLeft: {
    bottom: 80,
    left: 20,
  },
  bottomRight: {
    bottom: 80,
    right: 20,
  },
});
