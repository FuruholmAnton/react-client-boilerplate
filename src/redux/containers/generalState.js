import { connect } from 'react-redux'
import {
    updateConnectionStatus,
    updateHistory,
    addHistoryItem,
	removeHistoryItem,
} from 'Redux/actionTypes'

import Layout from 'Src/Layout'

const mapStateToProps = state => {
    return {
        appData: () => {
            return state.appData
        },
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateConnectionStatus: status => {
            dispatch( updateConnectionStatus(status) )
        },
        updateHistory: history => {
            dispatch( updateHistory(history) )
        },
        addHistoryItem: historyItem => {
            dispatch( addHistoryItem(historyItem) )
        },
        removeHistoryItem: (index = 1) => {
			dispatch( removeHistoryItem(index) )
        },
    }
}

const generalState = connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout)

export default generalState
