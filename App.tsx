// App.tsx
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthProvider } from './src/contexts/AuthContext';  // Import AuthProvider

// Import screens và types
import { RootStackParamList } from './src/screens/auth/LoginScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import StaffScreen from './src/screens/StaffScreen';
import InventoryScreen from './src/screens/InventoryScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          switch (route.name) {
            case 'Nhân sự':
              iconName = 'account-group';
              break;
            case 'Kho':
              iconName = 'warehouse';
              break;
            default:
              iconName = 'help';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF0000',
        tabBarInactiveTintColor: '#666',
      })}
    >
      <Tab.Screen name="Nhân sự" component={StaffScreen} />
      <Tab.Screen name="Kho" component={InventoryScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthProvider>      {/* Wrap toàn bộ app với AuthProvider */}
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
              <>
                <Stack.Screen name="Login">
                  {props => (
                    <LoginScreen
                      {...props}
                      onLogin={() => setIsLoggedIn(true)}
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen name="Register" component={RegisterScreen} />
              </>
            ) : (
              <Stack.Screen name="MainApp" component={TabNavigator} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
};

export default App;