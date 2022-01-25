import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import TodoCard from '../components/todo/todoCard';
import WeatherCard from '../components/weather/weatherCard';
import { fetchWeather } from '../redux/actions/weatherAction';

export default function Main() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeather());
  }, []);
  
  return (
    <View style={{paddingTop: 30}}>
      <Text style={styles.title}>Clima</Text>
      <WeatherCard></WeatherCard>
      <Text style={styles.title}>Mi lista por hacer</Text>
      <TodoCard></TodoCard>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 15,
    marginVertical: 20
  }
});