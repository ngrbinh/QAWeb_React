import { call, put, takeLatest } from "redux-saga/effects";
import { addressTypes, fetchAddressesFail, fetchAddressesSuccess } from "../redux/ducks/address";
import { getAddresses } from '../apis/address'
export function* addressSaga() {
  yield takeLatest(addressTypes.FETCH_ADDRESSES,watchFetchAddresses)
}

function* watchFetchAddresses(action) {
  try {
    const resp = yield call(getAddresses)
    const { status, data } = resp
    yield put(fetchAddressesSuccess(data))
  } catch (error) {
    const { message } = error.response.data
    yield put(fetchAddressesFail(message))
  }
}