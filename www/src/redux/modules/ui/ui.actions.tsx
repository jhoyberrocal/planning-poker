import { SET_LOADER } from './ui.types';

export const setLoader = (value: boolean) => ({
    type: SET_LOADER,
    payload: value,
})