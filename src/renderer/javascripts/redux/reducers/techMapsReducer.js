import {
  SET_ITEM,
  SET_MAPS_ARR,
  SET_MODAL_VISIBLE_TECH_MAPS
} from '../actionTypes'

const initialState = {
  mapsArr: null,
  modalVisible: false,
  item: null
}

const techMapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAPS_ARR:
      const arr = action.data
      arr.push({
        file_name: 'index.html',
        file_url:
          'https://openscopeproject.org/InteractiveHtmlBomDemo/html/motherboard.html'
      })
      return { ...state, mapsArr: arr }
    case SET_MODAL_VISIBLE_TECH_MAPS:
      return { ...state, modalVisible: action.data }
    case SET_ITEM:
      return { ...state, item: action.data }
    default:
      return state
  }
}

export default techMapsReducer
