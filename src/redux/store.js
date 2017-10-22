import { createStore } from 'redux';
import reduxApp from './reducers'

const store = createStore(
	reduxApp
);

export default store;
