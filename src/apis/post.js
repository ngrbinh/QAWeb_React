import axiosService from "../common/axiosService"

const url = 'post'

export const getQuestions = (page,limit,sortBy) =>  {
  return axiosService.get(`${url}/question/all?page=${page}&limit=${limit}&sort_by=${sortBy}`)
}

export const getQuestionDetails = (id) => {
  return axiosService.get(`${url}/question/${id}`)
}