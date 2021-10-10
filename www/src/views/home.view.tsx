import React from 'react';
import { useDispatch } from 'react-redux';
import { SET_LOADER } from '@redux/modules/ui/ui.types';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

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
            <h1>Home 2</h1>
            <Link to="/login">Login</Link>
            <Button onClick={setLoader}>Show Loader</Button>
        </React.Fragment>
    );
}