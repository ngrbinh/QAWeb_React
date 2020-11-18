import { call, put, takeLatest } from 'redux-saga/effects'
import { createAnswer, createQuestion, getQuestionDetails, getQuestions, getQuestionsByUser, updatePost } from '../apis/post'
import {
  addAnswerFail,
  addAnswerSuccess,
  addQuestionFail,
  addQuestionSuccess,
  editPostFail,
  editPostSuccess, fetchAnswersByUserFail, fetchAnswersByUserSuccess, fetchQuestionDetails,
  fetchQuestionDetailsFail, fetchQuestionDetailsSuccess,
  fetchQuestionsByUserFail,
  fetchQuestionsByUserSuccess,
  fetchQuestionsFail, fetchQuestionsSuccess, postTypes
} from '../redux/ducks/post'
import { logout } from '../redux/ducks/account'
import { toggleModal } from '../redux/ducks/modal'
export function* postSaga() {
  yield takeLatest(postTypes.FETCH_QUESTIONS, watchFetchQuestions)
  yield takeLatest(postTypes.FETCH_QUESTION_DETAILS, watchFetchQuestionDetails)
  yield takeLatest(postTypes.ADD_QUESTION, watchAddQuestion)
  yield takeLatest(postTypes.ADD_ANSWER, watchAddAnswer)
  yield takeLatest(postTypes.EDIT_POST, watchEditPost)
  yield takeLatest(postTypes.FETCH_ANSWERS_BY_USER,watchFetchUserAnswers)
  yield takeLatest(postTypes.FETCH_QUESTIONS_BY_USER,watchFetchUserQuestions)
}

function* watchFetchQuestions(action) {
  //console.log("saga")
  try {
    const { page, limit, sortBy } = action.payload
    const resp = yield call(getQuestions, page, limit, sortBy)
    const { status, data } = resp
    yield put(fetchQuestionsSuccess(data))
  } catch (error) {
    //console.log("error")
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

function* watchAddQuestion(action) {
  try {
    const { data, history } = action.payload
    const resp = yield call(createQuestion, data)
    const { data: respData, status } = resp
    yield put(addQuestionSuccess())
    history.push(`/question/${respData.id}`)
    yield put(toggleModal())
  } catch (error) {
    const { message } = error.response.data
    yield put(addQuestionFail(message))
    if (error.response.status === 403) {
      yield put(logout())
    }
  }
}

function* watchAddAnswer(action) {
  try {
    const { data, history } = action.payload
    const resp = yield call(createAnswer, data)
    const { status } = resp
    yield put(addAnswerSuccess())
    //history.push(`/question/${data.parentId}`)
    history.go(0)
  } catch (error) {
    console.log(error)
    const { message } = error.response.data
    yield put(addAnswerFail(message))
    if (error.response.status === 403) {
      yield put(logout())
    }
  }
}

function* watchEditPost(action) {
  try {
    const { id, data, history } = action.payload
    const resp = yield call(updatePost, id, data)
    const { status } = resp
    yield put(editPostSuccess())
    history.push(`/question/${id}`)
  } catch (error) {
    const { message } = error.response.data
    yield put(editPostFail(message))
    if (error.response.status === 403) {
      yield put(logout())
    }
  }
}

function* watchFetchUserQuestions(action) {
  const { id } = action.payload
  try {
    const resp = yield call(getQuestionsByUser, id)
    const { data } = resp
    yield put(fetchQuestionsByUserSuccess(data))
  } catch (error) {
    console.log(error)
    yield put(fetchQuestionsByUserFail())
  }
}

function* watchFetchUserAnswers(action) {
  const { id } = action.payload
  try {
    const resp = yield call(getQuestionsByUser, id)
    const { data } = resp
    yield put(fetchAnswersByUserSuccess(data))
  } catch (error) {
    console.log(error)
    yield put(fetchAnswersByUserFail())
  }
}