import * as ActionTypes from './ActionTypes';
export const DeleteFile = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.DELETE_FILE_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.DELETE_FILE_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.DELETE_FILE_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.DELETE_FILE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}