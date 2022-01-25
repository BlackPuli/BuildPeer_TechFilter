import { View, Text, Modal, TouchableOpacity, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWeatherModal } from '../../redux/actions/weatherAction';
import { Ionicons } from '@expo/vector-icons';



const { width, height } = Dimensions.get("screen");

export default function WeatherHistoryModal() {
  const dispatch = useDispatch();

  const show = useSelector(state => state.weather?.showWeather);
  const history = useSelector(state => state.weather?.history);
  const [week, setWeek] = useState([]);

  useEffect(() => {
    if (history.length) {
      const days = history;
      days.shift()
      setWeek(days.slice(0, 5));
    }
  }, [history]);

  const closeModal = () => {
    dispatch(setWeatherModal(false));
  }

  const getIcon = (iconId: string) => {
    const iconUrl = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
    return (
      <Image source={{uri: iconUrl}} style={{width: 80, height: 80}} />
    )
  }

  const formatDate = (date: number) => {
    const normalDate = new Date(date*1000);
    let month = (normalDate.getMonth()+1).toString();
    month = month.length < 2 ? '0' + month : month; 
    const day = normalDate.getDate();
    const year = normalDate.getFullYear();

    return `${year}-${month}-${day}`

  }

  return (
    <Modal visible={show} transparent={true}>
      <View style={{flexGrow: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center'}}>
        <View style={{backgroundColor: '#f5f5f5', marginHorizontal: 5, borderRadius: 5}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexGrow: 1}}></View>
            <Text style={styles.title}>Pronóstico Clima</Text>
            <View style={{flexGrow: 1}}>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name='md-close-outline' size={32} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{backgroundColor: 'white', marginHorizontal: 10, borderRadius: 20, marginBottom: 10}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.table}>
                <View style={{flexDirection: 'row', marginVertical: 15}}>
                  <View style={styles.column}>
                    <Text style={styles.header}>Fecha</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.header}>Pronóstico</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.header}>Min</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.header}>Max</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.header}>Viento</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.header}>Humedad</Text>
                  </View>
                </View>
                <View style={{borderBottomColor: '#f0f0f0', borderBottomWidth: 2}}></View>
                  {week.map( (record, i) => (
                    <View key={i} 
                      style={{
                        flexDirection: 'row',
                        borderBottomColor: '#f0f0f0',
                        borderBottomWidth: i === week.length + 1 ? 0 : 2
                      }}
                    >
                      <View style={styles.column}>
                        <Text>{formatDate(record?.dt)}</Text>
                      </View>
                      <View style={styles.column}>
                        {getIcon(record?.weather[0].icon)}
                      </View>
                      <View style={styles.column}>
                        <Text>{record?.temp.min} ºC</Text>
                      </View>
                      <View style={styles.column}>
                        <Text>{record?.temp.max} ºC</Text>
                      </View>
                      <View style={styles.column}>
                        <Text>{record?.wind_speed} m/s</Text>
                      </View>
                      <View style={styles.column}>
                        <Text>{record?.humidity}%</Text>
                      </View>
                    </View>
                  ) )}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  column: {
    width: 110,
    alignSelf: 'center',
    alignItems: 'center'
  },
  header: {
    fontWeight: 'bold'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 15,
    flexGrow: 10
  },
  table: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 10
  }
});
