import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga"
import rootSaga from "../sagas";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['profile', 'account']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer, {}, applyMiddleware(sagaMiddleware))
//const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
export let persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export default store
