import React, { useState } from 'react'
import logo from '../../assets/image/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faBell, faEdit, faQuestionCircle, faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import LoginPanel from '../Modal/LoginPanel'
import SignupPanel from '../Modal/SignupPanel'
import { connect } from 'react-redux'
import { loginSuccess, login } from '../../redux/ducks/profile'
function HeaderBar(props) {
  const [showUserActions, setShowUserActions] = useState(false)
  const { actions } = props
  const signInClick = () => {
    actions.changeModal(LoginPanel)
    actions.toggleModal()
  }

  const sigunUpClick = () => {
    actions.changeModal(SignupPanel)
    actions.toggleModal()
  }
  const toggleUserActions = () => {
    setShowUserActions(!showUserActions)
  }
  const { userProfile } = props
  const loginClass = 'right-header float_r' + (userProfile.userName != null ? ' wrap-login' : ' wrap-not-login')
  return (
    <div className='hidden-header header-dark mobile_bar_active'>
      <header className="header">
        <div className="queswer-container the-main-container">
          <div className={loginClass}>
            {
              userProfile.userName == null ?
                <React.Fragment>
                  <a className='button-default button-sign-in' onClick={signInClick}>Đăng nhập</a>
                  <a className='button-default-2 button-sign-up' onClick={sigunUpClick}>Đăng ký</a>
                </React.Fragment>
                :
                <div className='user-login-area'>
                  <div class="notifications-area user-notifications float_r">
                    <span class="notifications-click"></span>
                    <i class="icon-bell"><FontAwesomeIcon icon={faBell} /></i>
                    <div>
                      <ul>
                        <li>
                          <i class="icon-bucket"></i>
                          <div> Quà đăng ký - 20 điểm.<span class="notifications-date">22/10/2020 3:18pm</span></div>
                        </li>
                      </ul>
                      <a href="https://2code.info/demo/themes/Discy/Main/profile/binh123/notifications/">Tất cả thông báo.</a>
                    </div>
                  </div>
                  <div class="user-login-click float_r">
                    <span class="user-click" onClick={toggleUserActions}></span>
                    <div class="user-image float_l">
                      <img class="avatar avatar-29 photo" alt="binh123" title="binh123" width="29" height="29" src="https://secure.gravatar.com/avatar/76aa063f1270fa5823131063eb348fc6?s=96&d=mm&r=g" />
                    </div>
                    <div class="user-login float_l">
                      <span>Welcome</span><br />
                      <div class="float_l">binh123</div>
                    </div>
                    <i class="icon-down-open-mini"
                      style={showUserActions ? { backgroundColor: '#1a1c21' } : {}}
                    >
                      <FontAwesomeIcon icon={faAngleDown} />
                    </i>
                    <ul style={showUserActions ? { display: 'block' } : {}}>
                      <li>
                        <a href="#">
                          <i class="icon-user"><FontAwesomeIcon icon={faUser} /></i>Thông tin cá nhân
                          </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="icon-pencil"><FontAwesomeIcon icon={faEdit} /></i>Chỉnh sửa thông tin
                          </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="icon-pencil"><FontAwesomeIcon icon={faQuestionCircle} /></i>Câu hỏi đã hỏi
                          </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="icon-pencil"><FontAwesomeIcon icon={faSignOutAlt} /></i>Đăng xuất
                          </a>
                      </li>
                    </ul>
                  </div>
                </div>
            }
          </div>
          <div className="left-header float_l">
            <h2 className="screen-reader-text site_logo">Queswer</h2>
            <a className="logo float_l logo-img" title="Queswer">
              <img title="Queswer" height="45" width="137" className="default_screen" alt="Queswer logo"
                src={logo} />
            </a>
            <div className="mid-header float_l">
              <div className='header-search float_r'>
                <form role="search" className="searchform main-search-form" method="GET" action="">
                  <div className="search-wrapper">
                    <input type="search" className="live-search live-search-icon" autoComplete="off" placeholder="Nhập từ khóa" name="search" />
                    <div className="search-click"></div>
                    <button type="submit">
                      <i className="icon-search">
                        <FontAwesomeIcon icon={faSearch} size='xs' />
                      </i>
                    </button>
                  </div>
                </form>
              </div>
              <nav className="nav float_l" >
                <h3 className="screen-reader-text">Queswer Navigation</h3>
                <ul id="menu-header" className='menu'>
                  <li className='menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-64 current_page_item'>
                    <a className='' href=''>Trang chủ</a>
                  </li>
                  <li className='menu-item menu-item-type-post_type menu-item-object-page'>
                    <a href=''>Giới thiệu</a>
                  </li>
                  <li className='menu-item menu-item-type-post_type menu-item-object-page'>
                    <a href=''>Liên hệ</a>
                  </li>
                </ul>
              </nav>
            </div>

          </div>
        </div>
      </header>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.profile,
  };
}

const mapDispatchToProps = {
  loginSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar)
