import moment from 'moment';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setWeatherModal } from '../../redux/actions/weatherAction';
import WeatherHistoryModal from './weatherHistoryModal';

const WeatherCard = () => {
  const dispatch = useDispatch();

  const weatherInfo = useSelector(state => state.weather);

  const [current, setCurrent] = useState();
  const [week, setWeek] = useState([]);
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(weatherInfo?.today && weatherInfo?.history.length && weatherInfo.address) {
      setCurrent(weatherInfo.today);
      setWeek(weatherInfo.history);
      setAddress(weatherInfo.address);
      setLoading(false);
    }
  }, [weatherInfo]);

  const currentDate = new Date();
  
  const getIcon = () => {
    const iconUrl = `https://openweathermap.org/img/wn/${current?.weather[0].icon}@2x.png`;
    return (
      <Image source={{uri: iconUrl}} style={{width: 80, height: 80}} />
    )
  }

  const showModal = () => {
    dispatch(setWeatherModal(true));
  }

  const capitalize = (text: string) => {
    const first = text[0].toUpperCase();
    const left = text.substring(1);
    return first + left;
  }

  return (
    loading ? 
    <ActivityIndicator size={'large'} color={'blue'}></ActivityIndicator>
    :
    <TouchableOpacity onPress={showModal}>
      <WeatherHistoryModal></WeatherHistoryModal>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={{alignItems: 'flex-start', flexDirection: 'row'}}>
            <Text style={styles.temperature}>{Math.round(current?.temp)}</Text>
            <Text style={{fontSize: 30}}>ºC</Text>
          </View>
            {getIcon()}
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.text}>{address?.name}, {address?.street}</Text>
            <Text style={styles.text}>{address?.city}</Text>
            <Text style={styles.text}>{address?.region}</Text>
          </View>
          <View>
            <Text style={[styles.text, styles.label, {textAlign: 'right'}]}>
              {capitalize(current?.weather[0].description)}
            </Text>
            <Text style={[styles.text, {color: 'gray'}]}>{moment(currentDate).format('ddd, DD MMMM')}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.text}><Text style={styles.label}>Min:</Text> {week[0]?.temp?.min} ºC</Text>
            <Text style={styles.text}><Text style={styles.label}>Max:</Text> {week[0]?.temp?.max} ºC</Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.text}><Text style={styles.label}>Viento:</Text> {current?.wind_speed} m/s</Text>
            <Text style={styles.text}><Text style={styles.label}>Humedad:</Text>  {current?.humidity}%</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 2,
    zIndex: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  temperature: {
    fontSize: 40,
    color: '#000'
  },
  text: {
    fontSize: 15
  },
  label: {
    fontWeight: 'bold'
  }
});

export default WeatherCard;