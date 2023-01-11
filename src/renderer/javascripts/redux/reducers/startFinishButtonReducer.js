import { SET_IS_EQUIPMENT_EMPTY } from '../actionTypes'

const initialState = {
  isEquipmentEmpty: false
}

const startFinishButtonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_EQUIPMENT_EMPTY:
      if (state.isEquipmentEmpty !== action.data)
        return { ...state, isEquipmentEmpty: action.data }
      else return state
    default:
      return state
  }
}

export default startFinishButtonReducer
