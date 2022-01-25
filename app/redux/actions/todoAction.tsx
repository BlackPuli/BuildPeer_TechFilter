import {ADD_TASK, COMPLETE_TASK, SET_COMPLETE_MODAL, SET_TASK_MODAL} from '../types/todoTypes';

interface Task {
  title: string,
  date: string
}

export const addTask = (task: Task) => {
  return (dispatch: any) => {
    dispatch({type: ADD_TASK, payload: task});
  }
};

export const completeTask = (index: number) => {
  return (dispatch: any) => {
    dispatch({type: COMPLETE_TASK, payload: index});
  }
};

export const setTaskModal = (show: boolean) => {
  return (dispatch: any) => {
    dispatch({type: SET_TASK_MODAL, payload: show});
    setCompleteModal(false);
  }
}

export const setCompleteModal = (show: boolean) => {
  return (dispatch: any) => {
    dispatch({type: SET_COMPLETE_MODAL, payload: show});
  }
}