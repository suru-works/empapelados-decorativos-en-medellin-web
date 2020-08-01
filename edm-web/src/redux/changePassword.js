import * as ActionTypes from './ActionTypes';

export const ChangePassword = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch (action.type) {
        case ActionTypes.CHANGEPASSWORD_RESET:
            return { ...state, isLoading: false, errMess: null, result: null }
        case ActionTypes.CHANGEPASSWORD_REQUEST:
            return { ...state, isLoading: true, errMess: null, result: null }
        case ActionTypes.CHANGEPASSWORD_SUCCESS:
            return { ...state, isLoading: false, errMess: null, result: action.payload };
        case ActionTypes.CHANGEPASSWORD_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };
        default:
            return state;
    }
}