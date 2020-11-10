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
  ADD_QUESTION_FAIL: "post/ADD_QUESTION_FAIL"
}

const initState = {
  questions: [],
  loadingQuestions: false,
  questionDetails: {},
  loadingQuestionDetails :false,
  questionDetailsError: ""
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case postTypes.FETCH_QUESTIONS:
      return {
        ...state,
        loadingQuestions: true
      }
    case postTypes.FETCH_QUESTIONS_SUCCESS:
      const { data } = action.payload
      return {
        ...state,
        questions: state.questions.concat(data),
        loadingQuestions: false
      }
    case postTypes.FETCH_QUESTIONS_FAIL:
      return {
        ...state,
        loadingQuestions: false
      }
    case postTypes.RESET_QUESTIONS:
      return {
        ...state,
        questions : []
      }
    case postTypes.FETCH_QUESTION_DETAILS:
      return {
        ...state,
        loadingQuestionDetails: true
      }
    case postTypes.FETCH_QUESTION_DETAILS_SUCCESS:
      const {data: detailData} = action.payload
      return {
        ...state,
        loadingQuestionDetails: false,
        questionDetails: {...detailData}
      }
    case postTypes.FETCH_QUESTION_DETAILS_FAIL:
      const {message} = action.payload
      return {
        ...state,
        questionDetailsError: message
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
  payload: {id}
})

export const fetchQuestionDetailsSuccess = (data) => ({
  type: postTypes.FETCH_QUESTION_DETAILS_SUCCESS,
  payload: {data}
})

export const fetchQuestionDetailsFail = (message) => ({
  type: postTypes.FETCH_QUESTION_DETAILS_FAIL,
  payload: {message}
})

export const addQuestion = (data) => ({
  type: postTypes.ADD_QUESTION,
  payload: {data}
})

export const addQuestionSuccess = () => ({
  type: postTypes.ADD_QUESTION_SUCCESS,
  payload: {}
})

export const addQuestionFail = () => ({
  type: postTypes.ADD_QUESTION_FAIL,
  payload: {}
})