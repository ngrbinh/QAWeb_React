export const userTypes = {
  FETCH_USERS: "user/FETCH_USERS",
  FETCH_USERS_SUCCESS: "user/FETCH_USERS_SUCCESS",
  FETCH_USERS_FAIL: "user/FETCH_USERS_FAIL",
  RESET_USERS: "user/RESET_USERS",
  FETCH_USER_DETAILS: "user/FETCH_USER_DETAILS",
  FETCH_USER_DETAILS_SUCCESS: "user/FETCH_USER_DETAILS_SUCCESS",
  FETCH_USER_DETAILS_FAIL: "user/FETCH_USER_DETAILS_FAIL",
}

const initState = {
  users : [],
  loadingUsers : false,
  userDetails : {}
}

export default function reducer (state = initState, action) {
  switch (action.type) {
    case userTypes.FETCH_USERS:
      return {
        ...state,
        loadingUsers: true
      }
    case userTypes.FETCH_USERS_SUCCESS:
      const {data} = action.payload
      return {
        ...state,
        users : [...data],
        loadingUsers: false
      }
    case userTypes.FETCH_USERS_FAIL:
      return {
        ...state,
        loadingUsers: false
      }
    case userTypes.RESET_USERS:
      return {
        ...state,
        users: []
      }
    case userTypes.FETCH_USER_DETAILS:
      return {
        ...state,
        userDetails: {}
      }
    case userTypes.FETCH_USER_DETAILS_SUCCESS:
      const {data : detailData} = action.payload
      return {
        ...state,
        userDetails: {...detailData}
      }
    case userTypes.FETCH_USER_DETAILS_FAIL:
      return {
        ...state
      }
    default:
      return state
  }
}

export const fetchUsers = (page,limit,sortBy) => ({
  type: userTypes.FETCH_USERS,
  payload: {page,limit,sortBy}
})

export const fetchUsersSuccess = (data) => ({
  type: userTypes.FETCH_USERS_SUCCESS,
  payload: {data}
})

export const fetchUsersFail = () => ({
  type: userTypes.FETCH_USERS_FAIL,
})

export const resetUsers = () => ({
  type: userTypes.RESET_USERS,
})

export const fetchUserDetails = (id) => ({
  type: userTypes.FETCH_USER_DETAILS,
  payload: {id}
})

export const fetchUserDetailsSuccess = (data) => ({
  type: userTypes.FETCH_USER_DETAILS_SUCCESS,
  payload: {data}
})

export const fetchUserDetailsFail = () => ({
  type: userTypes.FETCH_USER_DETAILS_FAIL,
})