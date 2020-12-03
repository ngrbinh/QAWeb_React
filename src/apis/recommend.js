import axios from "axios"

const axiosService = axios.create({
  baseURL: "http://52.231.68.59:8080"
})

export const getRecommendIds = (id) => {
  return axiosService.get(`/recommend-system/id-post=${id}`)
}