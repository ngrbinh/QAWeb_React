import axiosService from "../common/axiosService"

const url = "user"

export const getUsers = (page,limit,sortBy) => {
  return axiosService.get(`${url}/all?page=${page}&limit=${limit}&sort_by=${sortBy}`)
}

export const getUserDetails = (id) => {
  return axiosService.get(`${url}/${id}`)
}

export const createNewAccount = (data) => {
  return axiosService.post(`${url}/signup`,data)
}

export const getAuthToken = (data) => {
  return axiosService.post(`login`,data)
}

export const getProflie = () => {
  return axiosService.get(`${url}/profile`)
}

export const updateProfile = (id,data) => {
  return axiosService.post(`${url}/${id}`,data)
}

export const updatePassword = (data) => {
  return axiosService.post(`${url}/password`,data)
}