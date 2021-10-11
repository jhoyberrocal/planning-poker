import { UPDATE_AUTH, UserState } from '@redux/modules/user/user.types';
import { ActionToReducer } from '@lib/types/store.types';

const initialState: UserState = {
  isAuth: !!localStorage.getItem('access_token'),
};

export default function (state: UserState = initialState, action: ActionToReducer) {
  switch (action.type) {
    case UPDATE_AUTH :
      if (action.payload) {
        localStorage.setItem('access_token', JSON.stringify('jhoy'));
      } else {
        localStorage.clear();
      }
      return { ...state, isAuth: action.payload };
    default :
      return state;
  }
}