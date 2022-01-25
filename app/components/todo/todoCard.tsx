import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { setCompleteModal, setTaskModal } from '../../redux/actions/todoAction';
import TodoAddModal from './todoAddModal';
import moment from 'moment';
import TodoCompleteModal from './todoCompleteModal';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import Animated from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';

interface Task {
  title: string,
  date: string
}


export default function TodoCard() {

  const dispatch = useDispatch();
  const ref = useRef<FlatList<Task>>(null);
  const initialTasks: Task[] = [];

  const tasks = useSelector(state => state.todo.tasks);
  const currentDate = new Date();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [taskList, setTaskList] = useState(initialTasks);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);
  

  const doneTask = (index: number) => {
    setSelectedIndex(index);
    dispatch(setCompleteModal(true));
  }
  

  const renderContent = ({ item, index, drag, isActive }: RenderItemParams<Task>) => {
        const taskDate = moment(item.date, 'YYYY-MM-DD');
        const todayDate = moment(currentDate.setHours(0,0,0,0));
        return (
          <ScaleDecorator>
            <Animated.View style={styles.task}>
              <Text
                style={[{backgroundColor: todayDate > taskDate ? 'red' : '#7FE087'}, styles.date]}>
                  {taskDate.format('YYYY-MM-DD')}
              </Text>
              <TouchableOpacity onPress={() => {doneTask(index || 0)}}>
                <Ionicons name='md-radio-button-off-outline' size={20} color={'blue'}></Ionicons>
              </TouchableOpacity>
              <Text style={{flexGrow: 1, marginLeft: 10}}>{item.title}</Text>
              <TouchableOpacity onLongPress={drag} disabled={isActive}>
                <Ionicons name='md-menu-outline' size={20}></Ionicons>
              </TouchableOpacity>
            </Animated.View>
          </ScaleDecorator>
        )
      }

  const showModal = () => {
    dispatch(setTaskModal(true));
  }

  return (
    <View style={styles.container}>
      <TodoAddModal></TodoAddModal>
      <TodoCompleteModal index={selectedIndex}></TodoCompleteModal>
        <DraggableFlatList
          ref={ref}
          keyExtractor={(item, i) => i.toString()+item.title+item.date}
          data={taskList}
          renderItem={renderContent}
          onDragEnd={({data}) => setTaskList(data)}
        ></DraggableFlatList>
      <TouchableOpacity style={styles.row} onPress={showModal}>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name='md-add-outline' size={25} color={'gray'} />
        </View>
        <Text style={{fontSize: 20, flexGrow: 1, color: 'gray'}}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 2,
    zIndex: 2,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  task: {
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  date: {
    position: 'absolute',
    top:-10,
    left: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: 'white'
  }
});