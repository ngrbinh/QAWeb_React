import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import HeaderBar from '../component/HeaderBar';
import { toggleModal, changeModal } from '../redux/ducks/modal'
import { fetchProfile } from '../redux/ducks/profile'
import { connect } from 'react-redux'
import { Menu, Layout } from 'antd'
import { Link } from 'react-router-dom'
class AdminRoute extends Component {
  state = {
    showUpButton: false,
  }
  componentDidMount() {
    const { token, displayName, fetchProfile } = this.props
    if (token && !displayName) {
      fetchProfile()
    }
  }
  componentDidUpdate() {
    const body = document.getElementsByTagName("body")[0]
    body.setAttribute("class", "admin-body")
  }
  handleUpButton = () => {
    if (window.pageYOffset <= 85 && this.state.showUpButton == true) {
      this.setState(state => ({
        ...state,
        showUpButton: false
      }))
    }
    if (window.pageYOffset > 85 && this.state.showUpButton == false) {
      this.setState(state => ({
        ...state,
        showUpButton: true
      }))
    }
  }
  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  render() {
    const { component: MyComponent, token, changeModal, toggleModal, roleName, profile,
      ...remainProps } = this.props;
    const { showUpButton } = this.state
    const actionGetter = ({ toggleModal, changeModal }) => ({ toggleModal, changeModal })
    const actions = actionGetter(this.props)
    const { Sider } = Layout
    return (roleName !== "ADMIN"
      ? <Redirect to="/" />
      : <Route
        {...remainProps}
        render={routeProps => {
          return (
            <div>
              <div className="background-cover"></div>
              <div className="go-up" style={showUpButton ? { right: '20px' } : {}} onClick={this.scrollToTop}>
                <i className="icon-up-open-big"><FontAwesomeIcon icon={faChevronUp} /></i>
              </div>
              <div id="wrap">
                <HeaderBar actions={actions} />
                <Layout>
                  <Sider width={200} className="site-layout-background">
                    <Menu
                      mode="inline"
                      defaultSelectedKeys={[remainProps.path]}
                      style={{ height: '100%', borderRight: 0 }}
                    >
                      <Menu.Item key='/admin/'><Link to="/admin">Quản lý chung</Link></Menu.Item>
                      <Menu.Item key='/admin/answer'><Link to="/admin/answer">Quản lý câu trả lời</Link></Menu.Item>
                      <Menu.Item key='/admin/question'><Link to="/admin/question">Quản lý câu hỏi</Link></Menu.Item>
                      <Menu.Item key='/admin/user'><Link to="/admin/user">Quản lý người dùng</Link></Menu.Item>
                    </Menu>
                  </Sider>
                  <MyComponent {...routeProps} />
                </Layout>
              </div>
            </div>
          )
        }}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    displayName: state.profile.displayName,
    roleName: state.profile.account.roleName,
    profile: state.profile
  };
}

const mapDispatchToProps = {
  toggleModal,
  changeModal,
  fetchProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminRoute)