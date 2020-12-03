import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { addView, createAnswer, createQuestion, deletePostById, getAnswers, getQuestionDetails, getQuestions, getQuestionsByUser, getRecommendQuestions, updatePost } from '../apis/post'
import {
  addAnswerFail,
  addAnswerSuccess,
  addQuestionFail,
  addQuestionSuccess,
  addViewFail,
  addViewSuccess,
  deletePostFail,
  deletePostSuccess,
  editPostFail,
  editPostSuccess, fetchAnswersByUserFail, fetchAnswersByUserSuccess, fetchAnswersFail, fetchAnswersSuccess, fetchPopularQuestionsFail, fetchPopularQuestionsSuccess,
  fetchQuestionDetailsFail, fetchQuestionDetailsSuccess,
  fetchQuestionsByUserFail,
  fetchQuestionsByUserSuccess,
  fetchQuestionsFail, fetchQuestionsSuccess, fetchRecommendQuestionsFail, fetchRecommendQuestionsSuccess, postTypes
} from '../redux/ducks/post'
import { logout } from '../redux/ducks/account'
import { toggleModal } from '../redux/ducks/modal'
import { getRecommendIds } from '../apis/recommend'
export function* postSaga() {
  yield takeLatest(postTypes.FETCH_QUESTIONS, watchFetchQuestions)
  yield takeLatest(postTypes.FETCH_ANSWERS, watchFetchAnswers)
  yield takeLatest(postTypes.FETCH_QUESTION_DETAILS, watchFetchQuestionDetails)
  yield takeLatest(postTypes.ADD_QUESTION, watchAddQuestion)
  yield takeLatest(postTypes.ADD_ANSWER, watchAddAnswer)
  yield takeLatest(postTypes.EDIT_POST, watchEditPost)
  yield takeLatest(postTypes.FETCH_ANSWERS_BY_USER, watchFetchUserAnswers)
  yield takeLatest(postTypes.FETCH_QUESTIONS_BY_USER, watchFetchUserQuestions)
  yield takeEvery(postTypes.DELETE_POST, watchDeletePost)
  yield takeEvery(postTypes.ADD_VIEW, watchAddView)
  yield takeEvery(postTypes.FETCH_POPULAR_QUESTIONS, watchFetchPopularQuestion)
  yield takeLatest(postTypes.FETCH_RECOMMEND_QUESTIONS, watchFetchRecommendQuestions)
}

function* watchFetchQuestions(action) {
  //console.log("saga")
  try {
    const { page, limit, sortBy, subjectId, gradeId, keyword } = action.payload
    const resp = yield call(getQuestions, page, limit, sortBy, subjectId, gradeId, keyword)
    const { status, data } = resp
    yield put(fetchQuestionsSuccess(data))
  } catch (error) {
    //console.log("error")
    yield put(fetchQuestionsFail())
  }
}

function* watchFetchAnswers(action) {
  try {
    const { page, limit, sortBy } = action.payload
    const resp = yield call(getAnswers, page, limit, sortBy)
    const { status, data } = resp
    yield put(fetchAnswersSuccess(data))
    //console.log(data)
  } catch (error) {
    //console.log("error")
    yield put(fetchAnswersFail())
  }
}

function* watchFetchQuestionDetails(action) {
  try {
    const { id } = action.payload
    yield call(addView, id)
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
    console.log(error.response.data)
    yield put(fetchAnswersByUserFail())
  }
}

function* watchDeletePost(action) {
  const { id } = action.payload
  try {
    const resp = yield call(deletePostById, id)
    yield put(deletePostSuccess(id))
  } catch (error) {
    const data = error.response.data
    const message = data ? data.message : ""
    yield put(deletePostFail(id, message))
  }
}

function* watchAddView(action) {
  try {
    const { postId } = action.payload
    yield call(addView, postId)
    yield put(addViewSuccess(postId))
  } catch (error) {
    yield put(addViewFail(""))
    console.log(error)
  }
}

function* watchFetchPopularQuestion(action) {
  try {
    const resp = yield call(getQuestions, 1, 5, '-view')
    const { data } = resp
    yield put(fetchPopularQuestionsSuccess(data))
  } catch (error) {
    console.log(error)
    yield put(fetchPopularQuestionsFail())
  }
}

function* watchFetchRecommendQuestions(action) {
  const { id } = action.payload
  try {
    const resp = yield call(getRecommendIds, id)
    const { data } = resp
    let ids = []
    for (const id in data) {
      ids.push(data[id])
    }
    const resp2 = yield call(getRecommendQuestions, ids)
    const { data: data2 } = resp2
    yield put(fetchRecommendQuestionsSuccess(data2))
  } catch (error) {
    console.log(error)
    yield put(fetchRecommendQuestionsFail())
  }
}