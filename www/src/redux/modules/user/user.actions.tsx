import { UPDATE_AUTH } from './user.types';
import { ActionToReducer } from '@lib/types/store.types';

export const setAuth = (value: boolean): ActionToReducer => ({
    type: UPDATE_AUTH,
    payload: value,
})