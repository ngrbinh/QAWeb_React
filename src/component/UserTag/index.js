import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import defaultAvatar from '../../assets/image/user_avatar_default.png'
import { follow, unFollow } from '../../redux/ducks/user'

function UserTag(props) {
  const { user, profile, loadingFollow } = props
  const { displayName, avatarUrl, id } = user
  const badges = user.badges && user.badges.length !== 0 ? user.badges : [{ typeName: "", typeColor: "" }]
  const followingIds = profile.followingUsers.map(item => item.id)
  const showFollow = profile.displayName ? true : false
  const handleFollowClick = (e) => {
    e.preventDefault()
    props.follow(id)
  }
  const handleUnfollowClick = (e) => {
    e.preventDefault()
    props.unFollow(id)
  }
  return (
    <div className="col col4 user-tag">
      <div className="post-section user-area user-area-small_grid" style={{ height: 'auto' }}>
        <div className="post-inner">
          <div className="author-image author-image-84">
            <Link to={`/user/${user.id}`}>
              <span className="author-image-span">
                <img className="avatar avatar-84 photo user-tag" alt="ecd000" title="ecd000" width="84" height="84"
                  src={avatarUrl ? avatarUrl : defaultAvatar} />
              </span>
            </Link>
          </div>
          <div className="user-content">
            <div className="user-inner">
              <h4><Link to={`/user/${id}`}>{displayName}</Link></h4>
              <span className="badge-span" style={{ backgroundColor: `#${badges[0].typeColor}` }}>{badges[0].typeName}</span>
              <div className="user_follow_4 follow-btn" style={showFollow ? null : { display: 'none' }}>
                <div className="small_loader loader_2" style={{ display: loadingFollow.includes(id) ? "inline-block" : "none" }}>
                </div>
                {
                  followingIds.includes(parseInt(id))
                    ? <a className="button-default" title="Follow" onClick={handleUnfollowClick}
                      style={{ display: loadingFollow.includes(id) ? "none" : "block" }}>
                      <span className="follow-value txt-transform-none">Hủy theo dõi</span>
                    </a>
                    : <a className="button-default" title="Follow" onClick={handleFollowClick}
                      style={{ display: loadingFollow.includes(id) ? "none" : "block" }}>
                      <span className="follow-value txt-transform-none">Theo dõi</span>
                    </a>
                }
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
  //profile: state.profile,
  loadingFollow: state.user.loadingFollow,
})

const mapDispatchToProps = {
  follow,
  unFollow
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTag)