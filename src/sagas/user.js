import { call, put, takeLatest } from "redux-saga/effects";
import { createNewAccount, getUserDetails, getUsers, getAuthToken, getProflie } from "../apis/user";
import { fetchUserDetailsFail, fetchUserDetailsSuccess, fetchUsersFail, fetchUsersSuccess, userTypes } from '../redux/ducks/user'
import { hideLoading, showLoading } from '../redux/ducks/globalLoading'
import { accountTypes, login, loginFail, loginSuccess, logout, signupFail, signupSuccess } from "../redux/ducks/account";
import { setModal, toggleModal} from "../redux/ducks/modal"
import { fetchProfile, fetchProfileFail, fetchProfileSuccess, profileTypes, resetProfile} from "../redux/ducks/profile"
export function* userSaga() {
  yield takeLatest(userTypes.FETCH_USERS,watchFetchUsers)
  yield takeLatest(userTypes.FETCH_USER_DETAILS,watchFetchUserDetails)
  yield takeLatest(accountTypes.SIGNUP,watchSignUp)
  yield takeLatest(accountTypes.LOGIN,watchLogin)
  yield takeLatest(profileTypes.FETCH_PROFILE,watchFetchProfile)
}

function* watchFetchUsers(action) {
  try {
    const {page,limit,sortBy} = action.payload
    const resp = yield call(getUsers,page,limit,sortBy)
    const {status, data} = resp
    yield put(fetchUsersSuccess(data))
  } catch(error) {
    yield put(fetchUsersFail())
  }
}

function* watchFetchUserDetails(action) {
  try {
    const {id} = action.payload
    yield put(showLoading())
    const resp = yield call(getUserDetails,id)
    const {status,data} = resp
    yield put(hideLoading())
    yield put(fetchUserDetailsSuccess(data))
  } catch(error) {
    yield put(fetchUserDetailsFail)
  }
}

function* watchSignUp(action) {
  try {
    const {data} = action.payload
    const resp = yield call(createNewAccount,data)
    yield put(signupSuccess())
    yield put(toggleModal())
    const {email,password} = data
    yield put(login(email,password))
  } catch (error) {
    const {message} = error.response.data 
    yield put(signupFail(message))
  }
}

function* watchLogin(action) {
  try {
    const data = action.payload
    const resp = yield call(getAuthToken, data)
    const token = resp.headers.authorization
    yield put(loginSuccess(token))
    yield put(setModal(false))
    yield put(fetchProfile())
  } catch (error) {
    const message = "ahhi do ngok"
    yield put(loginFail(message))
    yield put(resetProfile())
  }
}

function* watchFetchProfile(action) {
  try {
    const resp = yield call(getProflie)
    const {data} = resp
    yield put(fetchProfileSuccess(data))
  } catch (error) {
    yield put(fetchProfileFail())
    if (error.response.status === 403) {
      yield put(logout())
    }
  }
}