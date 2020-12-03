import axiosService from "../common/axiosService"

const url = 'post'

export const getQuestions = (page, limit, sortBy, subjectId, gradeId, keyword) => {
  //console.log("api")
  return axiosService.get(`${url}/question/all?page=${page}&limit=${limit}&sort_by=${sortBy}`
    + `&subject_id=${subjectId}&grade_id=${gradeId}&body=${keyword}`)
}

export const getAnswers = (page, limit, sortBy) => {
  //console.log("api")
  return axiosService.get(`${url}/answer/all?page=${page}&limit=${limit}&sort_by=${sortBy}`)
}

export const getQuestionDetails = (id) => {
  return axiosService.get(`${url}/question/${id}`)
}

export const createQuestion = (data) => {
  return axiosService.post(`${url}/question`, data)
}

export const createAnswer = (data) => {
  return axiosService.post(`${url}/answer`, data)
}

export const updatePost = (id, data) => {
  console.log(data)
  return axiosService.post(`${url}/${id}`, data)
}

export const getQuestionsByUser = (id) => {
  return axiosService.get(`${url}/question/user/${id}`)
}

export const getAnswersByUser = (id) => {
  return axiosService.get(`${url}/answer/user/${id}`)
}

export const deletePostById = (id) => {
  return axiosService.delete(`${url}/${id}`)
}

export const addView = (postId) => {
  return axiosService.get(`${url}/view/${postId}`)
}

export const getRecommendQuestions = (ids) => {
  return axiosService.post(`${url}/question/ids`, ids)
}