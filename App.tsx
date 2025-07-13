import React, { useEffect, useState } from 'react';
import { Alert, Button, PermissionsAndroid, Platform, StyleSheet, View, NativeModules } from 'react-native';

const { TorchModule } = NativeModules; // ✅ Kendi native modülümüz

export default function App() {
  const [hasPermission, setHasPermission] = useState(Platform.OS !== 'android');

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

  const toggleTorch = async () => {
    if (!hasPermission) {
      Alert.alert('İzin Gerekli', 'Feneri açmak için kamera izni vermelisiniz.');
      return;
    }

    try {
      TorchModule.toggleTorch(); // ✅ Artık kendi native modülümüzü çağırıyoruz
    } catch (e) {
      Alert.alert('Flaş Hatası', (e as any)?.message || String(e));
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Feneri Aç / Kapat"
        onPress={toggleTorch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
