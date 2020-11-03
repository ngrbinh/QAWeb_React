export const Types = {
  LOGIN: "profile/LOGIN",
  LOGOUT: "profile/LOGOUT",
  LOGIN_SUCCESS: "profile/LOGIN_SUCCESS",
  LOGIN_FAIL: "profile/LOGIN_FAIL"
}

const initState = {
  token: null,
  userName: ""
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case Types.LOGIN_SUCCESS:
      const data = action.payload
      return {
        ...state,
        ...data
      }
    case Types.LOGOUT:
      return {
        ...initState
      }
    default: return state
  }
}

export const login = (userName, password) => ({
  type: Types.LOGIN,
  payload: {
    userName,
    password
  }
})

export const logout = () => ({
  type: Types.LOGOUT
})

export const loginSuccess = () => ({
  type: Types.LOGIN_SUCCESS,
  payload: {
    userName: 'Bdt',
    token: 'deptrailoitaiai'
  }
})
// export const = () => ({
//   type: Types.
// })