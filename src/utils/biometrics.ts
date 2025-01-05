// src/utils/biometrics.ts
import ReactNativeBiometrics from 'react-native-biometrics';
import { Alert, PermissionsAndroid, Platform } from 'react-native';

class BiometricUtils {
  private rnBiometrics: ReactNativeBiometrics;

  constructor() {
    this.rnBiometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true
    });
  }

  async checkBiometricSupport() {
    try {
      const { available, biometryType } = await this.rnBiometrics.isSensorAvailable();
      console.log('Biometric support check:', { available, biometryType });
      if (!available) {
        Alert.alert(
          'Thông báo',
          'Thiết bị của bạn không hỗ trợ sinh trắc học hoặc chưa được cài đặt'
        );
      }
      return { available, biometryType };
    } catch (error) {
      console.error('Biometric check error:', error);
      return { available: false, biometryType: null };
    }
  }

  async authenticateWithBiometric(type: 'fingerprint' | 'face' | 'voice'): Promise<boolean> {
    try {
      const { available } = await this.checkBiometricSupport();
      if (!available) {
        throw new Error('Thiết bị không hỗ trợ sinh trắc học');
      }

      switch (type) {
        case 'fingerprint':
        case 'face':
          const { success } = await this.rnBiometrics.simplePrompt({
            promptMessage: `Xác thực bằng ${type === 'fingerprint' ? 'vân tay' : 'khuôn mặt'}`,
            cancelButtonText: 'Hủy',
            fallbackPromptMessage: 'Vui lòng sử dụng phương thức khác'
          });
          return success;

        case 'voice':
          if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
              {
                title: "Quyền truy cập microphone",
                message: "Ứng dụng cần quyền truy cập microphone để xác thực giọng nói",
                buttonNeutral: "Hỏi lại sau",
                buttonNegative: "Từ chối",
                buttonPositive: "Đồng ý"
              }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
              throw new Error('Không có quyền ghi âm');
            }
          }
          return false;

        default:
          return false;
      }
    } catch (error) {
      console.error(`${type} auth error:`, error);
      throw error;
    }
  }
}

export default new BiometricUtils();