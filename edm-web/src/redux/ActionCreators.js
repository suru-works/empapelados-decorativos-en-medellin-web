import * as ActionTypes from './ActionTypes';
import { baseBackUrl } from '../shared/baseUrl';
import clienteAxios from 'axios';
//----Files actions----------------------------------------------------------------------------
export const uploadFileReset = () => ({
    type: ActionTypes.UPLOAD_FILE_RESET
});

export const uploadFileRequest = () => ({
    type: ActionTypes.UPLOAD_FILE_REQUEST
});

export const uploadFileSuccess = (result) => ({
    type: ActionTypes.UPLOAD_FILE_SUCCESS,
    payload: result
});

export const uploadFileFailed = (errmess) => ({
    type: ActionTypes.UPLOAD_FILE_FAILED,
    payload: errmess
});

export const uploadFile = (data) => async (dispatch) => {
    dispatch(uploadFileRequest());
    const headers = {
        'Authorization': 'bearer ' + localStorage.getItem('token')
    }

    try {

        const res = await clienteAxios.post(baseBackUrl + data.type + data.destination, data.file, { headers: headers });
        
        dispatch(uploadFileSuccess(res));

    } catch (error) {
        dispatch(uploadFileFailed(error));

    }


    return true;


}

export const deleteFileReset = () => ({
    type: ActionTypes.DELETE_FILE_RESET
});

export const deleteFileRequest = () => ({
    type: ActionTypes.DELETE_FILE_REQUEST
});

export const deleteFileSuccess = (result) => ({
    type: ActionTypes.DELETE_FILE_SUCCESS,
    payload: result
});

export const deleteFileFailed = (errmess) => ({
    type: ActionTypes.DELETE_FILE_FAILED,
    payload: errmess
});

export const deleteFile = ({type, id, destination})=>  async (dispatch)=> {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('token')
        }
        const res = await clienteAxios.delete(baseBackUrl + type + destination + '/'+ id,{headers: headers});
        dispatch(deleteFileSuccess(res));

    } catch (error) {
        dispatch(deleteFileFailed(error));
    }
}

export const updateFileReset = () => ({
    type: ActionTypes.UPDATE_FILE_RESET
});

export const updateFileRequest = () => ({
    type: ActionTypes.UPDATE_FILE_REQUEST
});

export const updateFileSuccess = (result) => ({
    type: ActionTypes.UPDATE_FILE_SUCCESS,
    payload: result
});

export const updateFileFailed = (errmess) => ({
    type: ActionTypes.UPDATE_FILE_FAILED,
    payload: errmess
});

export const updateFile = ({type, destination, id, file})=>  async (dispatch)=> {
    try {
        await deleteFile({type, id, destination});

        const headers = {
            'Authorization': 'bearer ' + localStorage.getItem('token')
        }

        const res = await clienteAxios.post(baseBackUrl + type + destination, file,{headers: headers}); 
        dispatch(updateFileSuccess(res));

    } catch (error) {
        dispatch(updateFileFailed(error));
    }
}

//---------product actions ---------------------------------------------------------------------------------

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


export const productReset = () => ({
    type: ActionTypes.PRODUCT_RESET
});


export const productRequest = () => ({
    type: ActionTypes.PRODUCT_REQUEST
});

export const productSuccess = (result) => ({
    type: ActionTypes.PRODUCT_SUCCESS,
    payload: result
});

export const productFailed = (errmess) => ({
    type: ActionTypes.PRODUCT_FAILED,
    payload: errmess
});

export const postProduct = (product) => async (dispatch) => {
    dispatch(productRequest());

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('token')
    }

    try {
        const res = await clienteAxios.post(baseBackUrl + 'products', product, {
            headers: headers
        });
        dispatch(productSuccess(res));


    } catch (error) {
        dispatch(productFailed(error));
    }


    return true;

}

export const updateProduct = (productData) => async (dispatch) => {
    dispatch(productRequest());

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('token')
    }

    try {
        const res = await clienteAxios.put(baseBackUrl + 'products/'+productData.productId , productData, {
            headers: headers
        }); 
        dispatch(productSuccess(res));


    } catch (error) {
        dispatch(productFailed(error));
    }


    return true;

}

