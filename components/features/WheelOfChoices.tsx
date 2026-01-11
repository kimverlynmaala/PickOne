import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const WheelOfChoices: React.FC = () => {
  // State variables
  const [options, setOptions] = useState<string[]>(['Option 1', 'Option 2', 'Option 3']);
  const [question, setQuestion] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // ✅ properly typed
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');

  // Rotation animation
  const rotation = useSharedValue(0);

  // Spin the wheel
  const spinWheel = () => {
    if (isSpinning || options.length < 2) return;
    setIsSpinning(true);

    const winnerIndex = Math.floor(Math.random() * options.length);
    const segmentAngle = 360 / options.length;
    const stopAngle = 720 + winnerIndex * segmentAngle;

    rotation.value = withTiming(rotation.value + stopAngle, { duration: 2500 }, () => {
      setSelectedOption(options[winnerIndex]);
      rotation.value = rotation.value % 360;
      setIsSpinning(false);
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  // Editing handlers
  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditText(options[index]);
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    const newOptions = [...options];
    newOptions[editingIndex] = editText;
    setOptions(newOptions);
    setEditingIndex(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditText('');
  };

  const deleteOption = (index: number) => {
    if (options.length <= 2) {
      Alert.alert('Minimum 2 options required');
      return;
    }
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  return (
    <View style={styles.container}>
      {/* Question Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your question (optional)"
        value={question}
        onChangeText={setQuestion}
        editable={!isSpinning}
      />

      {/* Options List */}
      <FlatList
        data={options}
        keyExtractor={(_, i) => i.toString()}
        style={{ width: '100%' }}
        renderItem={({ item, index }) => (
          <View style={styles.optionRow}>
            {editingIndex === index ? (
              <>
                <TextInput
                  style={styles.optionInput}
                  value={editText}
                  onChangeText={setEditText}
                  editable={!isSpinning}
                />
                <TouchableOpacity onPress={saveEdit}>
                  <FontAwesome5 name="check" size={20} color="green" />
                </TouchableOpacity>
                <TouchableOpacity onPress={cancelEdit}>
                  <FontAwesome5 name="times" size={20} color="red" />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.optionText}>{item}</Text>
                <View style={styles.optionIcons}>
                  <TouchableOpacity onPress={() => startEdit(index)}>
                    <FontAwesome5 name="pencil-alt" size={20} color="black" style={{ marginRight: 12 }} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteOption(index)}>
                    <FontAwesome5 name="trash" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      />

      {/* Spin Button */}
      <TouchableOpacity style={styles.button} onPress={spinWheel} disabled={isSpinning}>
        <Text style={styles.buttonText}>{isSpinning ? 'Spinning...' : 'Spin Wheel'}</Text>
      </TouchableOpacity>

      {/* Result Display */}
      <Animated.View style={[styles.resultContainer, animatedStyle]}>
        {selectedOption && (
          <LinearGradient
            colors={['#10B981', '#06B6D4']}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.resultCard}
          >
            {question ? <Text style={styles.questionText}>{question}</Text> : null}
            <Text style={styles.resultText}>{selectedOption}</Text>
          </LinearGradient>
        )}
      </Animated.View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionText: { flex: 1, fontSize: 16 },
  optionIcons: { flexDirection: 'row', alignItems: 'center' },
  optionInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'center',
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
