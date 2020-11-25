export const postTypes = {
  FETCH_QUESTIONS: "post/FETCH_QUESTIONS",
  FETCH_QUESTIONS_SUCCESS: "post/FETCH_QUESTIONS_SUCCESS",
  FETCH_QUESTIONS_FAIL: "post/FETCH_QUESTIONS_FAIL",
  RESET_QUESTIONS: "post/RESET_QUESTIONS",
  FETCH_QUESTION_DETAILS: "post/FETCH_QUESTION_DETAILS",
  FETCH_QUESTION_DETAILS_SUCCESS: "post/FETCH_QUESTION_DETAILS_SUCCESS",
  FETCH_QUESTION_DETAILS_FAIL: "post/FETCH_QUESTION_DETAILS_FAIL",
  ADD_QUESTION: "post/ADD_QUESTION",
  ADD_QUESTION_SUCCESS: "post/ADD_QUESTION_SUCCESS",
  ADD_QUESTION_FAIL: "post/ADD_QUESTION_FAIL",
  ADD_ANSWER: "post/ADD_ANSWER",
  ADD_ANSWER_SUCCESS: "post/ADD_ANSWER_SUCCESS",
  ADD_ANSWER_FAIL: "post/ADD_ANSWER_FAIL",
  EDIT_POST: "post/EDIT_POST",
  EDIT_POST_SUCCESS: "post/EDIT_POST_SUCCESS",
  EDIT_POST_FAIL: "post/EDIT_POST_FAIL",
  FETCH_QUESTIONS_BY_USER: "post/FETCH_QUESTIONS_BY_USER",
  FETCH_QUESTIONS_BY_USER_SUCCESS: "post/FETCH_QUESTIONS_BY_USER_SUCCESS",
  FETCH_QUESTIONS_BY_USER_FAIL: "post/FETCH_QUESTIONS_BY_USER_FAIL",
  FETCH_ANSWERS_BY_USER: "post/FETCH_ANSWERS_BY_USER",
  FETCH_ANSWERS_BY_USER_SUCCESS: "post/FETCH_ANSWERS_BY_USER_SUCCESS",
  FETCH_ANSWERS_BY_USER_FAIL: "post/FETCH_ANSWERS_BY_USER_FAIL",
  DELETE_POST: "post/DELETE_POST",
  DELETE_POST_SUCCESS: "post/DELETE_POST_SUCCESS",
  DELETE_POST_FAIL: "post/DELETE_POST_FAIL",
  REMOVE_DEL_ERR: "post/REMOVE_DEL_ERR",
  FETCH_ANSWERS: "post/FETCH_ANSWERS",
  FETCH_ANSWERS_SUCCESS: "post/FETCH_ANSWERS_SUCCESS",
  FETCH_ANSWERS_FAIL: "post/FETCH_ANSWERS_FAIL"
}

const initState = {
  questions: [],
  loadingQuestions: false,
  totalQuestionPage: 0,
  answers: [],
  loadingAnswers: false,
  totalAnswerPage: 0,
  questionDetails: {},
  loadingQuestionDetails: false,
  questionDetailsError: "",
  loadingAddQuestion: false,
  addQuestionError: "",
  loadingAddAnswer: false,
  addAnswerError: "",
  loadingEdit: false,
  editError: "",
  loadingUserQuestions: false,
  userQuestionsError: "",
  userQuestions: [],
  loadingUserAnswers: false,
  userAnswersError: "",
  userAnswers: [],
  deletingIds: [],
  deleteError: []
}

