import React, { useState } from 'react'
import logo from '../../assets/image/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faBell, faEdit, faQuestionCircle, faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import LoginPanel from '../Modal/LoginPanel'
import SignupPanel from '../Modal/SignupPanel'
import { connect } from 'react-redux'
import { loginSuccess, login } from '../../redux/ducks/account'
import { Link } from 'react-router-dom'
import defaultAvatar from '../../assets/image/user_avatar_default.png'
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
  const { profile } = props
  const loginClass = 'right-header float_r' + (profile.displayName ? ' wrap-login' : ' wrap-not-login')
  return (
    <div className='hidden-header header-dark mobile_bar_active'>
      <header className="header">
        <div className="queswer-container the-main-container">
          <div className={loginClass}>
            {
              !profile.displayName ?
                <React.Fragment>
                  <a className='button-default button-sign-in' onClick={signInClick}>Đăng nhập</a>
                  <a className='button-default-2 button-sign-up' onClick={sigunUpClick}>Đăng ký</a>
                </React.Fragment>
                :
                <div className='user-login-area'>
                  <div className="notifications-area user-notifications float_r">
                    <span className="notifications-click"></span>
                    <i className="icon-bell"><FontAwesomeIcon icon={faBell} /></i>
                    <div>
                      <ul>
                        <li>
                          <i className="icon-bucket"></i>
                          <div> Quà đăng ký - 20 điểm.<span className="notifications-date">22/10/2020 3:18pm</span></div>
                        </li>
                      </ul>
                      <a href="https://2code.info/demo/themes/Discy/Main/profile/binh123/notifications/">Tất cả thông báo.</a>
                    </div>
                  </div>
                  <div className="user-login-click float_r">
                    <span className="user-click" onClick={toggleUserActions}></span>
                    <div className="user-image float_l">
                      <img className="avatar avatar-29 photo header-avatar" alt="binh123" title={profile.displayName}
                        src={profile.avatarUrl ? profile.avatarUrl : defaultAvatar}
                      />
                    </div>
                    <div className="user-login float_l">
                      <span>Xin chào</span><br />
                      <div className="float_l">{profile.displayName}</div>
                    </div>
                    <i className="icon-down-open-mini"
                      style={showUserActions ? { backgroundColor: '#1a1c21' } : {}}
                    >
                      <FontAwesomeIcon icon={faAngleDown} />
                    </i>
                    <ul style={showUserActions ? { display: 'block' } : {}}>
                      <li>
                        <Link to="/profile">
                          <i className="icon-user"><FontAwesomeIcon icon={faUser} /></i>Thông tin cá nhân
                          </Link>
                      </li>
                      <li>
                        <a href="#">
                          <i className="icon-pencil"><FontAwesomeIcon icon={faEdit} /></i>Chỉnh sửa thông tin
                          </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="icon-pencil"><FontAwesomeIcon icon={faQuestionCircle} /></i>Câu hỏi đã hỏi
                          </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="icon-pencil"><FontAwesomeIcon icon={faSignOutAlt} /></i>Đăng xuất
                          </a>
                      </li>
                    </ul>
                  </div>
                </div>
            }
          </div>
          <div className="left-header float_l">
            <h2 className="screen-reader-text site_logo">Queswer</h2>
            <Link className="logo float_l logo-img" title="Queswer" to='/'>
              <img title="Queswer" className="default_screen" alt="Queswer logo"
                src={logo}
                style={{ width: '90%' }} />
            </Link>
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
    profile: state.profile,
  };
}

const mapDispatchToProps = {
  loginSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar)
