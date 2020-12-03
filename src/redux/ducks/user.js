export const userTypes = {
  FETCH_USERS: "user/FETCH_USERS",
  FETCH_USERS_SUCCESS: "user/FETCH_USERS_SUCCESS",
  FETCH_USERS_FAIL: "user/FETCH_USERS_FAIL",
  RESET_USERS: "user/RESET_USERS",
  FETCH_USER_DETAILS: "user/FETCH_USER_DETAILS",
  FETCH_USER_DETAILS_SUCCESS: "user/FETCH_USER_DETAILS_SUCCESS",
  FETCH_USER_DETAILS_FAIL: "user/FETCH_USER_DETAILS_FAIL",
  FOLLOW: "user/FOLLOW",
  FOLLOW_SUCCESS: "user/FOLLOW_SUCCESS",
  FOLLOW_FAIL: "user/FOLLOW_FAIL",
  UN_FOLLOW: "user/UN_FOLLOW",
  UN_FOLLOW_SUCCESS: "user/UN_FOLLOW_SUCCESS",
  UN_FOLLOW_FAIL: "user/UN_FOLLOW_FAIL",
  VOTE: "user/VOTE",
  VOTE_SUCCESS: "user/VOTE_SUCCESS",
  VOTE_FAIL: "user/VOTE_FAIL",
  DELETE_USER: "user/DELETE_USER",
  DELETE_USER_SUCCESS: "user/DELETE_USER_SUCCESS",
  DELETE_USER_FAIL: "user/DELETE_USER_FAIL",
  REMOVE_DEL_ERR: "user/REMOVE_DEL_ERR",
  FETCH_TOP_USER: "user/FETCH_TOP_USER",
  FETCH_TOP_USER_SUCCESS: "user/FETCH_TOP_USER_SUCCESS",
  FETCH_TOP_USER_FAIL: "user/FETCH_TOP_USER_FAIL",
}

const initState = {
  users: [],
  totalPage: 1,
  loadingUsers: false,
  userDetails: {
    followingUsers: [],
    followedByUsers: []
  },
  loadingFollow: [],
  followError: [],
  loadingVote: [],
  voteError: [],
  deletingIds: [],
  deleteError: [],
  topUsers: [],
  loadingTopUsers: false,
}

export default function reducer(state = initState, action) {
  var id, message
  if (action.payload) {
    id = action.payload.id
    message = action.payload.message
  }
  else {
    id = null
    message = null
  }
  const payload = action.payload
  switch (action.type) {
    case userTypes.FETCH_USERS:
      return {
        ...state,
        loadingUsers: true
      }
    case userTypes.FETCH_USERS_SUCCESS:
      const { totalPage, users } = action.payload.data
      return {
        ...state,
        users: [...users],
        totalPage: totalPage,
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
        userDetails: {
          followingUsers: [],
          followedByUsers: []
        }
      }
    case userTypes.FETCH_USER_DETAILS_SUCCESS:
      const { data: detailData } = action.payload
      return {
        ...state,
        userDetails: { ...detailData }
      }
    case userTypes.FETCH_USER_DETAILS_FAIL:
      return {
        ...state
      }
    case userTypes.FOLLOW:
      return {
        ...state,
        loadingFollow: [...state.loadingFollow, id]
      }
    case userTypes.FOLLOW_SUCCESS:
      return {
        ...state,
        loadingFollow: state.loadingFollow.filter(item => item !== id)
      }
    case userTypes.FOLLOW_FAIL:
      console.log(id)
      return {
        ...state,
        loadingFollow: state.loadingFollow.filter(item => item !== id),
        followError: message
      }
    case userTypes.UN_FOLLOW:
      return {
        ...state,
        loadingFollow: [...state.loadingFollow, id]
      }
    case userTypes.UN_FOLLOW_SUCCESS:
      return {
        ...state,
        loadingFollow: state.loadingFollow.filter(item => item !== id)
      }
    case userTypes.UN_FOLLOW_FAIL:
      return {
        ...state,
        loadingFollow: state.loadingFollow.filter(item => item !== id),
        followError: message
      }
    case userTypes.VOTE:
      return {
        ...state,
        loadingVote: [...state.loadingVote, payload.postId]
      }
    case userTypes.VOTE_SUCCESS:
      return {
        ...state,
        loadingVote: state.loadingVote.filter(item => item !== id)
      }
    case userTypes.VOTE_FAIL:
      return {
        ...state,
        loadingVote: state.loadingVote.filter(item => item !== id)
      }
    case userTypes.DELETE_USER:
      return {
        ...state,
        deletingIds: [...state.deletingIds, payload.id]
      }
    case userTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        deletingIds: state.deletingIds.filter(item => item !== payload.id),
        users: state.users.filter(item => item.id !== payload.id)
      }
    case userTypes.DELETE_USER_FAIL:
      return {
        ...state,
        deletingIds: state.deletingIds.filter(item => item !== payload.id),
        deleteError: [...state.deleteError, { ...payload }]
      }
    case userTypes.REMOVE_DEL_ERR:
      return {
        ...state,
        deleteError: state.deleteError.filter(item => item.id !== payload.id)
      }
    case userTypes.FETCH_TOP_USER:
      return {
        ...state,
        loadingTopUsers: true
      }
    case userTypes.FETCH_TOP_USER_SUCCESS:
      return {
        ...state,
        topUsers: payload.data.users,
        loadingTopUsers: false,
      }
    case userTypes.FETCH_TOP_USER_FAIL:
      return {
        ...state,
        loadingTopUsers: false
      }
    default:
      return state
  }
}

