import { createStore } from 'redux';
import rootReducer from "./reducers";
import { UiState } from '@redux/modules/ui/ui.types';

export type StoreState = {
  Ui: UiState,
};

export default createStore(rootReducer);

