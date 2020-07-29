import * as ActionTypes from './ActionTypes';

export const Leader = (state = {
    isLoading: false,
    errMess: null,
    product: null
}, action) => {
    switch (action.type) {
        case ActionTypes.LEADER_RESET:
            return { ...state, isLoading: false, errMess: null, leader: null };
        case ActionTypes.LEADER_REQUEST:
            return { ...state, isLoading: true, errMess: null, leader: null };
        case ActionTypes.LEADER_SUCCESS:
            return { ...state, isLoading: false, errMess: null, leader: action.payload }
        case ActionTypes.LEADER_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };
        default:
            return state;
    }
}