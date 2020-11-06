export const modalTypes = {
  TOGGLE_MODAL: "modal/TOGGLE",
  CHANGE_MODAL: "modal/CHANGE",
  SET_MODAL: "modal/SET"
}

const initState = {
  showModal: false,
  component: null
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case modalTypes.TOGGLE_MODAL:
      return {
        ...state,
        showModal: !state.showModal,
        //component: state.showModal?null:state.component
      }
    case modalTypes.CHANGE_MODAL:
      const {component} = action.payload
      return {
        ...state,
        component
      }
    case modalTypes.SET_MODAL:
      const {showModal} = action.payload
      return {
        ...state,
        showModal: showModal
      }
    default:
      return state
  }
}

export const toggleModal = () => ({
  type: modalTypes.TOGGLE_MODAL
})

export const changeModal = component => ({
  type: modalTypes.CHANGE_MODAL,
  payload: {
    component
  }
})

export const setModal = showModal => ({
  type: modalTypes.SET_MODAL,
  payload: {
    showModal
  }
})
