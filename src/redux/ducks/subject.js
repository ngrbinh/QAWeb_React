export const subjectTypes = {
  FETCH_SUBJECTS: "subject/FETCH_SUBJECTS",
  FETCH_SUBJECTS_SUCCESS: "subject/FETCH_SUBJECTS_SUCCESS",
  FETCH_SUBJECTS_FAIL: "subject/FETCH_SUBJECTS_FAIL"
}

const initState = {
  subjects: [],
  loadingFetch: false,
  fetchError: ""
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case subjectTypes.FETCH_SUBJECTS:
      return {
        ...state,
        loadingFetch: true
      }
    case subjectTypes.FETCH_SUBJECTS_SUCCESS:
      const { data } = action.payload
      return {
        ...state,
        loadingFetch: false,
        subjects: [...data]
      }
    case subjectTypes.FETCH_SUBJECTS_FAIL:
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

export const fetchSubjects = () => ({
  type: subjectTypes.FETCH_SUBJECTS,
  payload: {}
})

export const fetchSubjectsSuccess = (data) => ({
  type: subjectTypes.FETCH_SUBJECTS_SUCCESS,
  payload: { data }
})

export const fetchSubjectsFail = (message) => ({
  type: subjectTypes.FETCH_SUBJECTS_FAIL,
  payload: { message }
})