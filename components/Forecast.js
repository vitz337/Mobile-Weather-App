import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Forecast({ city, unit }) {
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=1b1c8b9980e1e1e8202752469caf3dee`
        );
        const data = await response.json();

        if (response.ok) {
          const filtered = data.list.filter((_, index) => index % 8 === 0);
          setForecastData(filtered);
          setError('');
        } else {
          setForecastData([]);
          setError(data.message || 'Failed to fetch forecast.');
        }
      } catch (error) {
        setForecastData([]);
        setError('Something went wrong.');
      }
    };

    if (city) fetchForecast();
  }, [city, unit]);

  return (
    <View style={styles.forecastContainer}>
      <Text style={styles.title}>5 Day Forecast</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.cardsContainer}>
        {forecastData.map((day, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.date}>{new Date(day.dt_txt).toLocaleDateString()}</Text>
            <Text style={styles.temp}>
              {Math.round(day.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
            </Text>
            <Text style={styles.description}>{day.weather[0].description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  forecastContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    marginBottom: 5,
  },
  temp: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default Forecast;