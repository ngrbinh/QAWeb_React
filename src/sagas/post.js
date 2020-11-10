import { call, put, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects'
import { getQuestionDetails, getQuestions } from '../apis/post'
import {
  fetchQuestionDetailsFail, fetchQuestionDetailsSuccess,
  fetchQuestionsFail, fetchQuestionsSuccess, postTypes
} from '../redux/ducks/post'

export function* postSaga() {
  yield takeLatest(postTypes.FETCH_QUESTIONS, watchFetchQuestions)
  yield takeLatest(postTypes.FETCH_QUESTION_DETAILS, watchFetchQuestionDetails)
}

function* watchFetchQuestions(action) {
  console.log("saga")
  try {
    const { page, limit, sortBy } = action.payload
    const resp = yield call(getQuestions, page, limit, sortBy)
    const { status, data } = resp
    yield put(fetchQuestionsSuccess(data))
  } catch (error) {
    console.log("error")
    yield put(fetchQuestionsFail())
  }
}

function* watchFetchQuestionDetails(action) {
  try {
    const { id } = action.payload
    const resp = yield call(getQuestionDetails, id)
    const { status, data } = resp
    yield put(fetchQuestionDetailsSuccess(data))
  } catch (error) {
    const { message } = error.response.data
    yield put(fetchQuestionDetailsFail(message))
  }
}