export default function reducer(state = initState, action) {
  const { type, payload } = action
  switch (type) {
    case postTypes.FETCH_QUESTIONS:
      return {
        ...state,
        loadingQuestions: true
      }
    case postTypes.FETCH_QUESTIONS_SUCCESS:
      const { totalPage: totalQuestionPage, questions } = action.payload.data
      return {
        ...state,
        questions: state.questions.concat(questions),
        loadingQuestions: false,
        totalQuestionPage
      }
    case postTypes.FETCH_QUESTIONS_FAIL:
      return {
        ...state,
        loadingQuestions: false
      }
    case postTypes.RESET_QUESTIONS:
      return {
        ...state,
        questions: []
      }
    case postTypes.FETCH_ANSWERS:
      return {
        ...state,
        loadingAnswers: true
      }
    case postTypes.FETCH_ANSWERS_SUCCESS:
      const { totalPage: totalAnswerPage, answers } = action.payload.data
      return {
        ...state,
        answers: [answers],
        loadingAnswers: false,
        totalAnswerPage
      }
    case postTypes.FETCH_ANSWERS_FAIL:
      return {
        ...state,
        loadingAnswers: false
      }
    case postTypes.FETCH_QUESTION_DETAILS:
      return {
        ...state,
        loadingQuestionDetails: true
      }
    case postTypes.FETCH_QUESTION_DETAILS_SUCCESS:
      const { data: detailData } = action.payload
      return {
        ...state,
        loadingQuestionDetails: false,
        questionDetails: { ...detailData }
      }
    case postTypes.FETCH_QUESTION_DETAILS_FAIL:
      const { message } = action.payload
      return {
        ...state,
        questionDetailsError: message
      }
    case postTypes.ADD_QUESTION:
      return {
        ...state,
        loadingAddQuestion: true
      }
    case postTypes.ADD_QUESTION_SUCCESS:
      return {
        ...state,
        loadingAddQuestion: false
      }
    case postTypes.ADD_QUESTION_FAIL:
      const { message: addError } = action.payload
      return {
        ...state,
        loadingAddQuestion: false,
        addQuestionError: addError
      }
    case postTypes.ADD_ANSWER:
      return {
        ...state,
        loadingAddAnswer: true,
      }
    case postTypes.ADD_ANSWER_SUCCESS:
      return {
        ...state,
        loadingAddAnswer: false
      }
    case postTypes.ADD_ANSWER_FAIL:
      const { message: addAnsError } = action.payload
      return {
        ...state,
        loadingAddAnswer: false,
        addAnswerError: addAnsError
      }
    case postTypes.EDIT_POST:
      return {
        ...state,
        loadingEdit: true
      }
    case postTypes.EDIT_POST_SUCCESS:
      return {
        ...state,
        loadingEdit: false
      }
    case postTypes.EDIT_POST_FAIL:
      const { message: editError } = action.payload
      return {
        ...state,
        loadingEdit: false,
        editError: editError
      }
    case postTypes.FETCH_QUESTIONS_BY_USER:
      return {
        ...state,
        loadingUserQuestions: true
      }
    case postTypes.FETCH_QUESTIONS_BY_USER_SUCCESS:
      const { data: userQuestions } = action.payload
      return {
        ...state,
        loadingUserQuestions: false,
        userQuestions: userQuestions
      }
    case postTypes.FETCH_QUESTIONS_BY_USER_FAIL:
      return {
        ...state,
        loadingUserQuestions: false,
      }
    case postTypes.FETCH_ANSWERS_BY_USER:
      return {
        ...state,
        loadingUserAnswers: true
      }
    case postTypes.FETCH_ANSWERS_BY_USER_SUCCESS:
      const { data: userAnswers } = action.payload
      return {
        ...state,
        loadingUserAnswers: false,
        userAnswers
      }
    case postTypes.FETCH_ANSWERS_BY_USER_FAIL:
      return {
        ...state,
        loadingUserAnswers: false
      }
    case postTypes.DELETE_POST:
      return {
        ...state,
        deletingIds: [...state.deletingIds, payload.id]
      }
    case postTypes.DELETE_POST_SUCCESS:
      return {
        ...state,
        deletingIds: state.deletingIds.filter(item => item !== payload.id)
      }
    case postTypes.DELETE_POST_FAIL:
      return {
        ...state,
        deletingIds: state.deletingIds.filter(item => item !== payload.id),
        deleteError: [...state.deleteError, { ...payload }]
      }
    case postTypes.REMOVE_DEL_ERR:
      return {
        ...state,
        deleteError: state.deleteError.filter(item => item.id !== payload.id)
      }
    default:
      return state
  }
}

