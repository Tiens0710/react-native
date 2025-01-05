// src/screens/StaffScreen.tsx
import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Searchbar, FAB } from 'react-native-paper';
import StaffCard from '../components/staff/StaffCard';
import { Staff } from '../types';

const StaffScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [staffList, setStaffList] = useState<Staff[]>([
    {
      id: '1',
      name: 'Nguyễn Hữu Tiến',
      position: 'Giám đốc',
      department: 'Ban Giám đốc'
    },
    {
      id: '2',
      name: 'Trần Toàn Trung',
      position: 'Trưởng trại',
      department: 'Khu Thạnh Hóa'
    },
  ]);

  const handleStaffPress = (staff: Staff) => {
    // Handle staff selection
    console.log('Selected staff:', staff);
  };

  const handleAddStaff = () => {
    // Navigate to add staff form
    console.log('Add new staff');
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Tìm kiếm nhân viên"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={staffList}
        renderItem={({ item }) => (
          <StaffCard staff={item} onPress={handleStaffPress} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAddStaff}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchbar: {
    margin: 8,
  },
  list: {
    padding: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default StaffScreen;