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

    return fetch(baseBackUrl + 'users/signup', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        credentials: 'same-origin'
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
}

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

export const login = (user) => (dispatch) => {
    dispatch(loginRequest());

    return fetch(baseBackUrl + 'users/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(user)
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

    return fetch(baseBackUrl + 'users/logout', {
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('token')
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
            localStorage.removeItem('token');
            dispatch(logoutSuccess(response));
        } else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(logoutFailed(error.message)));
}

export const authenticatedQuery = () => ({
    type: ActionTypes.AUTHENTICATED_QUERY
});

export const isAuthenticated = (result) => ({
    type: ActionTypes.IS_AUTHENTICATED,
    payload: result
});

export const isNotAuthenticated = (errmess) => ({
    type: ActionTypes.IS_NOT_AUTHENTICATED,
    payload: errmess
});

export const authenticated = () => (dispatch) => {
    dispatch(authenticatedQuery());

    return fetch(baseBackUrl + 'users/authenticated', {
        credentials: "include"
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, (error) => {
        throw error;
    })
    .then(response => response.json())
    .then(response => {
        if (response.authenticated) {
            dispatch(isAuthenticated(response));
        } else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(isNotAuthenticated(error.message)));
}

export const postFeedbackRequest = () => ({
    type: ActionTypes.FEEDBACK_REQUEST
});

export const postFeedbackSuccess = (result) => ({
    type: ActionTypes.FEEDBACK_SUCCESS,
    payload: result
});

export const postFeedbackFailed = (errmess) => ({
    type: ActionTypes.FEEDBACK_FAILED,
    payload: errmess
});

export const postFeedback= (feedback) => (dispatch) => {
    dispatch(logoutRequest());
    
  
    return fetch(baseBackUrl + 'feedback', {
      method: "POST",
      body: JSON.stringify(feedback),
      headers: {
        "Content-Type": "application/json"
      },
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
      },
        error => {
          throw error;
        })
      .then(response => response.json())
      .catch(error => { console.log('post feedback', error.message); alert('Your feedback could not be posted\nError: ' + error.message); });
  };