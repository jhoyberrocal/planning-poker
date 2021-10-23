export type UserState = {
  isAuth: boolean;
  name?: string;
  id?: string;
};

export const UPDATE_AUTH = 'UPDATE_AUTH';
export const SET_USERNAME = 'SET_USERNAME';
