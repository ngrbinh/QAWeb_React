export const gradeTypes = {
  FETCH_GRADES: "grade/FETCH_GRADES",
  FETCH_GRADES_SUCCESS: "grade/FETCH_GRADES_SUCCESS",
  FETCH_GRADES_FAIL: "grade/FETCH_GRADES_FAIL"
}

const initState = {
  grades: [],
  loadingFetch: false,
  fetchError: ""
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case gradeTypes.FETCH_GRADES:
      return {
        ...state,
        loadingFetch: true
      }
    case gradeTypes.FETCH_GRADES_SUCCESS:
      const { data } = action.payload
      return {
        ...state,
        loadingFetch: false,
        grades: [...data]
      }
    case gradeTypes.FETCH_GRADES_FAIL:
      const { message } = action.payload
      return {
        ...state,
        loadingFetch: false,
        fetchError: message
      }
    default:
      return { ...state }
  }
}

export const fetchGrades = () => ({
  type: gradeTypes.FETCH_GRADES,
  payload: {}
})

export const fetchGradesSuccess = (data) => ({
  type: gradeTypes.FETCH_GRADES_SUCCESS,
  payload: { data }
})

export const fetchGradesFail = (message) => ({
  type: gradeTypes.FETCH_GRADES_FAIL,
  payload: { message }
})