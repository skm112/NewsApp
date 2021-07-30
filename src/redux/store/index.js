import { createStore, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/index';
import rootSaga from '../sagas/index';

const sagaMiddleware = createSagaMiddleware();
// const middleware = [sagaMiddleware, createLogger()];
// const withDevTools = composeWithDevTools(applyMiddleware(...middleware));
// const store = createStore(rootReducer, withDevTools);
const middleware = [sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export default store;
