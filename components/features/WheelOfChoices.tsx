import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = Math.min(width * 0.8, 320);
const RADIUS = WHEEL_SIZE / 2;

export default function WheelOfFortune() {
  const rotation = useSharedValue(0);

  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState(['YES', 'NO', 'MAYBE']);
  const [newChoice, setNewChoice] = useState('');
  const [spinning, setSpinning] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const addChoice = () => {
    if (!newChoice.trim()) return;
    setChoices([...choices, newChoice.trim()]);
    setNewChoice('');
  };

  const removeChoice = (index: number) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const createSlice = (index: number, total: number) => {
    const angle = (2 * Math.PI) / total;
    const start = index * angle;
    const end = start + angle;

    const x1 = RADIUS + RADIUS * Math.cos(start);
    const y1 = RADIUS + RADIUS * Math.sin(start);
    const x2 = RADIUS + RADIUS * Math.cos(end);
    const y2 = RADIUS + RADIUS * Math.sin(end);

    const largeArc = angle > Math.PI ? 1 : 0;

    return `M${RADIUS},${RADIUS}
            L${x1},${y1}
            A${RADIUS},${RADIUS} 0 ${largeArc} 1 ${x2},${y2}
            Z`;
  };

  const colors = [
    '#F87171',
    '#60A5FA',
    '#34D399',
    '#FBBF24',
    '#A78BFA',
    '#F472B6',
    '#22D3EE',
    '#FCD34D',
  ];

  const spinWheel = () => {
    if (spinning) return;
    if (choices.length < 2) {
      Alert.alert('Error', 'Add at least 2 choices!');
      return;
    }

    setSpinning(true);

    const randomRotation =
      Math.floor(Math.random() * 360) + 
      (Math.floor(Math.random() * 3) + 4) * 360; 

    const startRotation = rotation.value;

    rotation.value = withTiming(
      startRotation + randomRotation,
      {
        duration: Math.floor(Math.random() * 1500) + 3500, 
        easing: Easing.out(Easing.cubic),
      },
      () => {
        setSpinning(false);
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Question:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your question..."
        value={question}
        onChangeText={setQuestion}
      />

      <Text style={styles.label}>Choices:</Text>
      {choices.map((choice, index) => (
        <View key={index} style={styles.choiceRow}>
          <Text style={styles.choiceText}>{choice}</Text>
          <TouchableOpacity onPress={() => removeChoice(index)}>
            <Text style={styles.removeText}>❌</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.addChoiceRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Add new choice"
          value={newChoice}
          onChangeText={setNewChoice}
        />
        <TouchableOpacity style={styles.addButton} onPress={addChoice}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        
        <View style={styles.pointer} />

        {/* WHEEL */}
        <Animated.View style={animatedStyle}>
          <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
            {choices.map((choice, index) => {
              const path = createSlice(index, choices.length);

              const midAngle = ((2 * Math.PI) / choices.length) * (index + 0.5);
              const textRadius = RADIUS * 0.6;
              const x = RADIUS + textRadius * Math.cos(midAngle);
              const y = RADIUS + textRadius * Math.sin(midAngle);
              const rotateText = (360 / choices.length) * (index + 0.5);

              return (
                <G key={index}>
                  <Path d={path} fill={colors[index % colors.length]} />
                  <SvgText
                    fill="#fff"
                    fontSize="18" 
                    fontWeight="bold"
                    x={x}
                    y={y}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    transform={`rotate(${rotateText} ${x} ${y})`}
                  >
                    {choice}
                  </SvgText>
                </G>
              );
            })}
          </Svg>
        </Animated.View>
      </View>

      <TouchableOpacity
        style={[styles.button, spinning && styles.buttonDisabled]}
        onPress={spinWheel}
        disabled={spinning}
      >
        <Text style={styles.buttonText}>
          {spinning ? 'SPINNING...' : 'SPIN WHEEL'}
        </Text>
      </TouchableOpacity>

      {question ? (
        <Text style={styles.questionText}>❓ {question}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40 },
  label: { fontSize: 16, fontWeight: '600', marginTop: 10 },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  choiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingVertical: 5,
  },
  choiceText: { fontSize: 16 },
  removeText: { color: 'red', fontSize: 16 },
  addChoiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 5,
  },
  addButtonText: { color: '#fff', fontWeight: '600' },

  
  pointer: {
  position: 'absolute',
  top: -14, 
  width: 0,
  height: 0,
  borderLeftWidth: 12,
  borderRightWidth: 12,
  borderTopWidth: 24, 
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderTopColor: '#111827', 
  zIndex: 10,
},


  button: {
    backgroundColor: '#111827',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontSize: 18 },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    textAlign: 'center',
  },
});
