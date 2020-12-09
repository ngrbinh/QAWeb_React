import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { delay } from '../../common/functions'
import { changeModal, toggleModal } from '../../redux/ducks/modal'
import ForgetPasswordPanel from './ForgetPasswordPanel'
import SignupPanel from './SignupPanel'
import { login, resetError } from '../../redux/ducks/account'

class LoginPanel extends Component {
  state = {
    email: "",
    password: "",
    rememberMe: false,
    localError: ""
  }
  showSignupPanel = async () => {
    const { toggleModal, changeModal } = this.props
    changeModal(SignupPanel)
    toggleModal()
    await delay(300)
    toggleModal()
  }
  handleInputChange = (e) => {
    const { name } = e.target
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({
      [name]: value,
      localError: null
    })
    this.props.resetError()
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const localError = this.checkForError()
    if (localError) {
      this.setState(state => ({
        ...state,
        localError: localError
      }))
    } else {
      const { email, password } = this.state
      const { login, history } = this.props
      login(email, password, history)
    }
  }
  checkForError = () => {
    const { email, password } = this.state
    if (!email || !password) {
      return "Bạn chưa nhập đủ các thông tin cần thiết"
    }
    if (!email.includes("@")) {
      return "Vui lòng nhập đúng định dạng email"
    }
    return null
  }
  showForgetPasswordPanel = async () => {
    const { toggleModal, changeModal } = this.props
    changeModal(ForgetPasswordPanel)
    toggleModal()
    await delay(300)
    toggleModal()
  }
  render() {
    const { loading, loginError } = this.props
    const { localError, email, password, rememberMe } = this.state
    return (
      <React.Fragment>
        <div className='panel-image-content login-panel'>
          <div className='panel-image-opacity'></div>
          <div className="panel-image-inner">
            <h3>Đăng nhập</h3>
            <p>Đăng nhập để được giải đáp những thắc mắc &amp; Trả lời những câu hỏi từ người khác &amp; Kết nối với mọi người
            </p>
          </div>
          <a className="signup-panel button-default" onClick={this.showSignupPanel}>Chưa có tài khoản? Đăng ký</a>
        </div>
        <div className="panel-pop-content">
          <form className='wpqa_form login-form wpqa_login' method='post'>
            <div className="wpqa_error_desktop">
              <div className="wpqa_error" style={{ display: localError ? "block" : "none" }}>
                <span className="required-error">
                  <strong>Lỗi</strong>
                  {`: ${localError}`}
                </span>
              </div>
            </div>
            <div className="wpqa_error_desktop">
              <div className="wpqa_error" style={{ display: loginError ? "block" : "none" }}>
                <span className="required-error">
                  <strong>Lỗi</strong>
                  {`: ${loginError}`}
                </span>
              </div>
            </div>
            <div className="form-inputs clearfix">
              <p className="login-text">
                <label htmlFor="username_694">Email<span className="required">*</span></label>
                <input id="username_694" type="text" name="email" value={email} onChange={this.handleInputChange} />
                <i className="icon-user">
                  <FontAwesomeIcon icon={faUser} />
                </i>
              </p>
              <p className="login-password">
                <label htmlFor="password_694">Mật khẩu<span className="required">*</span></label>
                <input id="password_694" type="password" name="password" value={password} onChange={this.handleInputChange} />
                <i className="icon-lock-open">
                  <FontAwesomeIcon icon={faLock} />
                </i>
              </p>
            </div>
            <div className="rememberme normal_label">
              <label>
                <span className="wpqa_checkbox">
                  <input type="checkbox" name="rememberMe" checked={rememberMe} onChange={this.handleInputChange} />
                </span>
                <span className="wpqa_checkbox_span">Nhớ mật khẩu</span>
              </label>
            </div>
            <a href="#" className="lost-password" onClick={this.showForgetPasswordPanel}>Quên mật khẩu?</a>
            <div className="clearfix"></div>
            <p className="form-submit login-submit">
              <span className="load_span" style={{ display: loading ? "block" : "none" }}>
                <span className="loader_2"></span>
              </span>
              <input type="submit" value="Đăng nhập" style={{ display: loading ? "none" : "block" }}
                className="button-default login-submit" onClick={this.handleSubmit}
              />
            </p>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.account.loadingLogin,
  loginError: state.account.loginError,
})

const mapDispatchToProps = {
  changeModal,
  toggleModal,
  login,
  resetError
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPanel)

