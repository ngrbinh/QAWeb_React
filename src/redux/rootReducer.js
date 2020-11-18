import {combineReducers} from 'redux';
import account from './ducks/account'
import modal from './ducks/modal'
import profile from './ducks/profile'
import post from './ducks/post'
import user from './ducks/user'
import globalLoading from './ducks/globalLoading'
import address from './ducks/address'
import grade from './ducks/grade'
import subject from './ducks/subject'
const rootReducer = combineReducers({
  account,
  modal,
  profile,
  post,
  user,
  address,
  grade,
  subject,
  globalLoading
})

export default rootReducer;