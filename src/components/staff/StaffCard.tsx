// src/components/staff/StaffCard.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Staff } from '../../types';

interface StaffCardProps {
  staff: Staff;
  onPress: (staff: Staff) => void;
}

const StaffCard: React.FC<StaffCardProps> = ({ staff, onPress }) => {
  return (
    <Card style={styles.card} onPress={() => onPress(staff)}>
      <Card.Content>
        <Title>{staff.name}</Title>
        <Paragraph>{staff.position}</Paragraph>
        <Paragraph>{staff.department}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    elevation: 4,
  },
});

export default StaffCard;