import { combineReducers } from 'redux'
import activeOrderReducer from './reducers/activeOrderReducer'
import barCodeReducer from './reducers/barCodeReducer'
import headerReducer from './reducers/headerReducer'
import mainReducer from './reducers/mainReducer'
import messagesReducer from './reducers/messagesReducer'
import techMapsReducer from './reducers/techMapsReducer'
import equipmentItemReducer from './reducers/equipmentItemReducer'
import orderReducer from './reducers/orderReducer'
import usersMenuModalReducer from './reducers/usersMenuModalReducer'
import authReducer from './reducers/authReducer'
import startFinishButtonReducer from './reducers/startFinishButtonReducer'
import errorReduser from './reducers/errorReduser'

const rootReducer = combineReducers({
  main: mainReducer,
  header: headerReducer,
  messages: messagesReducer,
  activeOrder: activeOrderReducer,
  TechMaps: techMapsReducer,
  barCode: barCodeReducer,
  equipmentItem: equipmentItemReducer,
  order: orderReducer,
  usersMenuModal: usersMenuModalReducer,
  auth: authReducer,
  startFinishButton: startFinishButtonReducer,
  error: errorReduser
})

export default rootReducer
