import React, { Component } from 'react'
import { connect } from 'react-redux'
import { faEnvelope, faLock, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { changeModal,toggleModal} from '../../redux/ducks/modal'
import { delay } from '../../common/functions'
import LoginPanel from './LoginPanel'
class SignupPanel extends Component {
  showLoginPanel = async () => {
    const {changeModal,toggleModal} = this.props
    changeModal(LoginPanel)
    toggleModal()
    await delay(300)
    toggleModal()
  }
  render() {
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
          <form className='wpqa_form signup-form' method='post' enctype="multipart/form-data">
            <div className="wpqa_error_desktop"><div className="wpqa_error"></div></div>
            <div className='form-inputs clearfix'>
              <p className="username_field">
                <label for="user_name_730">Tên hiển thị<span className="required">*</span></label>
                <input type="text" className="required-item" name="user_name" id="user_name_730" />
                <i className="icon-user">
                  <FontAwesomeIcon icon={faUser} />
                </i>
              </p>
              <p className="email_field">
                <label for="email_730">E-Mail<span className="required">*</span></label>
                <input type="email" className="required-item" name="email" id="email_730" value="" />
                <i className="icon-mail">
                  <FontAwesomeIcon icon={faEnvelope} />
                </i>
              </p>
              <p className="password_field">
                <label for="pass1_730">Mật khẩu<span className="required">*</span></label>
                <input type="password" className="required-item" name="pass1" id="pass1_730" autocomplete="off" />
                <i className="icon-lock-open">
                  <FontAwesomeIcon icon={faUnlock} />
                </i>
              </p>
              <p className="password_confirm_field">
                <label for="pass1_730">Xác nhận mật khẩu<span className="required">*</span></label>
                <input type="password" className="required-item" name="pass1" id="pass1_730" autocomplete="off" />
                <i className="icon-lock-open">
                  <FontAwesomeIcon icon={faLock} />
                </i>
              </p>
              <p className="wpqa_checkbox_p">
                <label for="agree_terms-730">
                  <span className="wpqa_checkbox">
                    <input type="checkbox" id="agree_terms-730" name="agree_terms" value="on" />
                  </span>
                  <span className="wpqa_checkbox_span">Khi đăng ký, bạn đã đọc và đồng ý với <a target="_blank"> Điều khoản sử dụng </a> và <a target="_blank"> Chính sách riêng tư </a>.<span className="required">*</span>
                  </span>
                </label>
              </p>
            </div>
            <div className="clearfix"></div>
            <p className="form-submit login-submit">
              <span className="load_span">
                <span className="loader_2"></span>
              </span>
              <input type="submit" value="Đăng ký" className="button-default login-submit" />
            </p>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
  changeModal,
  toggleModal
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPanel)