export function deleteProduct(id) {
    return async (dispatch) => {
        dispatch(productRequest());

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
            await clienteAxios.delete(`${baseBackUrl}products/${id}`, {
                headers: headers
            });
            dispatch(productSuccess('Se ha eliminado'));
        } catch (error) {
            dispatch(productFailed(error.response));
        }
    }
}


//----------maps actions -----------------------------------------------------------------------------------
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

//----------Login, logout, sigin actions------------------------------------------------------------------------

export const registerReset = () => ({
    type: ActionTypes.REGISTER_RESET
});

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

export const loginReset = () => ({
    type: ActionTypes.LOGIN_RESET
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
        credentials: "same-origin",
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
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', response.username);
                localStorage.setItem('admin', response.admin);
                dispatch(loginSuccess(response));
            } else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(loginFailed(error)));
}

export const logoutReset = () => ({
    type: ActionTypes.LOGOUT_RESET
});

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
                localStorage.removeItem('username');
                localStorage.removeItem('admin');
                dispatch(logoutSuccess(response));
            } else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(logoutFailed(error)));
}

export const restoreRequest = () => ({
    type: ActionTypes.RESTORE_REQUEST
});

export const restoreReset = () => ({
    type: ActionTypes.RESTORE_RESET
});

export const restoreSuccess = (result) => ({
    type: ActionTypes.RESTORE_SUCCESS,
    payload: result
});

export const restoreFailed = (errmess) => ({
    type: ActionTypes.RESTORE_FAILED,
    payload: errmess
});

export const restorePassword = (user) => (dispatch) => {
    dispatch(restoreRequest());

    return fetch(baseBackUrl + 'users/forgot', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
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
                dispatch(restoreSuccess(response));
            } else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(restoreFailed(error)));
}

export const changePasswordRequest = () => ({
    type: ActionTypes.CHANGEPASSWORD_REQUEST
});

export const changePasswordReset = () => ({
    type: ActionTypes.CHANGEPASSWORD_RESET
});

export const changePasswordSuccess = (result) => ({
    type: ActionTypes.CHANGEPASSWORD_SUCCESS,
    payload: result
});

export const changePasswordFailed = (errmess) => ({
    type: ActionTypes.CHANGEPASSWORD_FAILED,
    payload: errmess
});

export const changePassword = (data) => (dispatch) => {
    dispatch(changePasswordRequest());

    return fetch(baseBackUrl + 'users/forgot/'+data.token, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.status == 200) {
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
            if (response.status == 200) {
                dispatch(changePasswordSuccess(response));
            } else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(changePasswordFailed(error)));
}

//------------Feedback actions -----------------------------------------------------------------------------

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

export const postFeedback = (feedback) => (dispatch) => {
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

//--------------leaders actions----------------------------------------------------------------------------------------------------------------

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());

    return fetch(baseBackUrl + 'leaders')
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
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}


export const leaderReset = () => ({
    type: ActionTypes.LEADER_RESET
});


export const leaderRequest = () => ({
    type: ActionTypes.LEADER_REQUEST
});

export const leaderSuccess = (result) => ({
    type: ActionTypes.LEADER_SUCCESS,
    payload: result
});

export const leaderFailed = (errmess) => ({
    type: ActionTypes.LEADER_FAILED,
    payload: errmess
});

export const postLeader = (leader) => async (dispatch) => {
    dispatch(leaderRequest());

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('token')
    }

    try {
        const res = await clienteAxios.post(baseBackUrl + 'leaders', leader, {
            headers: headers
        });
        dispatch(leaderSuccess(res));


    } catch (error) {
        dispatch(leaderFailed(error));
    }


    return true;

}

export const updateLeader = (leaderData) => async (dispatch) => {
    dispatch(leaderRequest());

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('token')
    }

    try {
        const res = await clienteAxios.put(baseBackUrl + 'leaders/'+leaderData.leaderId , leaderData, {
            headers: headers
        }); 
        dispatch(leaderSuccess(res));


    } catch (error) {
        dispatch(leaderFailed(error));
    }


    return true;

}

export function deleteLeader(id) {
    return async (dispatch) => {
        dispatch(leaderRequest());

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
            await clienteAxios.delete(`${baseBackUrl}leaders/${id}`, {
                headers: headers
            });
            dispatch(leaderSuccess('Se ha eliminado el lider'));
        } catch (error) {
            dispatch(leaderFailed(error.response));
        }
    }
}