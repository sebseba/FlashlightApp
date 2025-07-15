import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Basit Morse çeviri
const morseMap: Record<string, string> = {
  a: '.-',    b: '-...',  c: '-.-.',  d: '-..',
  e: '.',     f: '..-.',  g: '--.',   h: '....',
  i: '..',    j: '.---',  k: '-.-',   l: '.-..',
  m: '--',    n: '-.',    o: '---',   p: '.--.',
  q: '--.-',  r: '.-.',   s: '...',   t: '-',
  u: '..-',   v: '...-',  w: '.--',   x: '-..-',
  y: '-.--',  z: '--..',  ' ': '/',
};

export default function MorseScreen() {
  const [inputText, setInputText] = useState('');
  const [morseText, setMorseText] = useState('');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const navigation = useNavigation();

  const handleTranslate = () => {
    const translated = inputText
      .toLowerCase()
      .split('')
      .map(char => morseMap[char] || '')
      .join(' ');
    setMorseText(translated);
    setIsTransmitting(true);
  };

  const handlePause = () => {
    setIsTransmitting(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      {/* Geri Butonu */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={32} color="#cc66ff" />
      </TouchableOpacity>

      {/* Giriş ve Çeviri kutusu */}
      <View style={styles.box}>
        <Text style={styles.label}>Your Text</Text>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          placeholderTextColor="#aaa"
          value={inputText}
          onChangeText={setInputText}
        />
        <Text style={styles.label}>Morse Code</Text>
        <Text style={styles.morseOutput}>{morseText}</Text>
      </View>

      {/* Butonlar */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: isTransmitting ? '#aaa' : '#cc66ff' }]}
          onPress={handlePause}
        >
          <Text style={styles.buttonText}>On</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleTranslate}
        >
          <Text style={styles.buttonText}>Transmit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  box: {
    width: '100%',
    padding: 20,
    borderWidth: 2,
    borderColor: '#cc66ff',
    borderRadius: 12,
    backgroundColor: '#000',
    marginBottom: 40,
    shadowColor: '#cc66ff',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  },
  label: {
    color: '#cc66ff',
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    color: '#fff',
    borderBottomColor: '#cc66ff',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingVertical: 6,
    fontSize: 18,
  },
  morseOutput: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  controlButton: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#555',
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
