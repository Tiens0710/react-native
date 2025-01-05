import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BiometricButton from '../../components/auth/BiometricButton';
import CustomInput from '../../components/auth/CustomInput';
import BiometricUtils from '../../utils/biometrics';

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
    MainApp: undefined;
  };
  
type Props = NativeStackScreenProps<RootStackParamList, 'Login'> & {
    onLogin: () => void;
  };
  
  const LoginScreen = ({ navigation, onLogin }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
  
    useEffect(() => {
      checkBiometricSupport();
    }, []);
  
    const checkBiometricSupport = async () => {
      try {
        const { available, biometryType } = await BiometricUtils.checkBiometricSupport();
        console.log('Biometrics available:', available, biometryType);
      } catch (error) {
        console.error('Biometrics check error:', error);
      }
    };
  
    const handleBiometricAuth = async (type: 'fingerprint' | 'face' | 'voice') => {
      try {
        const success = await BiometricUtils.authenticateWithBiometric(type);
        if (success) {
          Alert.alert('Thành công', `Xác thực ${type} thành công`);
          onLogin();
        } else {
          Alert.alert('Thất bại', 'Xác thực không thành công');
        }
      } catch (error) {
        console.error('Biometric auth error:', error);
        Alert.alert('Lỗi', `Không thể xác thực bằng ${type}`);
      }
    };
  
    const handleLogin = () => {
      if (!email || !password) {
        Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
        return;
      }
      // Kiểm tra đăng nhập (trong thực tế sẽ gọi API)
      if (email === 'admin@example.com' && password === '123456') {
        onLogin();
      } else {
        Alert.alert('Lỗi', 'Email hoặc mật khẩu không đúng');
      }
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={require('../../assets/images/godaco.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Đăng nhập nhanh với sinh trắc học</Text>

      <View style={styles.biometricContainer}>
        <BiometricButton
          icon="fingerprint"
          label="Vân tay"
          onPress={() => handleBiometricAuth('fingerprint')}
        />
        <BiometricButton
          icon="face-recognition"
          label="Khuôn mặt"
          onPress={() => handleBiometricAuth('face')}
        />
        <BiometricButton
          icon="microphone"
          label="Giọng nói"
          onPress={() => handleBiometricAuth('voice')}
        />
      </View>

      <Text style={styles.dividerText}>HOẶC ĐĂNG NHẬP VỚI</Text>

      <View style={styles.inputContainer}>
        <CustomInput
          value={email}
          onChangeText={setEmail}
          placeholder="Nhập email của bạn"
          keyboardType="email-address"
        />

        <CustomInput
          value={password}
          onChangeText={setPassword}
          placeholder="Nhập mật khẩu"
          secureTextEntry
        />

        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <Icon 
              name={rememberMe ? "checkbox-marked" : "checkbox-blank-outline"}
              size={20}
              color="#666"
            />
            <Text style={styles.checkboxText}>Ghi nhớ đăng nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.registerContainer}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>
            Chưa có tài khoản? 
            <Text style={styles.registerLink}> Đăng ký ngay</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  biometricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  dividerText: {
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: 8,
    color: '#666',
  },
  forgotPassword: {
    color: '#FF0000',
  },
  loginButton: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    alignItems: 'center',
  },
  registerText: {
    color: '#666',
  },
  registerLink: {
    color: '#FF0000',
  },
});

export default LoginScreen;