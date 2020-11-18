import { call, put, takeLatest } from "redux-saga/effects";
import { subjectTypes, fetchSubjectsFail, fetchSubjectsSuccess } from "../redux/ducks/subject";
import { getSubjects } from '../apis/subject'
export function* subjectSaga() {
  yield takeLatest(subjectTypes.FETCH_SUBJECTS, watchFetchSubjects)
}

function* watchFetchSubjects(action) {
  try {
    const resp = yield call(getSubjects)
    const { status, data } = resp
    yield put(fetchSubjectsSuccess(data))
  } catch (error) {
    const { message } = error.response.data
    yield put(fetchSubjectsFail(message))
  }
}