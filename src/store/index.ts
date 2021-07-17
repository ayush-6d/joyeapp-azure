import { applyMiddleware, compose, createStore, Store } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/index';
import { parseJwt, getUserDataForSession } from '../utilities/generalUtils';
import { fromJS } from 'immutable';
const objectAssign = require('object-assign');

import { getUserData } from 'src/utilities/generalUtils';

export function configureStore(initialState = {}): Store<any> {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const userData = getUserData() || getUserDataForSession();
    const userToken = userData && userData.accessToken ? userData.accessToken : '';
    const login = parseJwt(userToken);
    (login || {}).isLoggedIn = true;
    let store = createStore(
        rootReducer,
        objectAssign(initialState, userToken ? { login: fromJS(login) } : {}),
        composeEnhancers(
            applyMiddleware(...getMiddlewares())
        )
    );
    return store;
}

function getMiddlewares() {
    let middlewares = [
        thunk,
        promiseMiddleware()
    ];
    return middlewares;
}

export const store = configureStore();
