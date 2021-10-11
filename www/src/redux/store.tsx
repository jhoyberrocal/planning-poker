import { createStore } from 'redux';
import rootReducer from "./reducers";
import { UiState } from '@redux/modules/ui/ui.types';
import { UserState } from '@redux/modules/user/user.types';

export type StoreState = {
  Ui: UiState,
  User: UserState,
};

export default createStore(rootReducer);

