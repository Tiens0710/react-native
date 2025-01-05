// src/components/auth/BiometricPrompt.tsx
import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface BiometricPromptProps {
  visible: boolean;
  type: 'fingerprint' | 'face' | 'voice';
  onCancel: () => void;
  message: string;
}

const BiometricPrompt = ({ visible, type, onCancel, message }: BiometricPromptProps) => {
  const getIcon = () => {
    switch (type) {
      case 'fingerprint':
        return 'fingerprint';
      case 'face':
        return 'face-recognition';
      case 'voice':
        return 'microphone';
      default:
        return 'fingerprint';
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.container}>
        <View style={styles.prompt}>
          <Icon name={getIcon()} size={50} color="#007AFF" />
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={onCancel}
          >
            <Text style={styles.cancelText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prompt: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default BiometricPrompt;