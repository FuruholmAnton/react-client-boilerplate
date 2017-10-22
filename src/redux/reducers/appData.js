import {
    UPDATE_CONNECTION_STATUS,
    UPDATE_HISTORY,
    ADD_HISTORY_ITEM,
	REMOVE_HISTORY_ITEM,
	UPDATE_HEADER_HEIGHT,
} from 'Redux/actions/appActions';

const initialState = {
    connectionStatus: false,
	history: [],
	headerHeight: 0,
}

export function appData(state = initialState, action) {

    switch (action.type) {
        case UPDATE_CONNECTION_STATUS:
            return {
                ...state,
                connectionStatus: action.status.connectionStatus
			}

        // TODO: Make it update history instead of add/remove
        case UPDATE_HISTORY:
            return {
                ...state,
                history: action.history
			}

		case ADD_HISTORY_ITEM:
            return {
                ...state,
                history: [
                    ...state.history,
                    action.historyItem
                ]
			}

		case REMOVE_HISTORY_ITEM:
            return {
                ...state,
                history: [
                    ...state.history.slice(0, state.history.length - action.index),
                ]
			}

		case UPDATE_HEADER_HEIGHT:
            return {
                ...state,
                headerHeight: action.headerHeight,
			}

        default:
            return state
    }

}
