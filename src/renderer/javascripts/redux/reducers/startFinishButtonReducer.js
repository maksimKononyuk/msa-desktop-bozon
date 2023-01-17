import { SET_IS_EQUIPMENT_EMPTY } from '../actionTypes'

const initialState = {
  isEquipmentEmpty: false
}

const startFinishButtonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_EQUIPMENT_EMPTY:
      return { ...state, isEquipmentEmpty: action.data }
    default:
      return state
  }
}

export default startFinishButtonReducer
