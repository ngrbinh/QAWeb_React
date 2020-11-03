import Home from "../container/Default/Home"
import BadgePage from "../container/Default/BadgePage"
import UserPage from "../container/Default/UserPage"
import QuestionDetailPage from "../container/Default/QuestionDetailPage"
import UserDetailPage from "../container/Default/UserDetailPage"
export const ADMIN_ROUTES = [
  // {
  //   name: 'Admin Home',
  //   path: '/admin',
  //   exact: true,
  //   component: ,
  // }
]

export const DEFAULT_ROUTES = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: Home
  },
  {
    name: 'Badge',
    path: '/badge',
    exact: true,
    component: BadgePage
  },
  {
    name: 'User',
    path: '/user',
    exact: true,
    component: UserPage
  },
  {
    name: 'QuestionDetail',
    path: '/question/:id',
    exact: true,
    component: QuestionDetailPage
  },
  {
    name: 'UserDetail',
    path: '/user/:id',
    exact: false,
    component: UserDetailPage
  }
]