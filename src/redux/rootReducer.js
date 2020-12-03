import { combineReducers } from 'redux';
import account from './ducks/account'
import modal from './ducks/modal'
import profile from './ducks/profile'
import post from './ducks/post'
import user from './ducks/user'
import globalLoading from './ducks/globalLoading'
import address from './ducks/address'
import grade from './ducks/grade'
import subject from './ducks/subject'
import meta from './ducks/meta'
import notification from './ducks/notification'
import badge from './ducks/badge'
import questionSearch from './ducks/questionSearch'
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session'

const sessionConfig = {
  key: 'profile',
  storage: sessionStorage,
}

const rootReducer = combineReducers({
  account,
  modal,
  profile: persistReducer(sessionConfig, profile),
  post,
  user,
  address,
  grade,
  subject,
  globalLoading,
  meta,
  notification,
  badge,
  questionSearch
})

export default rootReducer;