export const metaTypes = {
  FETCH_META: "meta/FETCH_META",
  FETCH_META_SUCCESS: "meta/FETCH_META_SUCCESS",
  FETCH_META_FAIL: "meta/FETCH_META_FAIL"
}

const initState = {
  answerCount: 0,
  questionCount: 0,
  viewCount: 0,
  userCount: 0,
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case metaTypes.FETCH_META_SUCCESS:
      return {
        ...action.payload.data
      }
    case metaTypes.FETCH_META_FAIL:
      console.log("fetch meta error")
      return {
        ...state
      }
    default:
      return { ...state }
  }
}

export const fetchMeta = () => ({
  type: metaTypes.FETCH_META,
  payload: {}
})

export const fetchMetaSuccess = (data) => ({
  type: metaTypes.FETCH_META_SUCCESS,
  payload: { data }
})

export const fetchMetaFail = () => ({
  type: metaTypes.FETCH_META_FAIL,
  payload: {}
})