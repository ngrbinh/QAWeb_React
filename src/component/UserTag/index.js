import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function UserTag(props) {
  const { user, profile } = props
  const { displayName, avatarUrl, id } = user
  return (
    <div className="col col4 user-tag">
      <div className="post-section user-area user-area-small_grid">
        <div className="post-inner">
          <div className="author-image author-image-84">
            <Link to={`/user/${user.id}`}>
              <span className="author-image-span">
                <img className="avatar avatar-84 photo user-tag" alt="ecd000" title="ecd000" width="84" height="84"
                  src={avatarUrl} />
              </span>
            </Link>
          </div>
          <div className="user-content">
            <div className="user-inner">
              <h4><Link to={`/user/${user.id}`}>{displayName}</Link></h4>
              <span className="badge-span" style={{ backgroundColor: '#0d0e11' }}>Begginer</span>
              <div className="user_follow_4 follow-btn" style={displayName != null ? null : { display: 'none' }}>
                <div className="small_loader loader_2"></div>
                <a href="#" className="following_you button-default" data-rel="7" title="Follow">
                  <span className="follow-value txt-transform-none">Theo dõi</span>
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
  profile: state.profile
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserTag)