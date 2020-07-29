import * as ActionTypes from './ActionTypes';

export const Restore = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch (action.type) {
        case ActionTypes.RESTORE_RESET:
            return { ...state, isLoading: false, errMess: null, result: null }
        case ActionTypes.RESTORE_REQUEST:
            return { ...state, isLoading: true, errMess: null, result: null }
        case ActionTypes.RESTORE_SUCCESS:
            return { ...state, isLoading: false, errMess: null, result: action.payload };
        case ActionTypes.RESTORE_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };
        default:
            return state;
    }
}