export const fetchQuestions = (page, limit, sortBy) => ({
  type: postTypes.FETCH_QUESTIONS,
  payload: { page, limit, sortBy }
})

export const fetchQuestionsSuccess = (data) => ({
  type: postTypes.FETCH_QUESTIONS_SUCCESS,
  payload: { data }
})

export const fetchQuestionsFail = (message) => ({
  type: postTypes.FETCH_QUESTIONS_FAIL,
  payload: { message }
})

export const resetQuestions = () => ({
  type: postTypes.RESET_QUESTIONS
})

export const fetchQuestionDetails = (id) => ({
  type: postTypes.FETCH_QUESTION_DETAILS,
  payload: { id }
})

export const fetchQuestionDetailsSuccess = (data) => ({
  type: postTypes.FETCH_QUESTION_DETAILS_SUCCESS,
  payload: { data }
})

export const fetchQuestionDetailsFail = (message) => ({
  type: postTypes.FETCH_QUESTION_DETAILS_FAIL,
  payload: { message }
})

export const addQuestion = (data, history) => ({
  type: postTypes.ADD_QUESTION,
  payload: { data, history }
})

export const addQuestionSuccess = () => ({
  type: postTypes.ADD_QUESTION_SUCCESS,
  payload: {}
})

export const addQuestionFail = (message) => ({
  type: postTypes.ADD_QUESTION_FAIL,
  payload: { message }
})

export const addAnswer = (data, history) => ({
  type: postTypes.ADD_ANSWER,
  payload: { data, history }
})

export const addAnswerSuccess = () => ({
  type: postTypes.ADD_ANSWER_SUCCESS,
  payload: {}
})

export const addAnswerFail = (message) => ({
  type: postTypes.ADD_ANSWER_FAIL,
  payload: { message }
})

export const editPost = (id, data, history) => ({
  type: postTypes.EDIT_POST,
  payload: { id, data, history }
})

export const editPostSuccess = () => ({
  type: postTypes.EDIT_POST_SUCCESS,
  payload: {}
})

export const editPostFail = (message) => ({
  type: postTypes.EDIT_POST_FAIL,
  payload: { message }
})

export const fetchQuestionsByUser = (id) => ({
  type: postTypes.FETCH_QUESTIONS_BY_USER,
  payload: { id }
})

export const fetchQuestionsByUserSuccess = (data) => ({
  type: postTypes.FETCH_QUESTIONS_BY_USER_SUCCESS,
  payload: { data }
})

export const fetchQuestionsByUserFail = () => ({
  type: postTypes.FETCH_QUESTIONS_BY_USER_FAIL,
  payload: {}
})

export const fetchAnswersByUser = (id) => ({
  type: postTypes.FETCH_ANSWERS_BY_USER,
  payload: { id }
})

export const fetchAnswersByUserSuccess = (data) => ({
  type: postTypes.FETCH_ANSWERS_BY_USER_SUCCESS,
  payload: { data }
})

export const fetchAnswersByUserFail = () => ({
  type: postTypes.FETCH_ANSWERS_BY_USER_FAIL,
  payload: {}
})

export const deletePost = (id) => ({
  type: postTypes.DELETE_POST,
  payload: { id }
})

export const deletePostSuccess = (id) => ({
  type: postTypes.DELETE_POST_SUCCESS,
  payload: { id }
})

export const deletePostFail = (id, message) => ({
  type: postTypes.DELETE_POST_FAIL,
  payload: { id, message }
})

export const removeDelErr = (id) => ({
  type: postTypes.REMOVE_DEL_ERR,
  payload: { id }
})

export const fetchAnswers = (page, limit, sortBy) => ({
  type: postTypes.FETCH_ANSWERS,
  payload: { page, limit, sortBy }
})

export const fetchAnswersSuccess = (data) => ({
  type: postTypes.FETCH_ANSWERS_SUCCESS,
  payload: { data }
})

export const fetchAnswersFail = (message) => ({
  type: postTypes.FETCH_ANSWERS_FAIL,
  payload: { message }
})
