import { faBook, faCheck, faCommentAlt, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { follow, unFollow } from '../../redux/ducks/user'

function UserTagDetail(props) {
  const { user, profile, loadingFollow } = props
  const { avatarUrl, answerCount, questionCount, point, id, displayName, voteCount } = user
  const followingIds = profile.followingUsers.map(item => item.id)
  const handleFollowClick = () => {
    props.follow(id)
  }
  const handleUnfollowClick = () => {
    props.unFollow(id)
  }
  console.log(loadingFollow)
  return (
    <div className="col col6">
      <div className="post-section user-area user-area-columns">
        <div className="post-inner" >
          <div className="author-image author-image-70">
            <Link to={`/user/${id}`}>
              <span className="author-image-span">
                <img className="avatar avatar-70 photo" alt={displayName} width="70" height="70"
                  src={avatarUrl} />
              </span>
            </Link>
          </div>
          <div className="user-content">
            <div className="user-inner">
              <div className="user-data-columns">
                <h4><Link to={`/user/${id}`}>{displayName}</Link><span className="verified_user tooltip-n" original-title="Verified"><i
                  className="icon-check"></i></span></h4><span className="badge-span"
                    style={{ backgroundColor: '#ffbf00' }}>Pundit</span>
              </div>
            </div>
          </div>
          <div className="user-columns-data">
            <ul>
              <li className="user-columns-questions">
                <a href="#">
                  <i className="icon-book-open"><FontAwesomeIcon icon={faBook} /></i>{questionCount + ' '} câu hỏi
                </a>
              </li>
              <li className="user-columns-answers">
                <a href="#">
                  <i className="icon-comment"><FontAwesomeIcon icon={faCommentAlt} /></i>{answerCount + ' '} câu trả lời
                </a>
              </li>
              <li className="user-columns-points">
                <a href="#">
                  <i className="icon-bucket"><FontAwesomeIcon icon={faStar} /></i>{point + ' '} điểm
                </a>
              </li>
              <li className="user-columns-points">
                <a href="#">
                  <i className="icon-bucket"><FontAwesomeIcon icon={faCheck} /></i>{voteCount + ' '} điểm
                </a>
              </li>
            </ul>
          </div>
          <div className="user-follow-profile">
            <div className="user_follow_2" style={profile.displayName ? null : { display: 'none' }}>
              <div className="small_loader loader_2 user_follow_loader"
                style={{ display: loadingFollow.includes(id) ? "inline-block" : "none" }}></div>
              {
                followingIds.includes(parseInt(id))
                  ? <a className="following_you" title="Follow" onClick={handleUnfollowClick}
                    style={{ display: loadingFollow.includes(id) ? "none" : "block" }}>
                    <span className="follow-value txt-transform-none">Hủy theo dõi</span>
                  </a>
                  : <a className="" title="Follow" onClick={handleFollowClick}
                    style={{ display: loadingFollow.includes(id) ? "none" : "block" }}>
                    <span className="follow-value txt-transform-none">Theo dõi</span>
                  </a>
              }
            </div>
            <Link to={`/user/${id}`}>Xem hồ sơ cá nhân</Link>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  loadingFollow: state.user.loadingFollow,
})

const mapDispatchToProps = {
  follow,
  unFollow
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTagDetail)
