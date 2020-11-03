import React from 'react'
import { connect } from 'react-redux'

function UserTag(props) {
  const { user,profile} = props
  const {name, avatarUrl} = user
  return (
    <div class="col col4 user-tag">
      <div class="post-section user-area user-area-small_grid">
        <div class="post-inner">
          <div class="author-image author-image-84">
            <a href="#">
              <span class="author-image-span">
                <img class="avatar avatar-84 photo" alt="ecd000" title="ecd000" width="84" height="84"
                  src={avatarUrl} />
              </span>
            </a>
          </div>
          <div class="user-content">
            <div class="user-inner">
              <h4><a href="#">{name}</a></h4>
              <span class="badge-span" style={{ backgroundColor:'#0d0e11'}}>Begginer</span>
              <div class="user_follow_4 follow-btn" style={profile.userName!=null?null:{display:'none'}}>
                <div class="small_loader loader_2"></div>
                <a href="#" class="following_you button-default" data-rel="7" title="Follow">
                  <span class="follow-value">Follow</span>
                </a>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
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

export default connect(mapStateToProps,mapDispatchToProps)(UserTag)