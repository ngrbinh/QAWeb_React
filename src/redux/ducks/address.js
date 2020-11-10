export const addressTypes = {
  FETCH_ADDRESSES: "address/FETCH_ADDRESSES",
  FETCH_ADDRESSES_SUCCESS: "address/FETCH_ADDRESSES_SUCCESS",
  FETCH_ADDRESSES_FAIL: "address/FETCH_ADDRESSES_FAIL"
}

const initState = {
  addresses: [],
  loadingFetch: false,
  fetchError: ""
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case addressTypes.FETCH_ADDRESSES:
      return {
        ...state,
        loadingFetch: true
      }
    case addressTypes.FETCH_ADDRESSES_SUCCESS:
      const { data } = action.payload
      return {
        ...state,
        loadingFetch: false,
        addresses: [...data]
      }
    case addressTypes.FETCH_ADDRESSES_FAIL:
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

export const fetchAddresses = () => ({
  type: addressTypes.FETCH_ADDRESSES,
  payload: {}
})

export const fetchAddressesSuccess = (data) => ({
  type: addressTypes.FETCH_ADDRESSES_SUCCESS,
  payload: {data}
})

export const fetchAddressesFail = (message) => ({
  type: addressTypes.FETCH_ADDRESSES_FAIL,
  payload: {message}
})