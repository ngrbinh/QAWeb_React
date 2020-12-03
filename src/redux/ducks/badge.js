import { message } from "antd"

export const badgeTypes = {
  FETCH_BADGE_TYPES: "badge/FETCH_BADGE_TYPES",
  FETCH_BADGE_TYPES_SUCCESS: "badge/FETCH_BADGE_TYPES_SUCCESS",
  FETCH_BADGE_TYPES_FAIL: "badge/FETCH_BADGE_TYPES_FAIL"
}

const initState = {
  types: [],
  loadingTypes: false,
  typesError: ""
}

export default function reducer(state = initState, action) {
  const { type, payload } = action
  switch (type) {
    case badgeTypes.FETCH_BADGE_TYPES:
      return {
        ...state,
        loadingTypes: true,
        typesError: ""
      }
    case badgeTypes.FETCH_BADGE_TYPES_SUCCESS:
      return {
        ...state,
        loadingTypes: false,
        types: [...payload.data]
      }
    case badgeTypes.FETCH_BADGE_TYPES_FAIL:
      return {
        ...state,
        loadingTypes: false,
        typesError: payload.message
      }
    default:
      return { ...state }
  }
}

export const fetchBadgeTypes = () => ({
  type: badgeTypes.FETCH_BADGE_TYPES,
  payload: {}
})

export const fetchBadgeTypesSuccess = (data) => ({
  type: badgeTypes.FETCH_BADGE_TYPES_SUCCESS,
  payload: { data }
})

export const fetchBadgeTypesFail = (message) => ({
  type: badgeTypes.FETCH_BADGE_TYPES_FAIL,
  payload: { message }
})