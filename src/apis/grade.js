import axiosService from "../common/axiosService"

const url = "grade"

export const getGrades = () => {
  return axiosService.get(`${url}/all`)
}