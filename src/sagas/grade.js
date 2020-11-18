import { call, put, takeLatest } from "redux-saga/effects";
import { gradeTypes, fetchGradesFail, fetchGradesSuccess } from "../redux/ducks/grade";
import { getGrades } from '../apis/grade'
export function* gradeSaga() {
  yield takeLatest(gradeTypes.FETCH_GRADES, watchFetchGrades)
}

function* watchFetchGrades(action) {
  try {
    const resp = yield call(getGrades)
    const { status, data } = resp
    yield put(fetchGradesSuccess(data))
  } catch (error) {
    const { message } = error.response.data
    yield put(fetchGradesFail(message))
  }
}