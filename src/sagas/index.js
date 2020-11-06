import { fork } from "redux-saga/effects";
import { postSaga } from "./post";
import { userSaga } from "./user";

export default function* rootSaga() {
  yield fork(postSaga)
  yield fork(userSaga)
}