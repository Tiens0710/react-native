// src/components/auth/BiometricButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface BiometricButtonProps {
  icon: string;
  label: string;
  onPress: () => void;
}

const BiometricButton = ({ icon, label, onPress }: BiometricButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name={icon} size={24} color="#fff" />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#14213D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
  },
  text: {
    color: '#fff',
    marginTop: 5,
    fontSize: 12,
  },
});

export default BiometricButton;