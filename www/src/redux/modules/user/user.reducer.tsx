import { UPDATE_AUTH, UserState } from '@redux/modules/user/user.types';
import { ActionToReducer } from '@lib/types/store.types';
import { ST_ACCESS_TOKEN } from '@lib/constants.conts';

const initialState: UserState = {
  isAuth: !!localStorage.getItem(ST_ACCESS_TOKEN),
};

export default function (state: UserState = initialState, action: ActionToReducer): UserState {
  switch (action.type) {
    case UPDATE_AUTH :
      if (action.payload) {
        localStorage.setItem(ST_ACCESS_TOKEN, JSON.stringify('test_token'));
      } else {
        localStorage.clear();
      }
      return { ...state, isAuth: action.payload };
    default :
      return state;
  }
}