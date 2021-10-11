import { UPDATE_AUTH } from './user.types';

export const setAuth = (value: boolean) => ({
    type: UPDATE_AUTH,
    payload: value,
})