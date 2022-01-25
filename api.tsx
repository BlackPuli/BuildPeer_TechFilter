import axios from 'axios';

const apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?'
const apiKey = 'bd597cd95a24bbfff3850e2908c3ec12';


export const getWeather = async (lat: string, lon: string) => {
  const res = await axios.get(
    `${apiUrl}&lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=metric&lang=es`,
    {
      method: 'GET',
    }
  )

  if (res.status === 200) {
    return res.data;
  }

  return null;
}