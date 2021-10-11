import { combineReducers } from 'redux';
import Ui from './modules/ui/ui.reducer';
import User from './modules/user/user.reducer';

export default combineReducers({ Ui, User });
