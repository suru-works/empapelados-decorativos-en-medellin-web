import * as ActionTypes from './ActionTypes';

export const Maps = (state = {
    isLoading: true,
    errMess: null,
    result: null
}, action) => {
    switch(action.type) {
        case ActionTypes.MAPS_LOADING:
            return {...state, isLoading: true, errMess: null, result: null}
        case ActionTypes.ADD_MAPS:
            return {...state, isLoading: false, errMess: null, result: action.payload};
        case ActionTypes.MAPS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}