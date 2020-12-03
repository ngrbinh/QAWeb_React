export const notificationTypes = {
  FETCH_NOTIFICATIONS: "notification/FETCH_NOTIFICATIONS",
  FETCH_NOTIFICATIONS_SUCCESS: "notification/FETCH_NOTIFICATIONS_SUCCESS",
  FETCH_NOTIFICATIONS_FAIL: "notification/FETCH_NOTIFICATIONS_FAIL",
  CHECK_ALL: "notification/CHECK_ALL",
  CHECK_ALL_SUCCESS: "notification/CHECK_ALL_SUCCESS",
  CHECK_ALL_FAIL: "notification/CHECK_ALL_FAIL"
}

const initState = {
  totalPage: 0,
  notifications: [],
  loading: false
}

export default function reducer(state = initState, action) {
  const { type, payload } = action
  switch (type) {
    case notificationTypes.FETCH_NOTIFICATIONS:
      return {
        ...state,
        loading: true
      }
    case notificationTypes.FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        totalPage: payload.data.totalPage,
        notifications: payload.data.notifications
      }
    case notificationTypes.FETCH_NOTIFICATIONS_FAIL:
      return {
        ...state,
        loading: false,
      }
    case notificationTypes.CHECK_ALL:
      console.log("?")
      return {
        ...state,
        notifications: state.notifications.map(item => {
          return {
            ...item,
            checked: true
          }
        }),
        loading: false
      }
    default:
      return state
  }
}

export const fetchNotifications = (page, limit, sortBy) => ({
  type: notificationTypes.FETCH_NOTIFICATIONS,
  payload: { page, limit, sortBy }
})

export const fetchNotificationsSuccess = (data) => ({
  type: notificationTypes.FETCH_NOTIFICATIONS_SUCCESS,
  payload: { data }
})

export const fetchNotificationsFail = (message) => ({
  type: notificationTypes.FETCH_NOTIFICATIONS_FAIL,
  payload: { message }
})

export const checkAll = () => ({
  type: notificationTypes.CHECK_ALL,
  payload: {}
})

export const checkAllSuccess = () => ({
  type: notificationTypes.CHECK_ALL_SUCCESS,
  payload: {}
})

export const checkAllFail = (message) => ({
  type: notificationTypes.CHECK_ALL_FAIL,
  payload: { message }
})