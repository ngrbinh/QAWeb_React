import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchMeta, fetchMetaFail, fetchMetaSuccess, metaTypes } from '../redux/ducks/meta'
import { getMetaData } from '../apis/meta'
export function* metaSaga() {
  yield takeLatest(metaTypes.FETCH_META, watchFetchMeta)
}

function* watchFetchMeta(action) {
  try {
    const resp = yield call(getMetaData)
    const { data } = resp
    yield put(fetchMetaSuccess(data))
  } catch (error) {
    yield put(fetchMeta())
  }
}