export const accountTypes = {
  LOGIN: "account/LOGIN",
  LOGOUT: "account/LOGOUT",
  LOGIN_SUCCESS: "account/LOGIN_SUCCESS",
  LOGIN_FAIL: "account/LOGIN_FAIL",
  CHANGE_PASSWORD: "account/CHANGE_PASSWORD",
  CHANGE_PASSWORD_SUCCESS: "account/CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_FAIL: "account/CHANGE_PASSWORD_FAIL",
  SIGNUP: "account/SIGNUP",
  SIGNUP_SUCCESS: "account/SIGNUP_SUCCESS",
  SIGNUP_FAIL: "account/SIGNUP_FAIL",
  RESET_ERROR: "account/RESET_ERROR",
}

const initState = {
  token: "",
  loadingSignup: false,
  signupError: "",
  loadingLogin: false,
  loginError: "",
  loadingPassword: false,
  passwordError: ""
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case accountTypes.LOGIN:
      return {
        ...state,
        loadingLogin: true
      }
    case accountTypes.LOGIN_SUCCESS:
      const { token } = action.payload
      console.log(token)
      return {
        ...state,
        token: token,
        loadingLogin: false
      }
    case accountTypes.LOGIN_FAIL:
      const { error } = action.payload
      return {
        ...state,
        loadingLogin: false,
        loginError: error,
        token: ""
      }
    case accountTypes.LOGOUT:
      return {
        ...initState
      }
    case accountTypes.SIGNUP:
      return {
        ...state,
        loadingSignup: true
      }
    case accountTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        loadingSignup: false
      }
    case accountTypes.SIGNUP_FAIL:
      const { error: signupError } = action.payload
      return {
        ...state,
        loadingSignup: false,
        signupError: signupError
      }
    case accountTypes.RESET_ERROR:
      return {
        ...state,
        signupError: "",
        loginError: "",
        passwordError: ""
      }
    case accountTypes.CHANGE_PASSWORD:
      return {
        ...state,
        loadingPassword: true
      }
    case accountTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loadingPassword: false,
      }
    case accountTypes.CHANGE_PASSWORD_FAIL:
      const { message } = action.payload
      return {
        ...state,
        loadingPassword: false,
        passwordError: message
      }
    default: return state
  }
}

export const login = (email, password) => ({
  type: accountTypes.LOGIN,
  payload: {
    email,
    password
  }
})

export const logout = () => ({
  type: accountTypes.LOGOUT
})

export const loginSuccess = (token) => ({
  type: accountTypes.LOGIN_SUCCESS,
  payload: { token }
})

export const loginFail = (error) => ({
  type: accountTypes.LOGIN_FAIL,
  payload: { error }
})

export const signup = (data) => ({
  type: accountTypes.SIGNUP,
  payload: { data }
})

export const signupSuccess = () => ({
  type: accountTypes.SIGNUP_SUCCESS,
})

export const signupFail = (error) => ({
  type: accountTypes.SIGNUP_FAIL,
  payload: { error }
})

export const resetError = () => ({
  type: accountTypes.RESET_ERROR
})

export const changePassword = (data, history) => ({
  type: accountTypes.CHANGE_PASSWORD,
  payload: { data, history }
})

export const changePasswordSuccess = () => ({
  type: accountTypes.CHANGE_PASSWORD_SUCCESS,
  payload: {}
})

export const changePasswordFail = (message) => ({
  type: accountTypes.CHANGE_PASSWORD_FAIL,
  payload: { message }
})