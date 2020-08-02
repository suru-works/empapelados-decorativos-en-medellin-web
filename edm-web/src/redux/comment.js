import * as ActionTypes from './ActionTypes';

export const Comment = (state = {
    isLoading: false,
    errMess: null,
    comment: null
}, action) => {
    switch (action.type) {
        case ActionTypes.COMMENT_RESET:
            return { ...state, isLoading: false, errMess: null, comment: null };
        case ActionTypes.COMMENT_REQUEST:
            return { ...state, isLoading: true, errMess: null, comment: null };
        case ActionTypes.COMMENT_SUCCESS:
            return { ...state, isLoading: false, errMess: null, comment: action.payload }
        case ActionTypes.COMMENT_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };
        default:
            return state;
    }
}