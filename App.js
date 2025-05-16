import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SearchBar from './components/SearchBar';
import ToggleUnit from './components/ToggleUnit';
import WeatherDisplay from './components/WeatherDisplay';
import Forecast from './components/Forecast';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      if (!city) return;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=1b1c8b9980e1e1e8202752469caf3dee`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError('');
      } else {
        setWeatherData(null);
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      setWeatherData(null);
      setError('Failed to fetch data');
    }
  };

  useEffect(() => {
    if (city) fetchWeather();
  }, [unit, city]);

  const handleSearch = (value) => {
    setCity(value);
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <View style={styles.appContainer}>
      <SearchBar onSearch={handleSearch} />
      <View style={styles.toggleUnit}>
        <ToggleUnit unit={unit} onToggle={toggleUnit} />
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      {weatherData && (
        <>
          <WeatherDisplay data={weatherData} unit={unit} />
          <Forecast city={city} unit={unit} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  toggleUnit: {
    alignItems: 'center',
    marginVertical: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
});

export default App;