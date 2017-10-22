/*
 * action types
 */

export const UPDATE_CONNECTION_STATUS = 'UPDATE_CONNECTION_STATUS';

export const UPDATE_HISTORY = 'UPDATE_HISTORY';
export const ADD_HISTORY_ITEM = 'ADD_HISTORY_ITEM';
export const REMOVE_HISTORY_ITEM = 'REMOVE_HISTORY_ITEM';

export const UPDATE_HEADER_HEIGHT = 'UPDATE_HEADER_HEIGHT';

/*
 * action creators
 */

export function updateConnectionStatus( status ) {
    return { type: UPDATE_CONNECTION_STATUS, status }
}

export function updateHistory( history ) {
    return { type: UPDATE_HISTORY, history }
}

export function addHistoryItem( historyItem ) {
    return { type: ADD_HISTORY_ITEM, historyItem }
}

export function removeHistoryItem( index ) {
    return { type: REMOVE_HISTORY_ITEM, index }
}

export function updateHeaderHeight( headerHeight ) {
    return { type: UPDATE_HEADER_HEIGHT, headerHeight }
}
