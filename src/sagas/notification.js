import { call, put, takeLatest } from 'redux-saga/effects'
import { checkAllNotifications, getUserNotifications } from '../apis/notification'
import { checkAllFail, checkAllSuccess, fetchNotificationsFail, fetchNotificationsSuccess, notificationTypes } from '../redux/ducks/notification'

export function* notificationSaga() {
  yield takeLatest(notificationTypes.FETCH_NOTIFICATIONS, watchFetchNotifications)
  yield takeLatest(notificationTypes.CHECK_ALL, watchCheckAllNotifications)
}

function* watchFetchNotifications(action) {
  try {
    const { page, limit, sortBy } = action.payload
    const resp = yield call(getUserNotifications, page, limit, sortBy)
    const { data } = resp
    yield put(fetchNotificationsSuccess(data))
  } catch (error) {
    const data = error.response.data
    const message = data ? data.message : ""
    yield put(fetchNotificationsFail(message))
  }
}

function* watchCheckAllNotifications(action) {
  try {
    yield call(checkAllNotifications)
    yield put(checkAllSuccess())
  } catch (error) {
    console.log(error)
    const data = error.response.data
    const message = data ? data.message : ""
    yield put(checkAllFail(message))
  }
}