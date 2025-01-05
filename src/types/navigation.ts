// src/types/navigation.ts
export type RootStackParamList = {
  Auth: undefined;
  Login: {
    onLogin: () => void;
  };
  Register: undefined;
  BiometricPrompt: {
    visible: boolean;
    type: 'fingerprint' | 'face' | 'voice';
    onCancel: () => void;
    message: string;
  };
  MainApp: undefined;
};