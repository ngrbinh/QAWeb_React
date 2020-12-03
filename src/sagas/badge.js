import { call, put, takeLatest } from "redux-saga/effects";
import { getBadgeTypes } from "../apis/badge";
import { badgeTypes, fetchBadgeTypesFail, fetchBadgeTypesSuccess } from "../redux/ducks/badge";

export function* badgeSaga() {
  yield takeLatest(badgeTypes.FETCH_BADGE_TYPES, watchFetchBadgeTypes)
}

function* watchFetchBadgeTypes(action) {
  try {
    const resp = yield call(getBadgeTypes)
    const { data } = resp
    yield put(fetchBadgeTypesSuccess(data))
  } catch (error) {
    yield put(fetchBadgeTypesFail("Không thể tải danh sách huy hiệu"))
  }
}