import { ADD_TASK, COMPLETE_TASK, SET_COMPLETE_MODAL, SET_TASK_MODAL } from '../types/todoTypes';

const initialState = {
  tasks: [],
  show: false,
  showComplete: false
};

interface Action {
  payload: any,
  type: string
}

export const todo = ( state = initialState, { payload, type } : Action) => {
  switch (type) {
    case ADD_TASK:
      return {...state, tasks: [
        ...state.tasks,
        payload
        ]
      };
    case COMPLETE_TASK:
      return { ...state, tasks: state.tasks.filter((task, index) => index !== payload)};
    case SET_TASK_MODAL:
      return {...state, show: payload};
    case SET_COMPLETE_MODAL:
      return {...state, showComplete: payload}
    default:
      return state;
  }
}