import { combineReducers } from 'redux';

import { appData } from './reducers/appData';

const appReducer = combineReducers({
    appData,
});

const reduxApp = (state, action) => {

	return appReducer(state, action)
}

export default reduxApp;
