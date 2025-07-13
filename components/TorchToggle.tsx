import React from 'react';
import { NativeModules, Button, View, Alert } from 'react-native'; // ✅ Alert eklendi
import { requestCameraPermission } from '../src/permissions'; // doğru yoldaysa sorun yok

const { TorchModule } = NativeModules;

export default function TorchToggle() {
  const handleToggle = async () => {
    const granted = await requestCameraPermission();
    if (!granted) {
      Alert.alert('İzin Gerekli', 'Lütfen kamera izni verin.');
      return;
    }
    try {
      TorchModule.toggleTorch();
    } catch (error) {
      Alert.alert('Hata', 'Fener açılırken bir hata oluştu.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Feneri Aç / Kapat" onPress={handleToggle} />
    </View>
  );
}
