import React, { Component } from 'react'
import { connect } from 'react-redux'
import { faEnvelope, faLock, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { changeModal, toggleModal } from '../../redux/ducks/modal'
import { delay } from '../../common/functions'
import LoginPanel from './LoginPanel'
import { signup, resetError } from '../../redux/ducks/account'
class SignupPanel extends Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    confirm: "",
    agreeTerms: false,
    localError: null
  }
  showLoginPanel = async () => {
    const { changeModal, toggleModal } = this.props
    changeModal(LoginPanel)
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
      const { displayName, email, password } = this.state
      const data = { displayName, email, password }
      const { signup } = this.props
      signup(data)
    }
  }
  checkForError = () => {
    const { displayName, email, password, confirm, agreeTerms } = this.state
    if (!displayName || !email || !password || !confirm || !agreeTerms) {
      return "Bạn chưa nhập đủ các thông tin cần thiết"
    }
    if (!email.includes("@")) {
      return "Vui lòng nhập đúng định dạng email"
    }
    if (password !== confirm) {
      return "Xác nhận mật khẩu không đúng"
    }
    return null
  }
  render() {
    const { displayName, password, confirm, email, agreeTerms, localError } = this.state
    const { loading,signupError  } = this.props
    return (
      <React.Fragment>
        <div className='panel-image-content signup-panel'>
          <div className='panel-image-opacity'></div>
          <div className="panel-image-inner">
            <h3>Đăng ký</h3>
            <p>Đăng ký để được giải đáp những thắc mắc &amp; Trả lời những câu hỏi từ người khác &amp; Kết nối với mọi người
            </p>
          </div>
          <a className="signup-panel button-default" onClick={this.showLoginPanel}>Đã có tài khoản? Đăng nhập</a>
        </div>
        <div className="panel-pop-content">
          <form className='wpqa_form signup-form' method='post'>
            <div className="wpqa_error_desktop">
              <div className="wpqa_error" style={{ display: localError ? "block" : "none" }}>
                <span className="required-error">
                  <strong>Lỗi</strong>
                  {`: ${localError}`}
                </span>
              </div>
            </div>
            <div className="wpqa_error_desktop">
              <div className="wpqa_error" style={{ display: signupError ? "block" : "none" }}>
                <span className="required-error">
                  <strong>Lỗi</strong>
                  {`: ${signupError}`}
                </span>
              </div>
            </div>
            <div className='form-inputs clearfix'>
              <p className="username_field">
                <label htmlFor="name">Tên hiển thị<span className="required">*</span></label>
                <input type="text" name="displayName" id="name" onChange={this.handleInputChange} value={displayName} />
                <i className="icon-user">
                  <FontAwesomeIcon icon={faUser} />
                </i>
              </p>
              <p className="email_field">
                <label htmlFor="email_730">E-Mail<span className="required">*</span></label>
                <input type="email" name="email" id="email_730" onChange={this.handleInputChange} value={email} />
                <i className="icon-mail">
                  <FontAwesomeIcon icon={faEnvelope} />
                </i>
              </p>
              <p className="password_field">
                <label htmlFor="pass1_730">Mật khẩu<span className="required">*</span></label>
                <input type="password" name="password" id="pass1_730" autoComplete="off" onChange={this.handleInputChange} value={password} />
                <i className="icon-lock-open">
                  <FontAwesomeIcon icon={faUnlock} />
                </i>
              </p>
              <p className="password_confirm_field">
                <label htmlFor="pass2_730">Xác nhận mật khẩu<span className="required">*</span></label>
                <input type="password" name="confirm" id="pass2_730" autoComplete="off" onChange={this.handleInputChange} value={confirm} />
                <i className="icon-lock-open">
                  <FontAwesomeIcon icon={faLock} />
                </i>
              </p>
              <p className="wpqa_checkbox_p">
                <label htmlFor="agree_terms-730">
                  <span className="wpqa_checkbox">
                    <input type="checkbox" id="agree_terms-730" name="agreeTerms" checked={agreeTerms} onChange={this.handleInputChange} />
                  </span>
                  <span className="wpqa_checkbox_span">Khi đăng ký, bạn đã đọc và đồng ý với <a target="_blank"> Điều khoản sử dụng </a> và <a target="_blank"> Chính sách riêng tư </a>.<span className="required">*</span>
                  </span>
                </label>
              </p>
            </div>
            <div className="clearfix"></div>
            <p className="form-submit login-submit">
              <span className="load_span" style={{ display: loading ? "block" : "none" }}>
                <span className="loader_2"></span>
              </span>
              <input type="submit" value="Đăng ký" style={{ display: loading ? "none" : "block" }}
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
  loading: state.account.loadingSignup,
  signupError: state.account.signupError,
})

const mapDispatchToProps = {
  changeModal,
  toggleModal,
  signup,
  resetError
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPanel)
