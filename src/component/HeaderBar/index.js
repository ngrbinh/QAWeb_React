import React, { useState } from 'react'
import logo from '../../assets/image/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faBell, faEdit, faQuestionCircle, faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import LoginPanel from '../Modal/LoginPanel'
import SignupPanel from '../Modal/SignupPanel'
import { connect } from 'react-redux'
import { logout } from '../../redux/ducks/account'
import { fetchNotifications, checkAll } from '../../redux/ducks/notification'
import { Link, NavLink, useHistory } from 'react-router-dom'
import defaultAvatar from '../../assets/image/user_avatar_default.png'
import { useEffect } from 'react'
import Notification from '../Notification'
import { Modal, Button } from 'antd'
import { setKeyword } from '../../redux/ducks/questionSearch'
function HeaderBar(props) {
  const [showUserActions, setShowUserActions] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState(props.keyword)
  const [showModal, setShowModal] = useState(false)
  const { actions, logout, fetchNotifications, checkAll, setKeyword } = props
  const history = useHistory()
  useEffect(() => {
    if (props.token) {
      fetchNotifications(1, 5, "-date")
    }
  }, [props.token])
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
  const handleLogoutClick = e => {
    e.preventDefault()
    setShowModal(true)
    logout()
  }
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    if (unCheckCount > 0) {
      checkAll()
    }
  }
  const handleKeywordChange = e => {
    setSearchKeyword(e.target.value)
  }
  const handleKeywordSubmit = e => {
    e.preventDefault()
    setKeyword(searchKeyword)
  }
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault()
      setKeyword(searchKeyword)
    }
  }
  const onOkClick = () => {
    setShowModal(false)
    history.go(0)
  }
  const { profile, loadingNotifications, notifications } = props
  const loginClass = 'right-header float_r' + (profile.displayName ? ' wrap-login' : ' wrap-not-login')
  const unCheckCount = notifications.filter(item => !item.checked).length
  return (
    <div className='hidden-header header-dark mobile_bar_active'>
      <Modal
        title="Đăng xuất"
        visible={showModal}
        footer={[
          <Button key="ok" onClick={onOkClick} type='primary'>Ok</Button>,
        ]}
      >
        Đăng xuất thành công
      </Modal>
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
                    <span className="notifications-click" onClick={toggleNotifications}></span>
                    <i style={{ color: showNotifications ? "white" : "" }}><FontAwesomeIcon icon={faBell} /></i>
                    <span className="notifications-number" style={{ display: unCheckCount ? "" : "none" }}>{unCheckCount}</span>
                    <div style={showNotifications ? { display: 'block' } : {}}>
                      {
                        loadingNotifications
                          ? <span className="load_span" style={{ display: "block" }}>
                            <span className="loader_2"></span>
                          </span>
                          : notifications.length > 0
                            ? <React.Fragment>
                              <ul>
                                {
                                  notifications.map(item => <Notification notification={{ ...item }} key={item.id} toggle={toggleNotifications} />)
                                }
                              </ul>
                              <a href="">Tất cả thông báo.</a>
                            </React.Fragment>
                            : <ul>
                              <li>
                                <div>Không có thông báo nào cả.</div>
                              </li>
                            </ul>
                      }
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
                        <Link to="/editprofile">
                          <i className="icon-pencil"><FontAwesomeIcon icon={faEdit} /></i>Chỉnh sửa thông tin
                        </Link>
                      </li>
                      <li>
                        <a href="#">
                          <i className="icon-pencil"><FontAwesomeIcon icon={faQuestionCircle} /></i>Câu hỏi đã hỏi
                          </a>
                      </li>
                      <li>
                        <a href="#" onClick={handleLogoutClick}>
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
                    <input type="search" className="live-search live-search-icon" autoComplete="off" placeholder="Nhập từ khóa" name="search" onChange={handleKeywordChange} onKeyPress={handleKeyPress} />
                    {/* <div className="search-click"></div> */}
                    <button type="submit" onClick={handleKeywordSubmit}>
                      <i>
                        <FontAwesomeIcon icon={faSearch} size='xs' />
                      </i>
                    </button>
                  </div>
                </form>
              </div>
              <nav className="nav float_l" >
                <h3 className="screen-reader-text">Queswer Navigation</h3>
                <ul id="menu-header" className='menu'>
                  <li className='menu-item menu-item-type-post_type menu-item-object-page menu-item-home page_item page-item-64'>
                    <NavLink exact to="/" activeClassName="current-page-header-bar">Trang chủ</NavLink>
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
    notifications: state.notification.notifications,
    loadingNotifications: state.notification.loading,
    token: state.account.token,
    keyword: state.questionSearch.keyword
  };
}

const mapDispatchToProps = {
  logout,
  fetchNotifications,
  checkAll,
  setKeyword
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar)
