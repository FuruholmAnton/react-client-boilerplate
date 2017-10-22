import {
	BrowserRouter as Router
} from 'react-router-dom';
import React from 'react';
import { withRouter } from 'react-router';

import history from 'Core/history';
import generalState from 'Redux/containers/generalState';


export default () => {
	const BlockAvoider = withRouter(generalState)

	return (
		<Router history={history}>
			<BlockAvoider />
		</Router>
	)
};
