import axiosService from "../common/axiosService"

const url = "user"

export const getUsers = (page, limit, sortBy, keyword) => {
  return axiosService.get(`${url}/all?page=${page}&limit=${limit}&sort_by=${sortBy}&name=${keyword}`)
}

export const getUserDetails = (id) => {
  return axiosService.get(`${url}/${id}`)
}

export const createNewAccount = (data) => {
  return axiosService.post(`${url}/signup`, data)
}

export const getAuthToken = (data) => {
  return axiosService.post(`login`, data)
}

export const getProflie = () => {
  return axiosService.get(`${url}/profile`)
}

export const updateProfile = (id, data) => {
  return axiosService.post(`${url}/${id}`, data)
}

export const updatePassword = (data) => {
  return axiosService.post(`${url}/password`, data)
}

export const createFollow = (id) => {
  return axiosService.post(`${url}/follow/${id}`)
}

export const deleteFollow = (id) => {
  return axiosService.post(`${url}/unfollow/${id}`)
}

export const deleteUserById = (id) => {
  return axiosService.delete(`${url}/${id}`)
}

export const vote = (data) => {
  return axiosService.post(`${url}/vote`, data)
}