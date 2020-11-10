export const profileTypes = {
  FETCH_PROFILE: "profile/FETCH",
  FETCH_PROFILE_SUCCESS: "profile/FETCH_SUCCESS",
  FETCH_PROFILE_FAIL: "profile/FETCH_FAIL",
  UPDATE_PROFILE: "profile/UPDATE",
  UPDATE_PROFILE_SUCCESS: "profile/UPDATE_SUCCESS",
  UPDATE_PROFILE_FAIL: "profile/UPDATE_FAIL",
  RESET_PROFILE: "profile/RESET_PROFILE",
  EDIT_PROFILE: "profile/EDIT_PROFILE",
  EDIT_PROFILE_SUCCESS: "profile/EDIT_PROFILE_SUCCESS",
  EDIT_PROFILE_FAIL: "profile/EDIT_PROFILE_FAIL",
  RESET_ERROR: "profile/RESET_ERROR"
}

const initState = {
  displayName: "",
  loadingFetch: false,
  fetchError: "",
  loadingEdit: false,
  editError: ""
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case profileTypes.FETCH_PROFILE:
      return {
        ...state,
        loadingFetch: true
      }
    case profileTypes.FETCH_PROFILE_SUCCESS:
      const { data } = action.payload
      return {
        ...state,
        ...data,
        loadingFetch: false
      }
    case profileTypes.FETCH_PROFILE_FAIL:
      return {
        ...state,
        loadingFetch: false
      }
    case profileTypes.RESET_PROFILE:
      return {
        ...initState,
      }
    case profileTypes.EDIT_PROFILE:
      return {
        ...state,
        loadingEdit: true
      }
    case profileTypes.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        loadingEdit: false
      }
    case profileTypes.EDIT_PROFILE_FAIL:
      const { message } = action.payload
      return {
        ...state,
        loadingEdit: false,
        editError: message
      }
    case profileTypes.resetError:
      return {
        ...state,
        fetchError: "",
        editError: ""
      }
    default:
      return state
  }
}

export const fetchProfile = () => ({
  type: profileTypes.FETCH_PROFILE
})

export const fetchProfileSuccess = (data) => ({
  type: profileTypes.FETCH_PROFILE_SUCCESS,
  payload: { data }
})

export const fetchProfileFail = () => ({
  type: profileTypes.FETCH_PROFILE_FAIL,
  payload: {}
})

export const resetProfile = () => ({
  type: profileTypes.RESET_PROFILE
})

export const editProfile = (id, data, history) => ({
  type: profileTypes.EDIT_PROFILE,
  payload: { id, data, history }
})

export const editProfileSuccess = () => ({
  type: profileTypes.EDIT_PROFILE_SUCCESS,
  payload: {}
})

export const editProfileFail = (message) => ({
  type: profileTypes.EDIT_PROFILE_FAIL,
  payload: { message }
})

export const resetError = () => ({
  type: profileTypes.RESET_ERROR,
})