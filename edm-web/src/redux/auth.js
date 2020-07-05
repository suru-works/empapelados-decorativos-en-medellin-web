import * as ActionTypes from './ActionTypes';

export const Auth = (state = {
    isLoading: true,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.LOGIN_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.LOGIN_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        case ActionTypes.LOGOUT_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.LOGOUT_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.LOGOUT_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        case ActionTypes.AUTHENTICATED_QUERY:
            return {...state, isLoading: true, errMess: null, result: null};
        case ActionTypes.IS_AUTHENTICATED:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.IS_NOT_AUTHENTICATED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}