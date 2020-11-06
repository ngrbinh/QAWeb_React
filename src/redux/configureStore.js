import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga"
import rootSaga from "../sagas";

const sagaMiddleWare = createSagaMiddleware()

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleWare)
);

sagaMiddleWare.run(rootSaga)
export default store;
