import { SET_USERNAME, UserState } from '@redux/modules/user/user.types';
import { ActionToReducer } from '@lib/types/store.types';
import { ST_ACCESS_TOKEN, ST_USERNAME } from '@lib/constants.conts';

const anon = `Anon-${new Date().getTime()}`;

const initialState: UserState = {
  isAuth: !!localStorage.getItem(ST_ACCESS_TOKEN),
  name: localStorage.getItem(ST_USERNAME) || anon,
};

export default function (state: UserState = initialState, action: ActionToReducer): UserState {
  switch (action.type) {
    case SET_USERNAME :
      const name = action.payload;
      if (action.payload.length) {
        localStorage.setItem(ST_USERNAME, name);
      }
      return { ...state, name };
    default :
      return state;
  }
}