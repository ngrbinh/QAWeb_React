export const profileTypes = {
  FETCH_PROFILE: "profile/FETCH",
  FETCH_PROFILE_SUCCESS: "profile/FETCH_SUCCESS",
  FETCH_PROFILE_FAIL: "profile/FETCH_FAIL",
  UPDATE_PROFILE: "profile/UPDATE",
  UPDATE_PROFILE_SUCCESS: "profile/UPDATE_SUCCESS",
  UPDATE_PROFILE_FAIL: "profile/UPDATE_FAIL",
  RESET_PROFILE: "profile/RESET_PROFILE"
}

const initState = {
  displayName: null
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case profileTypes.FETCH_PROFILE_SUCCESS:
      const {data} = action.payload
      return {
        ...state,
        ...data
      }
    case profileTypes.RESET_PROFILE:
      return {
        ...initState
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
  payload: {data}
})

export const fetchProfileFail = () => ({
  type: profileTypes.FETCH_PROFILE_FAIL,
  payload: {}
})

export const resetProfile = () => ({
  type: profileTypes.RESET_PROFILE
})