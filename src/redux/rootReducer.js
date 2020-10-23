import {combineReducers} from 'redux';
import profile from './ducks/profile'
import modal from './ducks/modal'
const rootReduxer = combineReducers({
  profile,
  modal
})

export default rootReduxer;