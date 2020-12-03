import { faBars, faBook, faBookOpen, faHome, faTrophy, faUserFriends, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchGrades } from '../../redux/ducks/grade'
import { fetchSubjects } from '../../redux/ducks/subject'
import { setGradeId, setSubjectId } from '../../redux/ducks/questionSearch'

class SideNavBar extends Component {
  state = {
    gradeSubMenu: false,
    subjectSubMenu: false
  }
  componentDidMount() {
    this.props.fetchGrades()
    this.props.fetchSubjects()
  }
  toggleGradeMenu = () => {
    this.setState(state => ({
      ...state,
      gradeSubMenu: !state.gradeSubMenu
    }))
  }
  toggleSubjectMenu = () => {
    this.setState(state => ({
      ...state,
      subjectSubMenu: !state.subjectSubMenu
    }))
  }
  render() {
    const { gradeSubMenu, subjectSubMenu } = this.state
    const { grades, subjects, gradeId, subjectId, setGradeId, setSubjectId } = this.props
    return (
      <nav className='nav_menu float_r fixed_nav_menu side-nav-bar'>
        <div className='theiaStickySidebar side-bar'>
          <h3 className="screen-reader-text">Explore</h3>
          <ul className='menu-explore-not-login'>
            <li className='menu-item menu-item-type-post_type menu-item-object-page'>
              <NavLink activeClassName='sidenav-active' to='/' exact className='center-child-cross'>
                <i><FontAwesomeIcon icon={faHome} /></i>
                Trang chủ
              </NavLink>
            </li>
            <li className='menu-item menu-item-type-post_type menu-item-object-page'>
              <a onClick={this.toggleSubjectMenu} className='center-child-cross'>
                <i><FontAwesomeIcon icon={faBook} /></i>
                Môn học
              </a>
              <ul className="sub-menu" style={{ display: subjectSubMenu ? "block" : "none" }}>
                {
                  subjects.map(item => (
                    <li className="menu-item menu-item-type-custom menu-item-object-custom"
                      key={item.id}
                    >
                      <Link to="/" className={subjectId === item.id ? "current-select" : ""}
                        style={{ fontSize: 13, fontWeight: 500 }}
                        onClick={() => setSubjectId(item.id)}
                      >{item.name}</Link>
                    </li>
                  ))
                }
              </ul>
            </li>
            <li className='menu-item menu-item-type-post_type menu-item-object-page'>
              <a onClick={this.toggleGradeMenu} className='center-child-cross'>
                <i><FontAwesomeIcon icon={faBars} /></i>
                Cấp bậc
              </a>
              <ul className="sub-menu" style={{ display: gradeSubMenu ? "block" : "none" }}>
                {
                  grades.map(item => (
                    item.id >= 6
                      ? <li className="menu-item menu-item-type-custom menu-item-object-custom"
                        key={item.id}
                      >
                        <Link to="/" className={gradeId === item.id ? "current-select" : ""}
                          style={{ fontSize: 13, fontWeight: 500 }}
                          onClick={() => setGradeId(item.id)}
                        >{item.name}</Link>
                      </li>
                      : null
                  ))
                }
              </ul>
            </li>
            <li className='menu-item menu-item-type-post_type menu-item-object-page'>
              <NavLink to='/user' activeClassName='sidenav-active' className='center-child-cross'>
                <i><FontAwesomeIcon icon={faUserFriends} /></i>
                Người dùng
              </NavLink>
            </li>
            <li className='menu-item menu-item-type-post_type menu-item-object-page'>
              <NavLink to='/badge' activeClassName='sidenav-active' className='center-child-cross'>
                <i><FontAwesomeIcon icon={faTrophy} /></i>
                Huy hiệu
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  grades: state.grade.grades,
  subjects: state.subject.subjects,
  gradeId: state.questionSearch.gradeId,
  subjectId: state.questionSearch.subjectId
})

const mapDispatchToProps = {
  fetchGrades,
  fetchSubjects,
  setGradeId,
  setSubjectId
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar)

