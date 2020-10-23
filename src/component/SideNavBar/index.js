import { faBookOpen, faHome, faTrophy, faUserFriends, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { NavLink} from 'react-router-dom'

export default class SideNavBar extends Component {
  render() {
    return (
      <nav className='nav_menu float_r fixed_nav_menu side-nav-bar'>
        <div className='theiaStickySidebar side-bar'>
          <h3 className="screen-reader-text">Explore</h3>
          <ul className='menu-explore-not-login'>
            <li className='menu-item menu-item-type-post_type menu-item-object-page'>
              <NavLink activeClassName='sidenav-active' to='/' exact>
                <i><FontAwesomeIcon icon={faHome} /></i>
                Trang chủ
              </NavLink>
            </li>
            <li className='menu-item menu-item-type-post_type menu-item-object-page'>
              <NavLink to='/user' activeClassName='sidenav-active'>
                <i><FontAwesomeIcon icon={faUserFriends} /></i>
                Người dùng
              </NavLink>
            </li>
            <li className='menu-item menu-item-type-post_type menu-item-object-page'>
              <NavLink to='/badge' activeClassName='sidenav-active'>
                <i><FontAwesomeIcon icon={faTrophy} /></i>
                Huy hiệu
              </NavLink>
            </li>
            <li className='menu-item menu-item-type-post_type menu-item-object-page'>
              <a>
                <i><FontAwesomeIcon icon={faBookOpen} /></i>
                Câu hỏi
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
