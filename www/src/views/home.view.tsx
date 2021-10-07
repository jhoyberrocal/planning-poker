import React from 'react';
import { useDispatch } from 'react-redux';
import { SET_LOADER } from '~/src/redux/modules/ui/ui.types';
import Button from '@mui/material/Button';

export default function HomeView() {
    const dispatch = useDispatch();
    const setLoader = () => {
        dispatch({ type: SET_LOADER, payload: true });
        setTimeout(() => {
            dispatch({ type: SET_LOADER, payload: false });
        }, 3000);
    }
    return (
        <React.Fragment>
            <h1>Home</h1>
            <Button onClick={setLoader}>Show Loader</Button>
        </React.Fragment>
    );
}