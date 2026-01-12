import React from 'react';
import { StyleSheet, View } from 'react-native';
import WheelOfChoices from '../../components/features/WheelOfChoices';

export default function WheelScreen() {
  return (
    <View style={styles.container}>
      <WheelOfChoices />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
});
