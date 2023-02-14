import {
  SET_IS_EQUIPMENT_EMPTY,
  SET_IS_DEGREE_OF_OPERATION_COMPLETION
} from '../actionTypes'

const initialState = {
  isEquipmentEmpty: false,
  isDegreeOfOperationCompletion: false
}

const startFinishButtonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_EQUIPMENT_EMPTY:
      return { ...state, isEquipmentEmpty: action.data }
    case SET_IS_DEGREE_OF_OPERATION_COMPLETION:
      return { ...state, isDegreeOfOperationCompletion: action.data }
    default:
      return state
  }
}

export default startFinishButtonReducer
