import React, { Component } from 'react'
import { connect } from 'react-redux'
import { faHome, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { About, Answers, Followers, Following, Questions } from './tabs'
import { Link, NavLink, Route, Switch } from 'react-router-dom'
import { fetchUserDetails } from '../../../redux/ducks/user'
import { fetchProfile } from '../../../redux/ducks/profile'

class UserDetailPage extends Component {
  handleSwitchTab = (i) => () => this.setState(state => ({ ...state, tabIndex: i }))
  componentDidMount() {
    const { fetchUserDetails, fetchProfile, isProfile } = this.props
    if (isProfile) {
      fetchProfile()
    } else {
      const id = this.props.match.params.id
      fetchUserDetails(id)
    }
  }
  render() {
    const { url, path } = this.props.match
    const { userDetails, profile, isProfile } = this.props
    //console.log(isProfile)
    const id = isProfile ? profile.id : this.props.match.params.id
    const user1 = {
      name: 'Martin Hope',
      questionCount: 3,
      answerCount: 7,
      point: 110,
      phoneNumber: '123023012',
      gender: 1,
      birthDate: '2012-02-12'
    }
    const user = isProfile ? profile : userDetails
    return (
      <React.Fragment>
        <div className="breadcrumbs breadcrumbs_1">
          <div className="breadcrumbs-wrap">
            <div className="breadcrumb-left">
              <span className="crumbs">
                <span>
                  <span>
                    <meta content="1" />
                    <a href="#" title="Home">
                      <span ><i className="icon-home">
                        <FontAwesomeIcon icon={faHome} />
                      </i>Trang chủ</span>
                    </a>
                  </span>
                  <span className="crumbs-span">/</span><span >{isProfile ? "Thông tin cá nhân" : user.displayName}</span>
                </span>
              </span>
            </div>
            {isProfile
              ? <div className="breadcrumb-right">
                <div className="question-navigation edit-profile">
                  <Link to='/edit'>
                    <i className="icon-pencil"><FontAwesomeIcon icon={faPencilAlt} /></i>Chỉnh sửa thông tin
                  </Link>
                </div>
                <div className="clearfix"></div>
              </div>
              : null
            }
          </div>
        </div>
        <div className="clearfix"></div>
        <div className="wrap-tabs">
          <div className="menu-tabs active-menu">
            <ul className="menu flex menu-tabs-desktop">
              <li><NavLink to={url} activeClassName='userdetail-active-tab' exact>About</NavLink></li>
              <li><NavLink to={`${url}/questions`} activeClassName='userdetail-active-tab' exact>Questions</NavLink></li>
              <li><NavLink to={url + '/answers'} activeClassName='userdetail-active-tab' exact>Answers</NavLink></li>
              <li><NavLink to={url + '/followers'} activeClassName='userdetail-active-tab' exact>Followers</NavLink></li>
              <li><NavLink to={url + '/following'} activeClassName='userdetail-active-tab' exact>Following</NavLink></li>
            </ul>
          </div>
        </div>
        <React.Fragment>
          <Switch>
            <Route path={path} exact><About user={user} /></Route>
            <Route path={`${path}/questions`} exact><Questions id={id} /></Route>
            <Route path={`${path}/answers`} exact><Answers id={id} /></Route>
            <Route path={`${path}/followers`} exact><Followers id={id} /></Route>
            <Route path={`${path}/following`} exact><Following id={id} /></Route>
          </Switch>
        </React.Fragment>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  userDetails: state.user.userDetails,
  profile: state.profile
})

const mapDispatchToProps = {
  fetchUserDetails,
  fetchProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailPage)
