import { SET_USERNAME } from './user.types';
import { ActionToReducer } from '@lib/types/store.types';

export const setUsername = (value: string): ActionToReducer => ({
    type: SET_USERNAME,
    payload: value,
})