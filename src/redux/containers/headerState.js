import { connect } from 'react-redux'
import {
	updateHeaderHeight,
} from 'Redux/actionTypes'

import { default as Component} from 'Src/components/Header/Header';

const mapStateToProps = state => {
    return {
        appData: () => {
            return state.appData
        },
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateHeaderHeight: (height) => {
			dispatch( updateHeaderHeight(height) )
        },
    }
}

const headerState = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);

export default headerState;
