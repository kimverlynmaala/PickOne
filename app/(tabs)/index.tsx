import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CoinFlip } from '../../components/features/CoinFlip';
import { WheelOfChoices } from '../../components/features/WheelOfChoices';
import { colors, fontSizes, spacing } from '../../constants/theme';

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
            size={24}
            color={activeTab === 'coin' ? colors.white : colors.primary}
          />
          <Text style={[styles.tabText, activeTab === 'coin' && styles.activeTabText]}>Coin Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'wheel' && styles.activeTab]}
          onPress={() => setActiveTab('wheel')}
        >
          <FontAwesome5
            name="bullseye"
            size={24}
            color={activeTab === 'wheel' ? colors.white : colors.primary}
          />
          <Text style={[styles.tabText, activeTab === 'wheel' && styles.activeTabText]}>Wheel</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.tabContent}>
        {activeTab === 'coin' ? <CoinFlip /> : <WheelOfChoices />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.container },
  header: { alignItems: 'center', marginBottom: 20 },
  title: { fontSize: fontSizes.title, fontWeight: 'bold', color: colors.text },
  subtitle: { fontSize: fontSizes.subtitle, color: colors.textMuted, marginTop: 4 },
  tabsList: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.tabPadding,
    borderRadius: 12,
    backgroundColor: colors.secondary,
  },
  activeTab: { backgroundColor: colors.primary },
  tabText: { marginLeft: 8, fontSize: fontSizes.button, fontWeight: '600', color: colors.primary },
  activeTabText: { color: colors.white },
  tabContent: { flex: 1 },
});
