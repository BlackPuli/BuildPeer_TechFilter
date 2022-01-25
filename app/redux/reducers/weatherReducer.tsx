import { GET_WEATHER, SET_WEATHER_MODAL } from '../types/weatherTypes';

const initialState = {
  today: {},
  history: [],
  address: {},
  showWeather: false
};

interface Action {
  payload: any,
  type: string,
  address: any
}

export const weather = (state = initialState, { payload, type }: Action) => {
  switch (type) {
    case GET_WEATHER:
      return {...state, today: payload.weather.current, history: payload.weather.daily, address: payload.address};
    case SET_WEATHER_MODAL:
      return {...state, showWeather: payload};
    default:
      return state;
  }
}