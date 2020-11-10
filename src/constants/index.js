import Home from "../container/Default/Home"
import BadgePage from "../container/Default/BadgePage"
import UserPage from "../container/Default/UserPage"
import QuestionDetailPage from "../container/Default/QuestionDetailPage"
import UserDetailPage from "../container/Default/UserDetailPage"
import EditProfilePage from "../container/Default/EditProfilePage"

export const API_URL = "https://queswer.herokuapp.com/"

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
    component: Home,
    attachProps: {},
    privateRoute: false,
  },
  {
    name: 'Badge',
    path: '/badge',
    exact: true,
    component: BadgePage,
    attachProps: {},
    privateRoute: false,
  },
  {
    name: 'User',
    path: '/user',
    exact: true,
    component: UserPage,
    attachProps: {},
    privateRoute: false,
  },
  {
    name: 'QuestionDetail',
    path: '/question/:id',
    exact: true,
    component: QuestionDetailPage,
    attachProps: {},
    privateRoute: false,
  },
  {
    name: 'UserDetail',
    path: '/user/:id',
    exact: false,
    component: UserDetailPage,
    attachProps: {},
    privateRoute: false,
  },
  {
    name: "Profile",
    path: "/profile",
    exact: false,
    component: UserDetailPage,
    attachProps: {
      isProfile: true
    },
    privateRoute: true
  },
  {
    name: "EditProfile",
    path: "/edit",
    exact: false,
    component: EditProfilePage,
    privateRoute: false
  }
]

