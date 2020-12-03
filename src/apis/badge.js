import axiosService from "../common/axiosService"

const url = "badge"

export const getBadgeTypes = () => {
  return axiosService.get(`${url}/types`)
}