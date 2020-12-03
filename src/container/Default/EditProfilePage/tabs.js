import { faCamera, faEnvelope, faIdCard, faMapMarkerAlt, faPhoneAlt, faUser, faAngleDown, faGlobeAsia, faLock, faUnlock, faUnlockAlt } from '@fortawesome/free-solid-svg-icons'
import { faSmile } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef } from 'react'
import defaultAvatar from '../../../assets/image/user_avatar_default.png'
import DatePicker, { registerLocale } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi'
import { useEffect } from 'react'
registerLocale('vi', vi)
export function EditProfile(props) {
  var myRef = useRef(null)
  const scrollToMyRef = () => {
    window.scrollTo(0, myRef.current.scrollIntoView())
  }
  const { profile, handleInputChange, handleDateChange, handleFileSelect, addresses, handleSubmit,
    localErr, apiErr, loading } = props
  useEffect(() => {
    if (localErr || apiErr) {
      scrollToMyRef()
    }
  })
  //console.log(profile)
  const { displayName, aboutMe, avatarUrl, email, phoneNumber, gender, birthDate, addressId, localAvatarUrl } = profile
  return <form className='edit-profile-form wpqa_form wpqa-readonly' ref={myRef}>
    {localErr ? <div className="wpqa_error" style={{ display: "block" }}>
      <strong>Lỗi :&nbsp;</strong> {localErr}
    </div> : null}
    {apiErr ? <div className="wpqa_error" style={{ display: "block" }}>
      <strong>Lỗi :&nbsp;</strong> {apiErr}
    </div> : null}
    <div className='form-inputs clearfix wpqa-edit-profile'>
      <div className='page-sections' id='edit-profile'>
        <div className="page-section page-section-basic">
          <div className="page-wrap-content">
            <h2 className="post-title-2"><i className="icon-vcard"><FontAwesomeIcon icon={faIdCard} /></i>Thông tin cơ bản</h2>
            <p className="email_field">
              <label htmlFor="email_372">E-Mail<span className="required">*</span></label>
              <input type="text" name="email" id="email_372" value={email} onChange={handleInputChange} />
              <i className="icon-mail"><FontAwesomeIcon icon={faEnvelope} /></i>
            </p>
            <p className="name_field">
              <label htmlFor="name_372">Tên hiển thị<span className="required">*</span></label>
              <input type="text" name="displayName" id="name_372" value={displayName} onChange={handleInputChange} />
              <i className="icon-user"><FontAwesomeIcon icon={faUser} /></i>
            </p>
            <div className="clearfix"></div>
            <div className="author-image profile-image">
              <span className="author-image-span wpqa-delete-image-span">
                <img className="avatar avatar-100 photo" alt="b12345" src={avatarUrl ? avatarUrl : defaultAvatar} />
              </span>
            </div>
            <label htmlFor="your_avatar_372">Ảnh đại diện</label>
            <div className="fileinputs">
              <input type="file" name="you_avatar" id="your_avatar_372" onChange={handleFileSelect} />
              <div className="fakefile">
                <button type="button">{localAvatarUrl ? localAvatarUrl : "Select file"}</button>
                <span>Browse</span>
              </div>
              <i className="icon-camera"><FontAwesomeIcon icon={faCamera} /></i>
            </div>
            <div className="clearfix"></div>
            <p className="country_field">
              <label htmlFor="country_372">Tỉnh thành</label>
              <span className="styled-select">
                <FontAwesomeIcon icon={faAngleDown} className='arrow_down' />
                <select name="addressId" id="country_372" onChange={handleInputChange} value={addressId}>
                  <option value={0}>Chọn 1 thành phố...</option>
                  {
                    addresses.map(item => <option value={item.id} key={item.id}>{item.city}</option>)
                  }
                </select>
              </span>
              <i className="icon-location"><FontAwesomeIcon icon={faMapMarkerAlt} /></i></p>
            <p className="phone_field">
              <label htmlFor="phone_372">Số điện thoại</label>
              <input type="text" name="phoneNumber" id="phone_372" value={phoneNumber ? phoneNumber : ""} onChange={handleInputChange} />
              <i className="icon-phone"><FontAwesomeIcon icon={faPhoneAlt} /></i>
            </p>
            <p className="gender_field wpqa_radio_p"><label>Giới tính</label></p>
            <div className="wpqa_radio_div">
              <p>
                <span className="wpqa_radio">
                  <input id="gender_male_372" name="gender" type="radio" value={true} checked={gender ? true : false} onChange={handleInputChange} />
                </span>
                <label htmlFor="gender_male_372">Nam</label>
              </p>
              <p>
                <span className="wpqa_radio">
                  <input id="gender_female_372" name="gender" type="radio" value={false} checked={gender ? false : true} onChange={handleInputChange} />
                </span>
                <label htmlFor="gender_female_372">Nữ</label>
              </p>
              <div className="clearfix"></div>
            </div>
            <span className="age_field">
              <label htmlFor="age_372">Ngày sinh</label>
              <DatePicker
                selected={birthDate ? new Date(birthDate) : null}
                onChange={date => handleDateChange(date, handleInputChange)}
                dateFormat="dd/MM/yyyy"
                locale='vi' />
              <i className="icon-globe"><FontAwesomeIcon icon={faGlobeAsia} /></i>
            </span>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
      <div className="page-section page-section-about">
        <div className="page-wrap-content">
          <h2 className="post-title-2">
            <i className="icon-graduation-cap"><FontAwesomeIcon icon={faSmile} /></i>
            Giới thiệu bản thân
          </h2>
        </div>
        <textarea value={aboutMe ? aboutMe : ""} onChange={handleInputChange} rows='10' name='aboutMe' />
        <div className="clearfix"></div>
      </div>
    </div>
    <p className="form-submit">
      <span className="load_span" style={{ display: loading ? "block" : "none" }}>
        <span className="loader_2"></span>
      </span>
      <input type="submit" value="Lưu" style={{ display: loading ? "none" : "block" }}
        className="button-default button-hide-click login-submit submit" onClick={handleSubmit} />
    </p>
  </form>
}

