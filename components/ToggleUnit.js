import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function ToggleUnit({ unit, onToggle }) {
  const isMetric = unit === 'metric';

  return (
    <TouchableOpacity style={styles.button} onPress={onToggle}>
      <Text style={styles.buttonText}>
        {isMetric ? 'Switch to F' : 'Switch to C'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ToggleUnit;