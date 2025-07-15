// react-native.config.js
module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        android: null, // 👈 JNI dosyaları olmadan build etsin
        },
      },
    },
  };
