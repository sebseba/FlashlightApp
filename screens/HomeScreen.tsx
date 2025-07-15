import React, { useEffect, useState } from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
  NativeModules,
  TouchableOpacity,
} from 'react-native';
import TopBottomButtons from '../components/TopBottomButtons';

const { TorchModule } = NativeModules;

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState(Platform.OS !== 'android');
  const [isTorchOn, setIsTorchOn] = useState(false);

  useEffect(() => {
    async function requestPermission() {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Kamera İzni',
            message: 'Feneri açmak için kamera izni gerekli.',
            buttonPositive: 'Tamam',
            buttonNegative: 'İptal',
          }
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      }
    }
    requestPermission();
  }, []);

  const toggleTorch = () => {
    if (!hasPermission) {
      Alert.alert('İzin Gerekli', 'Feneri açmak için kamera izni vermelisiniz.');
      return;
    }

    try {
      TorchModule.toggleTorch();
      setIsTorchOn(!isTorchOn);
    } catch (e) {
      Alert.alert('Flaş Hatası', (e as any)?.message || String(e));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.powerButton,
          { backgroundColor: isTorchOn ? '#FF61A6' : '#1a1a1a' },
        ]}
        onPress={toggleTorch}
      />
      <TopBottomButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  powerButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FF61A6',
    elevation: 12,
    shadowColor: '#FF61A6',
    shadowOpacity: 0.8,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
  },
});
