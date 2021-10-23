import { SET_USERNAME, UserState } from '@redux/modules/user/user.types';
import { ActionToReducer } from '@lib/types/store.types';
import { ST_ACCESS_TOKEN, ST_USERNAME, ST_USER_ID } from '@lib/constants.const';
import IO from '@lib/sockets';

const anon = `Anon-${new Date().getTime()}`;

const initialState: UserState = {
  isAuth: !!localStorage.getItem(ST_ACCESS_TOKEN),
  name: localStorage.getItem(ST_USERNAME) || anon,
  id: localStorage.getItem(ST_USER_ID) as string,
};

export default function (state: UserState = initialState, action: ActionToReducer): UserState {
  switch (action.type) {
    case SET_USERNAME :
      const name = action.payload;
      if (action.payload.length) {
        localStorage.setItem(ST_USERNAME, name);
        IO.emit('UserUpdate', { id: state.id, name });
      }
      return { ...state, name };
    default :
      return state;
  }
}