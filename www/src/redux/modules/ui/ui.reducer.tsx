import { SET_LOADER, UiState } from './ui.types';
import { ActionToReducer } from '@lib/types/store.types';

const initialState: UiState = {
    loader: false,
};

export default function(state: UiState = initialState, action: ActionToReducer): UiState {
    switch (action.type) {
        case SET_LOADER :
            return { ...state, loader: action.payload };
        default :
            return state;
    }
}
