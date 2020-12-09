import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { createNewAccount, getUserDetails, getUsers, getAuthToken, getProflie, updateProfile, updatePassword, createFollow, deleteFollow, deleteUserById, vote } from "../apis/user";
import { deleteUserFail, deleteUserSuccess, fetchTopUser, fetchTopUserFail, fetchTopUserSuccess, fetchUserDetailsFail, fetchUserDetailsSuccess, fetchUsersFail, fetchUsersSuccess, followFail, followSuccess, unFollowFail, unFollowSuccess, userTypes, voteFail, voteSuccess } from '../redux/ducks/user'
import { hideLoading, showLoading } from '../redux/ducks/globalLoading'
import { accountTypes, changePasswordFail, changePasswordSuccess, login, loginFail, loginSuccess, logout, signupFail, signupSuccess } from "../redux/ducks/account";
import { setModal, toggleModal } from "../redux/ducks/modal"
import { editProfileFail, editProfileSuccess, fetchProfile, fetchProfileFail, fetchProfileSuccess, profileTypes, resetProfile } from "../redux/ducks/profile"
export function* userSaga() {
  yield takeLatest(userTypes.FETCH_USERS, watchFetchUsers)
  yield takeLatest(userTypes.FETCH_USER_DETAILS, watchFetchUserDetails)
  yield takeLatest(accountTypes.SIGNUP, watchSignUp)
  yield takeLatest(accountTypes.LOGIN, watchLogin)
  yield takeLatest(profileTypes.FETCH_PROFILE, watchFetchProfile)
  yield takeLatest(profileTypes.EDIT_PROFILE, watchEditProfile)
  yield takeLatest(accountTypes.CHANGE_PASSWORD, watchChangePassword)
  yield takeEvery(userTypes.FOLLOW, watchFollow)
  yield takeEvery(userTypes.UN_FOLLOW, watchUnFollow)
  yield takeEvery(userTypes.VOTE, watchVote)
  yield takeEvery(userTypes.DELETE_USER, watchDeleteUser)
  yield takeEvery(userTypes.FETCH_TOP_USER, watchFetchTopUsers)
}

function* watchFetchUsers(action) {
  try {
    const { page, limit, sortBy, keyword } = action.payload
    const resp = yield call(getUsers, page, limit, sortBy, keyword)
    const { status, data } = resp
    //console.log(data)
    yield put(fetchUsersSuccess(data))
  } catch (error) {
    yield put(fetchUsersFail())
  }
}

function* watchFetchUserDetails(action) {
  yield put(showLoading())
  const { id, history } = action.payload
  try {
    const resp = yield call(getUserDetails, id)
    const { status, data } = resp
    yield put(fetchUserDetailsSuccess(data))
  } catch (error) {
    yield put(fetchUserDetailsFail())
    if (history) {
      history.push("/")
    }
  }
  yield put(hideLoading())
}

function* watchSignUp(action) {
  try {
    const { data } = action.payload
    const resp = yield call(createNewAccount, data)
    yield put(signupSuccess())
    yield put(toggleModal())
    const { email, password } = data
    yield put(login(email, password))
  } catch (error) {
    const { message } = error.response.data
    yield put(signupFail(message))
  }
}

function* watchLogin(action) {
  try {
    const { history, ...data } = action.payload
    const resp = yield call(getAuthToken, data)
    const token = resp.headers.authorization
    yield put(loginSuccess(token))
    yield put(setModal(false))
    yield put(fetchProfile())
    history.go(0)
  } catch (error) {
    // if (error.response) {
    //   if (error.response.data) {
    //     message = error.response.data
    //   }
    // }
    const message = "Đăng nhập thất bại"
    yield put(loginFail(message))
    yield put(resetProfile())
  }
}

function* watchFetchProfile(action) {
  yield put(showLoading())
  try {
    const resp = yield call(getProflie)
    const { data } = resp
    yield put(fetchProfileSuccess(data))
  } catch (error) {
    yield put(fetchProfileFail())
    if (error.response.status === 403) {
      yield put(logout())
    }
  }
  yield put(hideLoading())
}

function* watchEditProfile(action) {
  try {
    const { id, data, history } = action.payload
    const resp = yield call(updateProfile, id, data)
    yield put(editProfileSuccess())
    history.push("/profile")
  } catch (error) {
    const { message } = error.response.data
    yield put(editProfileFail(message))
    if (error.response.status === 403) {
      yield put(logout())
    }
  }
}

function* watchChangePassword(action) {
  try {
    const { data, history } = action.payload
    const resp = yield call(updatePassword, data)
    yield put(changePasswordSuccess())
    history.push("/profile")
  } catch (error) {
    const { message } = error.response.data
    yield put(changePasswordFail(message))
    if (error.response.status === 403) {
      yield put(logout())
    }
  }
}

function* watchFollow(action) {
  const { id } = action.payload
  try {
    const resp = yield call(createFollow, id)
    yield put(followSuccess(id))
  } catch (error) {
    const { message } = error.response.data
    console.log(message)
    yield put(followFail(message, id))
  }
}

function* watchUnFollow(action) {
  const { id } = action.payload
  try {
    const resp = yield call(deleteFollow, id)
    console.log("done")
    yield put(unFollowSuccess(id))
  } catch (error) {
    const { message } = error.response.data
    console.log(message)
    yield put(unFollowFail(id))
  }
}

function* watchDeleteUser(action) {
  const { id } = action.payload
  try {
    const resp = yield call(deleteUserById, id)
    yield put(deleteUserSuccess(id))
  }
  catch (error) {
    console.log(error)
    const response = error.response
    //console.log(data)
    const message = response ? response.data.message : ""
    yield put(deleteUserFail(id, message))
  }
}

function* watchVote(action) {
  const id = action.payload.postId
  try {
    const reqData = action.payload
    console.log(reqData)
    const resp = yield call(vote, reqData)
    const { data: respData } = resp
    yield put(voteSuccess(id, respData))
  } catch (error) {
    yield put(voteFail(id))
  }
}

function* watchFetchTopUsers(action) {
  try {
    const resp = yield call(getUsers, 1, 5, "-point", "")
    const { data } = resp
    yield put(fetchTopUserSuccess(data))
  } catch (error) {
    console.log(error)
    yield put(fetchTopUser())
  }
}