export function ChangePassword(props) {
  const { handleInputChange, handleSubmit, password, loading, localErr, apiErr } = props
  const { oldPw, newPw, confirm } = password
  var myRef = useRef(null)
  const scrollToMyRef = () => {
    window.scrollTo(0, myRef.current.scrollIntoView())
  }
  useEffect(() => {
    if (localErr || apiErr) {
      scrollToMyRef()
    }
  })
  return <form className='edit-profile-form wpqa_form wpqa-readonly' ref={myRef}>
    {localErr ? <div className="wpqa_error" style={{ display: "block" }}>
      <strong>Lỗi :&nbsp;</strong> {localErr}
    </div> : null}
    {apiErr ? <div className="wpqa_error" style={{ display: "block" }}>
      <strong>Lỗi :&nbsp;</strong> {apiErr}
    </div> : null}
    <div className='form-inputs clearfix'>
      <div className="page-sections" id="change-password">
        <div className="page-section">
          <div className="page-wrap-content">
            <h2 className="post-title-2" style={{ marginBottom: "20px" }}>
              <i className="icon-lock"><FontAwesomeIcon icon={faLock} /></i>Đổi mật khẩu</h2>
            <p className="login-password"><label htmlFor="oldpassword_283">Mật khẩu cũ<span
              className="required">*</span></label>
              <input id="oldpassword_283" type="password" name="oldPw" value={oldPw} onChange={handleInputChange} />
              <i className="icon-lock-open"><FontAwesomeIcon icon={faLock} /></i>
            </p>
            <p className="login-password"><label htmlFor="newpassword_283">Mật khẩu mới<span
              className="required">*</span></label>
              <input id="newpassword_283" type="password" name="newPw" value={newPw} onChange={handleInputChange} />
              <i className="icon-lock-open"><FontAwesomeIcon icon={faUnlock} /></i>
            </p>
            <p className="login-password">
              <label htmlFor="newpassword2_283">Xác nhận mật khẩu<span
                className="required">*</span>
              </label>
              <input id="newpassword2_283" type="password" name="confirm" value={confirm} onChange={handleInputChange} />
              <i className="icon-lock-open"><FontAwesomeIcon icon={faUnlockAlt} /></i>
            </p>
          </div>
        </div>
      </div>
    </div>
    <p className="form-submit">
      <span className="load_span" style={{ display: loading ? "block" : "none" }}>
        <span className="loader_2"></span>
      </span>
      <input type="submit" value="Lưu" style={{ display: loading ? "none" : "block" }}
        className="button-default button-hide-click login-submit submit" onClick={handleSubmit} />
    </p>
  </form>
}