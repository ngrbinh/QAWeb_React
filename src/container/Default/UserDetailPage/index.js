import React, { Component } from 'react'
import { connect } from 'react-redux'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { About, Answers, Followers, Following, Questions } from './tabs'
import { NavLink, Route, Switch } from 'react-router-dom'
class UserDetailPage extends Component {
  handleSwitchTab = (i) => () => this.setState(state => ({ ...state, tabIndex: i }))
  render() {
    const id = this.props.match.params.id
    const {url,path} = this.props.match
    const user = {
      name: 'Martin Hope',
      questionCount: 3,
      answerCount: 7,
      point: 110,
      phoneNumber: '123023012',
      gender: 1,
      birthDate: '2012-02-12'
    }
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
                      </i>Home</span>
                    </a>
                  </span>
                  <span className="crumbs-span">/</span><span >{user.name}</span>
                </span>
              </span>
            </div>
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
            <Route path={`${path}/questions`} exact><Questions id={id}/></Route>
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

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailPage)
