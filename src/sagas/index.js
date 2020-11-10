import { fork, all, take } from "redux-saga/effects";
import { postSaga } from "./post";
import { userSaga } from "./user";
import { addressSaga } from "./address"
import { REHYDRATE } from 'redux-persist/lib/constants';

export default function* rootSaga() {
  //yield take(REHYDRATE); // Wait for rehydrate to prevent sagas from running with empty store
  // yield all([
  //   fork(postSaga),
  //   fork(userSaga),
  //   fork(addressSaga)
  // ])
  yield fork(postSaga)
  yield fork(userSaga)
  yield fork(addressSaga)
}