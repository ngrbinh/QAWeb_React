import React, { Component } from 'react'
import { connect } from 'react-redux'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink, Route, Switch } from 'react-router-dom'
import { ChangePassword, EditProfile } from './tabs'
import { fetchProfile, editProfile, resetError as resetPrfError } from '../../../redux/ducks/profile'
import { changePassword, resetError as resetPwError } from '../../../redux/ducks/account'
import { fetchAddresses } from '../../../redux/ducks/address'
class EditProfilePage extends Component {
  state = {
    prfError: "",
    pwError: "",
    profile: this.profileState,
    password: {
      oldPw: "",
      newPw: "",
      confirm: ""
    }
  }
  //Start: Funtions for profile tab
  handlePrfInputChange = e => {
    var { name, value } = e.target
    if (name === "gender") {
      value = value === "true" ? true : false
    }
    this.setState(state => ({
      ...state,
      profile: {
        ...state.profile,
        [name]: value
      },
      prfError: ""
    }))
    this.props.resetPrfError()
  }
  handleSubmitProfile = e => {
    const { history } = this.props
    e.preventDefault()
    const prfError = this.checkInputProfile()
    if (prfError) {
      this.setState(state => ({
        ...state,
        prfError
      }))
    } else {
      this.props.editProfile(this.state.profile.id, { ...this.state.profile }, history)
    }
  }
  checkInputProfile = () => {
    const { displayName, email } = this.state.profile
    if (!displayName || !email) {
      return "Không thể để trống tên hiển thị và email"
    }
    return null
  }
  //End: Funtions for profile tab

  //Start: Funtions for password tab 
  handlePwInputChange = e => {
    var { name, value } = e.target
    this.setState(state => ({
      ...state,
      password: {
        ...state.password,
        [name]: value
      },
      pwError: ""
    }))
    this.props.resetPwError()
  }
  handleSubmitPw = e => {
    e.preventDefault()
    const { history } = this.props
    const pwError = this.checkInputPw()
    if (pwError) {
      this.setState(state => ({
        ...state,
        pwError
      }))
    } else {
      const { oldPw, newPw } = this.state.password
      this.props.changePassword({ oldPassword: oldPw, newPassword: newPw },history)
    }
  }
  checkInputPw = () => {
    const { oldPw, newPw, confirm } = this.state.password
    if (!oldPw || !newPw || !confirm) {
      return "Bạn chưa điền đủ các trường cần thiết"
    }
    if (newPw !== confirm) {
      return "Xác nhận mật khẩu không đúng"
    }
    return null
  }
  //End: Funtions for password tab 
  componentDidMount() {
    this.props.fetchProfile()
    this.props.fetchAddresses()
  }
  componentDidUpdate(prevProps) {
    if (this.props.profile.id !== prevProps.profile.id) {
      this.setState({ profile: this.profileState })
    }
  }
  get profileState() {
    const { profile } = this.props
    const state = {
      ...profile,
      email: profile.account ? profile.account.email : "",
      addressId: profile.address ? profile.address.id : 0,
      gender: profile.gender
    }
    return {
      ...state
    }
  }
  handleDateChange(date, handleInputChange) {
    const e = {
      target: {
        name: "birthDate",
        value: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      }
    }
    handleInputChange(e)
  }
  render() {
    const { url, path } = this.props.match
    const { profile, prfError, password, pwError } = this.state
    const { addresses, apiPrfErr, loadingProfile, apiPwErr, loadingPw } = this.props
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
                      <span ><i className="icon-home"><FontAwesomeIcon icon={faHome} /></i>Trang chủ</span>
                    </a>
                  </span>
                  <span className="crumbs-span">/</span><span >Chỉnh sửa thông tin</span>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="wrap-tabs">
          <div className="menu-tabs active-menu">
            <ul className="menu flex menu-tabs-desktop">
              <li><NavLink to={path} activeClassName='userdetail-active-tab' exact>Sửa thông tin cá nhân</NavLink></li>
              <li><NavLink to={`${path}/password`}
                activeClassName='userdetail-active-tab' exact>Đổi mật khẩu</NavLink></li>
            </ul>
          </div>
        </div>
        <Switch>
          <Route path={path} exact>
            <EditProfile profile={profile} addresses={addresses} handleSubmit={this.handleSubmitProfile}
              handleInputChange={this.handlePrfInputChange} handleDateChange={this.handleDateChange}
              localErr={prfError} apiErr={apiPrfErr} loading={loadingProfile} />
          </Route>
          <Route path={`${path}/password`}>
            <ChangePassword handleInputChange={this.handlePwInputChange} handleSubmit={this.handleSubmitPw}
              password={password} localErr={pwError} apiErr={apiPwErr} loading={loadingPw} />
          </Route>
        </Switch>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  addresses: state.address.addresses,
  loadingProfile: state.profile.loadingEdit,
  apiPrfErr: state.profile.editError,
  loadingPw: state.account.loadingPassword,
  apiPwErr: state.account.passwordError
})

const mapDispatchToProps = {
  fetchProfile,
  changePassword,
  fetchAddresses,
  editProfile,
  resetPrfError,
  resetPwError
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage)
