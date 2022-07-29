import { SET_IS_USER_MENU_MODAL } from '../actionTypes'

const initialState = {
  isModalWorkShiftVisible: false,
  isUserMenuModal: false
}

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_USER_MENU_MODAL:
      return { ...state, isUserMenuModal: action.data }
    default:
      return state
  }
}

export default headerReducer
