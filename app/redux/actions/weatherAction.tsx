import { GET_WEATHER, SET_WEATHER_MODAL } from '../types/weatherTypes';
import { getWeather } from '../../../api';
import * as Location from 'expo-location';

export const fetchWeather =  () => {
  return async (dispatch: any) => {
    let { status } = await Location.getForegroundPermissionsAsync();
    if (status !== 'granted') {
      await Location.requestForegroundPermissionsAsync();
    }
    const {coords} = await Location.getCurrentPositionAsync({});
    const {latitude, longitude} = coords;
    const address = await Location.reverseGeocodeAsync({latitude, longitude});
    const weather = await getWeather(latitude.toString(), longitude.toString());
    dispatch({type: GET_WEATHER, payload: {weather, address: address[0]}});
  }
}

export const setWeatherModal = (show: boolean) => {
  return (dispatch: any) => {
    dispatch({type: SET_WEATHER_MODAL, payload: show})
  }
}