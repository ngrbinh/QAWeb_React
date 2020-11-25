import { icon } from '@fortawesome/fontawesome-svg-core'
import { faBook, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import defaultAvatar from '../../assets/image/user_avatar_default.png'
import { follow, unFollow } from '../../redux/ducks/user'

const UserDetailsTopBar = (props) => {
  const id = props.match.params.id
  const { userDetails, profile, isProfile, loadingFollow } = props
  const user = isProfile ? profile : userDetails
  //console.log(profile)
  const { displayName, avatarUrl, questionCount, followCount } = user
  const badges = user.badges && user.badges.length !== 0 ? user.badges : [{ typeName: "", typeColor: "" }]
  const followingIds = profile.followingUsers.map(item => item.id)
  const handleFollowClick = () => {
    props.follow(id)
  }
  const handleUnfollowClick = () => {
    props.unFollow(id)
  }
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
                    <span className="badge-span" style={{ backgroundColor: `#${badges[0].typeColor}` }}>{badges[0].typeName}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="wpqa-cover-right">
              {isProfile
                ? null
                : <div className="user_follow_4 user_follow_done">
                  <div className="small_loader loader_2"
                    style={{ display: loadingFollow.includes(id) ? "block" : "none" }}></div>
                  {
                    followingIds.includes(parseInt(id))
                      ? <a className="button-default" title="Unfollow" onClick={handleUnfollowClick}
                        style={{ display: loadingFollow.includes(id) ? "none" : "block" }}>
                        <span className="follow-value">Hủy theo dõi</span></a>
                      : <a className="button-default" title="follow" onClick={handleFollowClick}
                        style={{ display: loadingFollow.includes(id) ? "none" : "block" }}>
                        <span className="follow-value">Theo dõi</span></a>
                  }
                </div>
              }
              {
                isProfile
                  ? null
                  : <div className="ask-question">
                    <a href="" className="button-default ask-question-user">Hỏi {displayName}</a>
                  </div>
              }
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
  profile: state.profile,
  loadingFollow: state.user.loadingFollow,
})

const mapDispatchToProps = {
  follow,
  unFollow
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsTopBar)
