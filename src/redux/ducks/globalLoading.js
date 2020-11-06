export const globalLoadingTypes = {
  SHOW_LOADING: "globalLoading/SHOW_LOADING",
  HIDE_LOADING: "globalLoading/HIDE_LOADING",
}

const initState = {
  loading: false
}

export default function reducer(state = initState, action) {
  switch(action.type) {
    case globalLoadingTypes.SHOW_LOADING:
      return {
        loading: true
      }
    case globalLoadingTypes.HIDE_LOADING:
      return {
        loading: false
      }
    default:
      return state
  }
}

export const showLoading = () => ({
  type: globalLoadingTypes.SHOW_LOADING
})

export const hideLoading = () => ({
  type: globalLoadingTypes.HIDE_LOADING
})