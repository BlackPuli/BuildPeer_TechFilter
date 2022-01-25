import { View, Text, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { completeTask, setCompleteModal } from '../../redux/actions/todoAction';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  index: number
}

export default function TodoCompleteModal({index}: Props) {
  const dispatch = useDispatch();

  const show = useSelector(state => state.todo.showComplete)

  const setCompletedTask = () => {
    dispatch(completeTask(index));
    closeModal();
  }

  const closeModal = () => {
    dispatch(setCompleteModal(false));
  }

  return (
    <Modal visible={show} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={closeModal} style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Ionicons name='md-close-outline' size={32}></Ionicons>
          </TouchableOpacity>
          <Image
            source={require('./../../assets/img/warning.png')}
            style={styles.image}
            resizeMode='cover'
          />
          <Text style={styles.title}>¿Estás seguro?</Text>
          <Text style={styles.text}>Esta acción no puede ser revertida</Text>
          <View style={styles.buttonSection}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={closeModal}>
              <Text>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.createButton]} onPress={setCompletedTask}>
              <Text>Si, terminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center'
  },
  modalContent: {
    backgroundColor: '#f5f5f5',
    marginHorizontal: 5,
    borderRadius: 5
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 15,
    paddingHorizontal: 20,
    flexGrow: 1,
    alignItems:'center'
  },
  cancelButton: {
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2
  },
  createButton: {
    backgroundColor: '#F6CA44'
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent:'space-around',
    marginBottom: 15
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16,
    marginTop: 10
  },
  image: {
    width: 120,
    height: 120,
    alignSelf:'center'
  }
});
