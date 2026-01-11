import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'PickOne',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="dice" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
