import * as ActionTypes from './ActionTypes';

export const Register = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.REGISTER_RESET:
            return {...state, isLoading: false, errMess: null, result: null}
        case ActionTypes.REGISTER_REQUEST:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.REGISTER_SUCCESS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.REGISTER_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}