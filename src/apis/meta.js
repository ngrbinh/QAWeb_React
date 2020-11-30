import axiosService from "../common/axiosService"

const url = 'meta'

export const getMetaData = () => {
  return axiosService.get(`${url}`)
}