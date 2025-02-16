import { UserType } from '@/utils/types';
import { StateType } from './appContext';
import { CLEAR_USER, SET_USER } from './actions';

type ActionType =
  | { type: 'SET_USER'; payload: UserType }
  | { type: 'CLEAR_USER' };

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };

    case CLEAR_USER:
      return { ...state, user: null };

    default:
      return state;
  }
};

export default reducer;
