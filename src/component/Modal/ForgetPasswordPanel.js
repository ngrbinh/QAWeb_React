import React, { Component } from 'react'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default class ForgetPasswordPanel extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='panel-image-content fg-password-panel'>
          <div className='panel-image-opacity'></div>
          <div className="panel-image-inner">
            <h3>Quên mật khẩu</h3>
            <p>Vui lòng nhập Email mà bạn đã đăng ký, bạn sẽ nhận được liên kết để tạo một mật khẩu mới thông qua 
              Email
            </p>
          </div>
        </div>
        <div className="panel-pop-content">
          <form className='wpqa-lost-password wpqa_form' method='post'>
            <div className="wpqa_error_desktop"><div className="wpqa_error"></div></div>
            <div className="form-inputs clearfix">
              <p>
                <label for="usermail_753">Email<span className="required">*</span></label>
                <input id="usermail_753" className="required-item" type="email" name="log" />
                <i className="icon-email">
                  <FontAwesomeIcon icon={faEnvelope} />
                </i>
              </p>
            </div>
            <div className="clearfix"></div>
            <p className="form-submit">
              <span className="load_span">
                <span className="loader_2"></span>
              </span>
              <input type="submit" value="Xác nhận" className="button-default" />
            </p>
          </form>
        </div>
      </React.Fragment>
    )
  }
}
