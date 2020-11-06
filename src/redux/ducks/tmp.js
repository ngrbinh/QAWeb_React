export const a1Types = {
  b1: "a1/b1",
  b1_SUCCESS: "a1/b1_SUCCESS",
  b1_FAIL: "a1/b1_FAIL"
}

const initState = {

}

export default function reducer(state = initState, action) {
  switch(action.type) {
    default:
      return {...state}
  }
}

export const b2 = () => ({
  type: a1Types.b1,
  payload: {}
})

export const b2Success = () => ({
  type: a1Types.b1_SUCCESS,
  payload: {}
})

export const b2Fail = () => ({
  type: a1Types.b1_FAIL,
  payload: {}
})