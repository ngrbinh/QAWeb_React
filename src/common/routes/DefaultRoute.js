import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { toggleModal, changeModal } from '../../redux/ducks/modal'
import HeaderBar from '../../component/HeaderBar'
import SideNavBar from '../../component/SideNavBar'
import SideInfoBar from '../../component/SideInfoBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
class DefaultRoute extends Component {
  state = {
    showUpButton: false,
  }
  handleUpButton = () => {
    if (window.pageYOffset <=85 && this.state.showUpButton==true) {
      this.setState(state => ({
        ...state,
        showUpButton:false
      }))
    }
    if (window.pageYOffset > 85 && this.state.showUpButton==false) {
      this.setState(state => ({
        ...state,
        showUpButton:true
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
    const { component: MyComponent, ...remainProps } = this.props
    const actionGetter = ({ toggleModal, changeModal }) => ({ toggleModal, changeModal })
    const actions = actionGetter(this.props)
    const {showUpButton} = this.state
    window.onscroll = this.handleUpButton
    return (
      <Route
        {...remainProps}
        render={routeProps => {
          return (<div>
            <div className="background-cover"></div>
            <div class="go-up" style={showUpButton?{right:'20px'}:{}} onClick={this.scrollToTop}>
              <i class="icon-up-open-big"><FontAwesomeIcon icon={faChevronUp}/></i>
            </div>
            <div id='wrap' className=''>
              <HeaderBar actions={actions} />
              <div className='queswer-content main-content'>
                <div className='queswer-inner-content menu-sidebar'>
                  <div className='queswer-container the-main-container'>
                    <main className='queswer-main-wrap all-main-wrap queswer-site-content float_l main-content'>
                      <div className='theiaStickySidebar side-bar'>
                        <div className='queswer-main-inner float_l'>
                          <MyComponent {...routeProps}/>
                        </div>
                        <div class="hide-main-inner"></div>
                        <div class="hide-sidebar sidebar-width"><div class="hide-sidebar-inner"></div></div>
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

const mapDispatchToProps = {
  toggleModal,
  changeModal
}

export default connect(null, mapDispatchToProps)(DefaultRoute)
