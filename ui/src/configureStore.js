import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '/app/rootReducer';

const sagaMiddleware = createSagaMiddleware()

const enhance = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : undefined || compose

const configureStore = (initialState, history) => {
    const middleware = [
        ...(process.env.NODE_ENV === 'production' ? [reduxImmutableStateInvariant()] : []),
        routerMiddleware(history),
        sagaMiddleware
    ]

    const store = createStore(
        createRootReducer(history),
        initialState,
        enhance(applyMiddleware(...middleware))
    )

    if (module.hot && process.env.NODE_ENV !== 'production') {
        // Enable hot module replacement for reducers
        module.hot.accept('./app/rootReducer', () => {
            const nextReducer = require('./app/rootReducer')(history).default; // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }

    store.runSaga = sagaMiddleware.run
    return store
}

export default configureStore;
