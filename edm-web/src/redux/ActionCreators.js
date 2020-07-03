import * as ActionTypes from './ActionTypes';
import { baseBackUrl } from '../shared/baseUrl';
import axios  from 'axios';

export const addProducts = (products) => ({
    type: ActionTypes.ADD_PRODUCTS,
    payload: products
});

export const productsLoading = () => ({
    type: ActionTypes.PRODUCTS_LOADING
});

export const productsFailed = (errmess) => ({
    type: ActionTypes.PRODUCTS_FAILED,
    payload: errmess
});

export const fetchProducts = () => (dispatch) => {
    dispatch(productsLoading());

    return fetch(baseBackUrl + 'products')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(products => dispatch(addProducts(products)))
    .catch(error => dispatch(productsFailed(error.message)));
}


export const addMaps = (maps) => ({
    type: ActionTypes.ADD_MAPS,
    payload: maps
});
export const mapsLoading = () => ({
    type: ActionTypes.MAPS_LOADING
});
export const mapsFailed = (errmess) => ({
    type: ActionTypes.MAPS_FAILED,
    payload: errmess
});

export const fetchMapsKey = () => (dispatch) => {
    dispatch(mapsLoading());

    return fetch(baseBackUrl + 'maps')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(maps => dispatch(addMaps(maps)))
    .catch(error => dispatch(mapsFailed(error.message)));
}

export const registerRequest = () => ({
    type: ActionTypes.REGISTER_REQUEST
});

export const registerSuccess = (result) => ({
    type: ActionTypes.REGISTER_SUCCESS,
    payload: result
});

export const registerFailed = (errmess) => ({
    type: ActionTypes.REGISTER_FAILED,
    payload: errmess
});
export const register = (user) => (dispatch) => {
    dispatch(registerRequest());

    return axios.post(baseBackUrl + 'users/signup', user)
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            localStorage.setItem('token', response.token);
            dispatch(registerSuccess(response));
        } else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(registerFailed(error.message)));
}
/*
export const register = (user) => (dispatch) => {
    dispatch(registerRequest());

    return fetch(baseBackUrl + 'users/signup', {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            localStorage.setItem('token', response.token);
            dispatch(registerSuccess(response));
        } else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(registerFailed(error.message)));
}*/

export const loginRequest = () => ({
    type: ActionTypes.LOGIN_REQUEST
});

export const loginSuccess = (result) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload: result
});

export const loginFailed = (errmess) => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: errmess
});

export const login = (credentials) => (dispatch) => {
    dispatch(loginRequest());

    return fetch(baseBackUrl + 'users/login', {
        method: "POST",
        body: JSON.stringify(credentials),
        
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            localStorage.setItem('token', response.token);
            dispatch(loginSuccess(response));
        } else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginFailed(error.message)));
}

export const logoutRequest = () => ({
    type: ActionTypes.LOGOUT_REQUEST
});

export const logoutSuccess = (result) => ({
    type: ActionTypes.LOGOUT_SUCCESS,
    payload: result
});

export const logoutFailed = (errmess) => ({
    type: ActionTypes.LOGOUT_FAILED,
    payload: errmess
});

export const logout = () => (dispatch) => {
    dispatch(logoutRequest());

    return fetch(baseBackUrl + 'users/logout')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => dispatch(logoutSuccess(response)))
    .catch(error => dispatch(logoutFailed(error.message)));
}