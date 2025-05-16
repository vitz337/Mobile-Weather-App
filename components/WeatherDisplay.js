import { StyleSheet, Text, View } from 'react-native';

function WeatherDisplay({ data, unit }) {
  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.city}>{data.name}, {data.sys.country}</Text>
      <Text style={styles.temperature}>
        {Math.round(data.main.temp)}° {unit === 'metric' ? 'C' : 'F'}
      </Text>
      <Text style={styles.description}>{data.weather[0].description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 20,
    fontStyle: 'italic',
  },
});

export default WeatherDisplay;