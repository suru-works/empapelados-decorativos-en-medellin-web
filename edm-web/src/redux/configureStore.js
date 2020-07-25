import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Products } from './products';
import { Product } from './product';
import { Maps } from './maps';
import { Register } from './register';
import { Auth } from './auth';

 export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            products: Products,
            register: Register,
            maps: Maps,
            auth: Auth,
            product: Product
        }),
       compose(applyMiddleware(thunk),

            typeof window === 'object' &&
                typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
        )
    );

    return store;
} 
