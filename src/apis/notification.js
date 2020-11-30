import axiosService from "../common/axiosService"

const url = "notification"

export const getUserNotifications = (page, limit, sortBy) => {
  //console.log("api")
  return axiosService.get(`${url}/user?page=${page}&limit=${limit}&sort_by=${sortBy}`)
}

export const checkAllNotifications = () => {
  return axiosService.get(`${url}/checked`)
}