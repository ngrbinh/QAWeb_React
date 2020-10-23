export const Types = {
  TOGGLE_MODAL: "modal/TOGGLE",
  CHANGE_MODAL: "modal/CHANGE"
}

const initState = {
  showModal: false,
  component: null
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case Types.TOGGLE_MODAL:
      return {
        ...state,
        showModal: !state.showModal,
        //component: state.showModal?null:state.component
      }
    case Types.CHANGE_MODAL:
      const {component} = action.payload
      return {
        ...state,
        component
      }
    default:
      return state
  }
}

export const toggleModal = () => ({
  type: Types.TOGGLE_MODAL
})

export const changeModal = component => ({
  type: Types.CHANGE_MODAL,
  payload: {
    component
  }
})
