import { SET_LOADER, UiState } from './ui.types';

const initialState: UiState = {
    loader: false,
};

export default function(state: UiState = initialState, action: { type: string, payload: any }) {
    switch (action.type) {
        case SET_LOADER :
            return { ...state, loader: action.payload };
        default :
            return state;
    }
}
