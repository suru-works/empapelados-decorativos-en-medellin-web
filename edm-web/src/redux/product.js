import * as ActionTypes from './ActionTypes';

export const Product = (state = {
    isLoading: true,
    errMess: null,
    product: null
}, action) => {
    switch (action.type) {
        case ActionTypes.PRODUCT_REQUEST:
            return { ...state, isLoading: true, errMess: null, product: null };
        case ActionTypes.PRODUCT_SUCCESS:
            return { ...state, isLoading: false, errMess: null, product: action.payload }
        case ActionTypes.PRODUCT_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };
        default:
            return state;
    }
}