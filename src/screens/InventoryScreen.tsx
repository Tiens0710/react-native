// src/screens/InventoryScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, Title } from 'react-native-paper';

const InventoryScreen = () => {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Quản lý kho</Title>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Tên sản phẩm</DataTable.Title>
          <DataTable.Title numeric>Số lượng</DataTable.Title>
          <DataTable.Title>Đơn vị</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Thức ăn A1</DataTable.Cell>
          <DataTable.Cell numeric>1000</DataTable.Cell>
          <DataTable.Cell>kg</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Thuốc XYZ</DataTable.Cell>
          <DataTable.Cell numeric>50</DataTable.Cell>
          <DataTable.Cell>lít</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 16,
  },
});

export default InventoryScreen;