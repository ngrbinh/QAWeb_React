import {combineReducers} from 'redux';
import account from './ducks/account'
import modal from './ducks/modal'
import profile from './ducks/profile'
import post from './ducks/post'
import user from './ducks/user'
import globalLoading from './ducks/globalLoading'
const rootReducer = combineReducers({
  account,
  modal,
  profile,
  post,
  user,
  globalLoading
})

export default rootReducer;