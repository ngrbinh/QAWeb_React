import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import defaultAvatar from '../../assets/image/user_avatar_default.png'
import { follow, unFollow } from '../../redux/ducks/user'

function UserTag(props) {
  const { user, profile, loadingFollow } = props
  const { displayName, avatarUrl, id, badges } = user
  let badge = {
  }
  if (badges) {
    badge = badges[0]
  }
  const followingIds = profile.followingUsers.map(item => item.id)
  const handleFollowClick = () => {
    props.follow(id)
  }
  const handleUnfollowClick = () => {
    props.unFollow(id)
  }
  return (
    <div className="col col4 user-tag">
      <div className="post-section user-area user-area-small_grid">
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
              <span className="badge-span" style={{ backgroundColor: '#0d0e11' }}>Begginer</span>
              <div className="user_follow_4 follow-btn" style={displayName ? null : { display: 'none' }}>
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
  profile: state.profile,
  loadingFollow: state.user.loadingFollow,
})

const mapDispatchToProps = {
  follow,
  unFollow
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTag)