// src/navigation/MainTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import StaffScreen from '../screens/StaffScreen';
import InventoryScreen from '../screens/InventoryScreen';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
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
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen name="Nhân sự" component={StaffScreen} />
      <Tab.Screen name="Kho" component={InventoryScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;