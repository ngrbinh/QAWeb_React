import { icon } from '@fortawesome/fontawesome-svg-core'
import { faBook, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import defaultAvatar from '../../assets/image/user_avatar_default.png'

const UserDetailsTopBar = (props) => {
  const id = props.match.params.id
  const { userDetails, profile, isProfile } = props
  const user1 = {
    name: 'Martin Hope',
    avatarUrl: 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-84x84.jpg',
    questionCount: 3,
    followCount: 7
  }
  const user = isProfile ? profile : userDetails
  const { displayName, avatarUrl, questionCount, followCount } = user
  return (
    <div className="wpqa-profile-cover wpqa-profile">
      <div className="wpqa-cover-background">
        <div className="cover-opacity"></div>
        <div className="wpqa-cover-inner the-main-container">
          <div className="wpqa-cover-content">
            <div className="post-section user-area user-advanced user-cover">
              <div className="post-inner">
                <div className="user-head-area">
                  <div className="author-image author-image-84">
                    <a>
                      <span className="author-image-span">
                        <img className="avatar avatar-84 photo user-detail-avatar" src={avatarUrl ? avatarUrl : defaultAvatar} />
                      </span>
                    </a>
                  </div>
                </div>
                <div className="user-content">
                  <div className="user-inner">
                    <h4><a href="">{displayName}</a></h4>
                    <span className="badge-span" style={{ backgroundColor: '#ffbf00' }}>Pundit</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="wpqa-cover-right">
              {isProfile
                ? <div className="user_follow_4 user_follow_done">
                  <div className="small_loader loader_2"></div>
                  <a href="#" className="following_not button-default" data-rel="6" title="Unfollow">
                    <span className="follow-value">Chỉnh sửa thông tin</span></a>
                </div>
                : <div className="user_follow_4 user_follow_done">
                  <div className="small_loader loader_2"></div>
                  <a href="#" className="following_not button-default" data-rel="6" title="Unfollow">
                    <span className="follow-value">Hủy theo dõi</span></a>
                </div>
              }
              <div className="ask-question">
                <a href="" className="button-default ask-question-user">Hỏi {displayName}</a>
              </div>
              <div className="wpqa-cover-buttons wpqa-cover-followers">
                <i className="icon-users"><FontAwesomeIcon icon={faUsers} /></i>
                <span className="cover-count follow-cover-count">{followCount}</span>người theo dõi
              </div>
              <div>
                <a className="wpqa-cover-buttons wpqa-cover-questions" href="">
                  <i className="icon-book-open"><FontAwesomeIcon icon={faBook} /></i>
                  <span className="cover-count">{questionCount}</span>câu hỏi
                </a>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userDetails: state.user.userDetails,
  profile: state.profile
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsTopBar)