export const fetchUsers = (page, limit, sortBy, keyword) => ({
  type: userTypes.FETCH_USERS,
  payload: { page, limit, sortBy, keyword }
})

export const fetchUsersSuccess = (data) => ({
  type: userTypes.FETCH_USERS_SUCCESS,
  payload: { data }
})

export const fetchUsersFail = () => ({
  type: userTypes.FETCH_USERS_FAIL,
  payload: {}
})

export const resetUsers = () => ({
  type: userTypes.RESET_USERS,
  payload: {}
})

export const fetchUserDetails = (id) => ({
  type: userTypes.FETCH_USER_DETAILS,
  payload: { id }
})

export const fetchUserDetailsSuccess = (data) => ({
  type: userTypes.FETCH_USER_DETAILS_SUCCESS,
  payload: { data }
})

export const fetchUserDetailsFail = () => ({
  type: userTypes.FETCH_USER_DETAILS_FAIL,
})

export const follow = (id) => ({
  type: userTypes.FOLLOW,
  payload: { id }
})

export const followSuccess = (id) => ({
  type: userTypes.FOLLOW_SUCCESS,
  payload: { id }
})

export const followFail = (message, id) => ({
  type: userTypes.FOLLOW_FAIL,
  payload: { message, id }
})

export const unFollow = (id) => ({
  type: userTypes.UN_FOLLOW,
  payload: { id }
})

export const unFollowSuccess = (id) => ({
  type: userTypes.UN_FOLLOW_SUCCESS,
  payload: { id }
})

export const unFollowFail = (id) => ({
  type: userTypes.UN_FOLLOW_FAIL,
  payload: { id }
})

export const vote = (id, voteType) => ({
  type: userTypes.VOTE,
  payload: { postId: id, voteType }
})

export const voteSuccess = (id, voteChange) => ({
  type: userTypes.VOTE_SUCCESS,
  payload: { id, voteChange }
})

export const voteFail = (id) => ({
  type: userTypes.VOTE_FAIL,
  payload: { id }
})

export const deleteUser = (id) => ({
  type: userTypes.DELETE_USER,
  payload: { id }
})

export const deleteUserSuccess = (id) => ({
  type: userTypes.DELETE_USER_SUCCESS,
  payload: { id }
})

export const deleteUserFail = (id, message) => ({
  type: userTypes.DELETE_USER_FAIL,
  payload: { id, message }
})

export const removeDelErr = (id) => ({
  type: userTypes.REMOVE_DEL_ERR,
  payload: { id }
})

export const fetchTopUser = () => ({
  type: userTypes.FETCH_TOP_USER,
  payload: {}
})

export const fetchTopUserSuccess = (data) => ({
  type: userTypes.FETCH_TOP_USER_SUCCESS,
  payload: { data }
})

export const fetchTopUserFail = () => ({
  type: userTypes.FETCH_TOP_USER_FAIL,
  payload: {}
})