import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const CoinFlip: React.FC = () => {
  // State variables
  const [option1, setOption1] = useState<string>('Yes');
  const [option2, setOption2] = useState<string>('No');
  const [question, setQuestion] = useState<string>('');
  const [result, setResult] = useState<string | null>(null); // ✅ properly typed
  const [isFlipping, setIsFlipping] = useState<boolean>(false);

  // Animated rotation
  const rotation = useSharedValue(0);

  const flipCoin = () => {
    if (isFlipping) return; // Prevent multiple flips
    setIsFlipping(true);

    // Randomly choose winner
    const random = Math.random() < 0.5 ? 0 : 180;

    // Animate rotation
    rotation.value = withTiming(rotation.value + 720 + random, { duration: 2000 }, () => {
      // Update result after animation
      setResult(random === 0 ? option1 : option2);
      rotation.value = rotation.value % 360; // reset rotation
      setIsFlipping(false);
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      {/* Question Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your question (optional)"
        value={question}
        onChangeText={setQuestion}
        editable={!isFlipping}
      />

      {/* Coin Options */}
      <View style={styles.optionsContainer}>
        <TextInput
          style={styles.optionInput}
          value={option1}
          onChangeText={setOption1}
          editable={!isFlipping}
        />
        <TextInput
          style={styles.optionInput}
          value={option2}
          onChangeText={setOption2}
          editable={!isFlipping}
        />
      </View>

      {/* Flip Button */}
      <TouchableOpacity style={styles.button} onPress={flipCoin} disabled={isFlipping}>
        <Text style={styles.buttonText}>{isFlipping ? 'Flipping...' : 'Flip Coin'}</Text>
      </TouchableOpacity>

      {/* Result Display */}
      <Animated.View style={[styles.resultContainer, animatedStyle]}>
        {result && (
          <LinearGradient
            colors={['#A855F7', '#EC4899']}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.resultCard}
          >
            {question ? <Text style={styles.questionText}>{question}</Text> : null}
            <Text style={styles.resultText}>{result}</Text>
          </LinearGradient>
        )}
      </Animated.View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center' },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  optionsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  optionInput: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultContainer: { marginTop: 16, alignItems: 'center' },
  resultCard: {
    padding: 24,
    borderRadius: 16,
    minWidth: 200,
    alignItems: 'center',
  },
  questionText: { fontStyle: 'italic', marginBottom: 8, color: '#fff' },
  resultText: { fontSize: 48, fontWeight: 'bold', color: '#fff' },
});
