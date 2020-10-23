import {createStore} from "redux";
import rootReduxer from "./rootReducer";

const store = createStore(rootReduxer);

export default store;
