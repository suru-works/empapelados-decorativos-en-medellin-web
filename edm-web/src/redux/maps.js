import * as ActionTypes from './ActionTypes';

export const Maps = (state = {
    isLoading: true,
    errMess: null,
    maps: null
}, action) => {
    switch(action.type) {
        case ActionTypes.MAPS_LOADING:
            return {...state, isLoading: true, errMess: null, maps: null}
        case ActionTypes.ADD_MAPS:
            return {...state, isLoading: false, errMess: null, maps: action.payload};
        case ActionTypes.MAPS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
}