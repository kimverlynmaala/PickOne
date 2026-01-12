import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CoinFlip from '../../components/features/CoinFlip';
import WheelOfChoices from '../../components/features/WheelOfChoices';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'coin' | 'wheel'>('coin');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>PickOne</Text>
        <Text style={styles.subtitle}>A Decision Maker</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsList}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'coin' && styles.activeTab]}
          onPress={() => setActiveTab('coin')}
        >
          <FontAwesome5
            name="coins"
            size={22}
            color={activeTab === 'coin' ? '#fff' : '#6D28D9'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'coin' && styles.activeTabText,
            ]}
          >
            Coin Flip
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'wheel' && styles.activeTab]}
          onPress={() => setActiveTab('wheel')}
        >
          <FontAwesome5
            name="bullseye"
            size={22}
            color={activeTab === 'wheel' ? '#fff' : '#6D28D9'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'wheel' && styles.activeTabText,
            ]}
          >
            Wheel
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === 'coin' ? <CoinFlip /> : <WheelOfChoices />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  tabsList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
  activeTab: {
    backgroundColor: '#6D28D9',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#6D28D9',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
