import * as ActionTypes from './ActionTypes';

export const Products = (state = {
    isLoading: true,
    errMess: null,
    products: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PRODUCTS:
            return { ...state, isLoading: false, errMess: null, products: action.payload };
        case ActionTypes.PRODUCTS_LOADING:
            return { ...state, isLoading: true, errMess: null, products: [] }
        case ActionTypes.PRODUCTS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };
        case ActionTypes.PRODUCT_REQUEST:
            return { ...state, isLoading: false, errMess: null, products: action.payload };
        case ActionTypes.PRODUCT_SUCCESS:
            return { ...state, isLoading: true, errMess: null, products: [] }
        case ActionTypes.PRODUCT_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };
        default:
            return state;
    }
}