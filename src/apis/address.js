import axiosService from "../common/axiosService"

const url = "address"

export const getAddresses = () => {
  return axiosService.get(`${url}/all`)
}