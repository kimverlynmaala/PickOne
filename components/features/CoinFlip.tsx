import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export default function CoinFlip() {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  const [question, setQuestion] = useState('');
  const [choice1, setChoice1] = useState('YES');
  const [choice2, setChoice2] = useState('NO');
  const [result, setResult] = useState<string>('?');
  const [isFlipping, setIsFlipping] = useState(false);

  const coinStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateY: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));

  const flipCoin = () => {
  if (isFlipping) return;

  if (!choice1 || !choice2) {
    Alert.alert('Error', 'Please enter both choices!');
    return;
  }

  setIsFlipping(true);
  setResult('?');

  
  rotation.value = withTiming(rotation.value + 1080, { duration: 2000 });

  setTimeout(() => {
    const finalResult = Math.random() < 0.5 ? choice1 : choice2;
    setResult(finalResult);

   
    scale.value = withSpring(1.2, {}, () => {
      scale.value = withSpring(1);
    });

    setIsFlipping(false);
  }, 2000); 
};

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your question:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your question..."
        value={question}
        onChangeText={setQuestion}
      />

      <Text style={styles.label}>Choice 1:</Text>
      <TextInput
        style={styles.input}
        value={choice1}
        onChangeText={setChoice1}
      />

      <Text style={styles.label}>Choice 2:</Text>
      <TextInput
        style={styles.input}
        value={choice2}
        onChangeText={setChoice2}
      />

      <Animated.View style={[styles.coin, coinStyle]}>
        <Text style={styles.coinText}>{result}</Text>
      </Animated.View>

      <TouchableOpacity
        style={[styles.button, isFlipping && styles.buttonDisabled]}
        onPress={flipCoin}
        disabled={isFlipping}
      >
        <Text style={styles.buttonText}>
          {isFlipping ? 'FLIPPING...' : 'FLIP COIN'}
        </Text>
      </TouchableOpacity>

      {question ? (
        <Text style={styles.questionText}>❓ {question}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 5,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  coin: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backfaceVisibility: 'hidden',
  },
  coinText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#111827',
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 14,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
