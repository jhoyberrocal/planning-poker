import { SET_LOADER } from './ui.types';

type UiState = {
  loader?: boolean;
};

const initialState: UiState = {
    loader: false,
};

export default function(state: UiState = initialState, action) {
    switch (action.type) {
        case (SET_LOADER) :
            return { ...state, loader: action.payload };
        default :
            return state;
    }
}
