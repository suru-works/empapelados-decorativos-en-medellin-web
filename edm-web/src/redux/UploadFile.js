import * as ActionTypes from './ActionTypes';

export const UploadFile = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.UPLOAD_FILE_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.UPLOAD_FILE_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.UPLOAD_FILE_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.UPLOAD_FILE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}