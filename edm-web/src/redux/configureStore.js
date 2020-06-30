import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Products } from './products';
import { Register } from './register';
import { Auth } from './auth';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            products: Products,
            register: Register,
            auth: Auth
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}