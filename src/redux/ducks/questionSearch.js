export const questionSearchTypes = {
  SET_GRADE_ID: "questionSearch/SET_GRADE_ID",
  SET_SUBJECT_ID: "questionSearch/SET_SUBJECT_ID",
  SET_KEYWORD: "questionSearch/SET_KEYWORD"
}

const initState = {
  gradeId: "",
  subjectId: "",
  keyword: ""
}

export default function reducer(state = initState, action) {
  const { type, payload } = action
  switch (type) {
    case questionSearchTypes.SET_GRADE_ID:
      return {
        ...state,
        gradeId: payload.id !== state.gradeId ? payload.id : ""
      }
    case questionSearchTypes.SET_SUBJECT_ID:
      return {
        ...state,
        subjectId: payload.id !== state.subjectId ? payload.id : ""
      }
    case questionSearchTypes.SET_KEYWORD:
      return {
        ...state,
        keyword: payload.keyword
      }
    default:
      return state
  }
}

export const setGradeId = (id) => ({
  type: questionSearchTypes.SET_GRADE_ID,
  payload: { id }
})

export const setSubjectId = (id) => ({
  type: questionSearchTypes.SET_SUBJECT_ID,
  payload: { id }
})

export const setKeyword = (keyword) => ({
  type: questionSearchTypes.SET_KEYWORD,
  payload: { keyword }
})