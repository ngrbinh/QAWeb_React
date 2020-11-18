import axiosService from "../common/axiosService"

const url = "subject"

export const getSubjects = () => {
  return axiosService.get(`${url}/all`)
}