import Home from "../container/Default/Home"
import BadgePage from "../container/Default/BadgePage"
import UserPage from "../container/Default/UserPage"
import QuestionDetailPage from "../container/Default/QuestionDetailPage"
import UserDetailPage from "../container/Default/UserDetailPage"
import EditProfilePage from "../container/Default/EditProfilePage"
import EditQuestionPage from "../container/Default/EditQuestionPage"
import Admin from "../container/Admin"
import ManageUser from "../container/Admin/ManageUser"
import ManageQuestion from "../container/Admin/ManageQuestion"
import ManageAnswer from "../container/Admin/ManageAnswer"
import EditAnswerPage from "../container/Default/EditAnswerPage"

export const API_URL = "https://queswer.herokuapp.com/"
//export const API_URL = "localhost:8080/"
export const ADMIN_ROUTES = [
  {
    name: 'Admin Home',
    path: '/',
    exact: true,
    component: Admin,
    componentProp: {

    }
  },
  {
    name: 'Quản lý người dùng',
    path: '/user',
    exact: true,
    component: ManageUser,
    componentProp: {

    }
  },
  {
    name: 'Quản lý câu hỏi',
    path: '/question',
    exact: true,
    component: ManageQuestion,
    componentProp: {

    }
  },
  {
    name: 'Quản lý câu trả lời',
    path: '/answer',
    exact: true,
    component: ManageAnswer,
    componentProp: {

    }
  }
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
    path: "/editprofile",
    exact: false,
    component: EditProfilePage,
    attachProps: {

    },
    privateRoute: true
  },
  {
    name: "EditQuestion",
    path: "/question/:id/edit",
    exact: false,
    component: EditQuestionPage,
    attachProps: {

    },
  },
  {
    name: "EditAnswer",
    path: "/answer/edit",
    exact: false,
    component: EditAnswerPage,
    attachProps: {}
  }
]

