import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { delay } from '../../common/functions'
import { changeModal,toggleModal} from '../../redux/ducks/modal'
import ForgetPasswordPanel from './ForgetPasswordPanel'
import SignupPanel from './SignupPanel'

class LoginPanel extends Component {
  showSignupPanel = async () => {
    const {toggleModal, changeModal} = this.props
    changeModal(SignupPanel)
    toggleModal()
    await delay(300)
    toggleModal()
  }
  showForgetPasswordPanel = async () => {
    const {toggleModal, changeModal} = this.props
    changeModal(ForgetPasswordPanel)
    toggleModal()
    await delay(300)
    toggleModal()
  }
  render() {
    const {changeModal} = this.props
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
            <div className="wpqa_error_desktop"><div className="wpqa_error"></div></div>
            <div className="form-inputs clearfix">
              <p className="login-text">
                <label for="username_694">Email<span className="required">*</span></label>
                <input id="username_694" className="required-item" type="text" name="log" value="" />
                <i className="icon-user">
                  <FontAwesomeIcon icon={faUser} />
                </i>
              </p>
              <p className="login-password">
                <label for="password_694">Mật khẩu<span className="required">*</span></label>
                <input id="password_694" className="required-item" type="password" name="pwd" />
                <i className="icon-lock-open">
                  <FontAwesomeIcon icon={faLock} />
                </i>
              </p>
            </div>
            <div className="rememberme normal_label">
              <label>
                <span className="wpqa_checkbox">
                  <input type="checkbox" name="rememberme" value="forever" />
                </span>
                <span className="wpqa_checkbox_span">Nhớ mật khẩu</span>
              </label>
            </div>
            <a href="#" className="lost-password" onClick={this.showForgetPasswordPanel}>Quên mật khẩu?</a>
            <div className="clearfix"></div>
            <p className="form-submit login-submit">
              <span className="load_span">
                <span className="loader_2"></span>
              </span>
              <input type="submit" value="Đăng nhập" className="button-default login-submit" />
            </p>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  changeModal,
  toggleModal
}

export default connect(null,mapDispatchToProps)(LoginPanel)

