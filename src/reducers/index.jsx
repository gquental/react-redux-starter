import {combineReducers} from 'redux'
import UserReducer from './user.jsx'

export default combineReducers({
  user: UserReducer
})
