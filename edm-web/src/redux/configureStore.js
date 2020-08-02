import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Products } from './products';
import { Product } from './product';
import { Maps } from './maps';
import { Register } from './register';
import { Auth } from './auth';
import { UploadFile } from './uploadFile';
import { UpdateFile } from './updateFile';
import { DeleteFile } from './deleteFile';
import { Leaders } from './leaders';
import { Leader } from './leader';
import { Restore } from './restore';
import { ChangePassword } from './changePassword';
import { Comment } from './comment';
 export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            products: Products,
            register: Register,
            maps: Maps,
            auth: Auth,
            product: Product,
            uploadFile: UploadFile,
            updateFile: UpdateFile,
            deleteFile: DeleteFile,
            leaders: Leaders,
            leader: Leader,
            restore: Restore,
            changePassword: ChangePassword,
            comment: Comment
        }),
       compose(applyMiddleware(thunk),

            typeof window === 'object' &&
                typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
        )
    );

    return store;
} 
