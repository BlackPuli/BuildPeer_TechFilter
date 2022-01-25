import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, setTaskModal } from '../../redux/actions/todoAction';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import moment from 'moment';


export default function TodoAddModal() {
  const dispatch = useDispatch();

  const show = useSelector(state => state.todo.show);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [pickerDate, setPickerDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  

  const closeModal = () => {
    setTitle('');
    setDate('');
    setPickerDate(new Date());
    dispatch(setTaskModal(false));
  }

  const createTask = () => {
    if (title !== '' && date !== '') {
      dispatch(addTask({title, date}));
      closeModal();
    } else {
      Alert.alert('Todos los campos son necesarios.');
    }
  }

  const onPickerChangeDate = (event, newDate?: Date) => {
    setShowDatePicker(false);
    setDate(moment(newDate).format('YYYY/MM/DD'));
    setPickerDate(newDate || new Date());
  }

  return (
    <Modal visible={show} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexGrow: 1}}></View>
            <Text style={styles.title}>Mi lista por hacer</Text>
            <View style={{flexGrow: 1}}>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name='md-close-outline' size={32} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginHorizontal: 15, marginBottom: 20}}>
            <View style={{marginVertical: 20}}>
              <TextInput 
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder='Nombre de la actividad'
              ></TextInput>
            </View>
            <View style={styles.input}>
              <TouchableOpacity 
                onPress={() => {setShowDatePicker(true)}} 
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
              >
                <TextInput
                  value={date}
                  placeholder='aaaa/mm/dd'
                  editable={false}
                ></TextInput>
                <Ionicons name='md-calendar-outline' size={25}></Ionicons>
              </TouchableOpacity >
              {showDatePicker && 
              <DateTimePicker 
                value={pickerDate}
                mode="date"
                display="calendar"
                onChange={onPickerChangeDate}
              ></DateTimePicker>}
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 15}}>
            <TouchableOpacity onPress={closeModal} style={[styles.cancelButton, styles.button]}>
              <Text style={{fontWeight: 'bold'}}>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={createTask} style={[styles.createButton, styles.button]}>
              <Text style={{fontWeight: 'bold'}}>Crear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 15,
    flexGrow: 10
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 10
  },
  cancelButton: {
    paddingHorizontal: 50,
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2
  },
  createButton: {
    paddingHorizontal: 10,
    backgroundColor: '#F6CA44'
  },
  modalContainer: {
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center'
  },
  modalContent: {
    backgroundColor: '#f5f5f5',
    marginHorizontal: 5,
    borderRadius: 5
  }
});