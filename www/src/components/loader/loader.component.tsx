import React from 'react';
import { connect } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './loader.component.scss';
import { useStore } from 'react-redux';

const LoaderComponent = ({ loader }) => {
    const { Ui } = useStore().getState();
    return (
        <Backdrop open={Ui.loader} sx={{ zIndex: (theme) => theme.zIndex.drawer + 99 }}>
            <CircularProgress size={80} />
        </Backdrop>
    );
}

const mapStateToProps = (state) => {
    const { loader } = state.Ui;
    return { loader };
}

export default connect(mapStateToProps)(LoaderComponent);