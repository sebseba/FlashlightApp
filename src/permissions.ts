import { PermissionsAndroid, Platform } from 'react-native';

export async function requestCameraPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') return true; // iOS için gerek yok
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Kamera İzni',
        message: 'Feneri açmak için kamera iznine ihtiyacımız var.',
        buttonNeutral: 'Daha Sonra',
        buttonNegative: 'Reddet',
        buttonPositive: 'İzin Ver',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    return false;
  }
}