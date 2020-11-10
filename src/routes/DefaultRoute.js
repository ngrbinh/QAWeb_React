import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { toggleModal, changeModal } from '../redux/ducks/modal'
import { fetchProfile } from '../redux/ducks/profile'
import HeaderBar from '../component/HeaderBar'
import SideNavBar from '../component/SideNavBar'
import SideInfoBar from '../component/SideInfoBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import UserDetailsTopBar from '../component/UserDetailsTopBar'
import LoginPanel from '../component/Modal/LoginPanel'
class DefaultRoute extends Component {
  state = {
    showUpButton: false,
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
  componentDidMount() {
    const { token, fetchProfile } = this.props
    if (token) {
      fetchProfile()
    }
  }
  render() {
    const { component: MyComponent, privateRoute, attachProps, token, changeModal, toggleModal, ...remainProps } = this.props
    const actionGetter = ({ toggleModal, changeModal }) => ({ toggleModal, changeModal })
    const actions = actionGetter(this.props)
    const { showUpButton } = this.state
    window.onscroll = this.handleUpButton
    if (privateRoute && !token) {
      //console.log(token)
      changeModal(LoginPanel)
      toggleModal()
    }
    return (privateRoute && !token
      ? <Redirect to="/" />
      : <Route
        {...remainProps}
        render={routeProps => {
          return (<div>
            <div className="background-cover"></div>
            <div className="go-up" style={showUpButton ? { right: '20px' } : {}} onClick={this.scrollToTop}>
              <i className="icon-up-open-big"><FontAwesomeIcon icon={faChevronUp} /></i>
            </div>
            <div id='wrap' className=''>
              <HeaderBar actions={actions} />
              {remainProps.name === 'UserDetail' || remainProps.name === 'Profile' ?
                <UserDetailsTopBar {...routeProps} {...attachProps} /> : null}
              <div className='queswer-content main-content'>
                <div className='queswer-inner-content menu-sidebar'>
                  <div className='queswer-container the-main-container'>
                    <main className='queswer-main-wrap all-main-wrap queswer-site-content float_l main-content'>
                      <div className='theiaStickySidebar side-bar'>
                        <div className='queswer-main-inner float_l'>
                          <MyComponent {...routeProps} {...attachProps} />
                        </div>
                        <div className="hide-main-inner"></div>
                        <div className="hide-sidebar sidebar-width"><div className="hide-sidebar-inner"></div></div>
                        <SideInfoBar />
                      </div>
                    </main>
                    <SideNavBar />
                  </div>
                </div>
              </div>
            </div>
          </div>)
        }}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.account.token
  };
}

const mapDispatchToProps = {
  toggleModal,
  changeModal,
  fetchProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultRoute)
