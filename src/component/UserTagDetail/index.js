import { faBook, faCommentAlt, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function UserTagDetail(props) {
  const { name, avatarUrl, answerCount, questionCount, point, id } = props.user
  return (
    <div className="col col6">
      <div className="post-section user-area user-area-columns">
        <div className="post-inner" >
          <div className="author-image author-image-70">
            <Link to={`/user/${id}`}>
              <span className="author-image-span">
                <img className="avatar avatar-70 photo" alt={name} title={name} width="70" height="70"
                  src={avatarUrl} />
              </span>
            </Link>
          </div>
          <div className="user-content">
            <div className="user-inner">
              <div className="user-data-columns">
                <h4><Link to={`/user/${id}`}>{name}</Link><span className="verified_user tooltip-n" original-title="Verified"><i
                  className="icon-check"></i></span></h4><span className="badge-span"
                    style={{ backgroundColor: '#ffbf00' }}>Pundit</span>
              </div>
            </div>
          </div>
          <div className="user-columns-data">
            <ul>
              <li className="user-columns-questions">
                <a href="#">
                  <i className="icon-book-open"><FontAwesomeIcon icon={faBook} /></i>{questionCount + ' '} Questions
                </a>
              </li>
              <li className="user-columns-answers">
                <a href="#">
                  <i className="icon-comment"><FontAwesomeIcon icon={faCommentAlt} /></i>{answerCount + ' '} Answers
                </a>
              </li>
              <li className="user-columns-points">
                <a href="#">
                  <i className="icon-bucket"><FontAwesomeIcon icon={faStar}/></i>123 Points
                </a>
              </li>
            </ul>
          </div>
          <div className="user-follow-profile">
            <div className="user_follow_2">
              <div className="small_loader loader_2 user_follow_loader"></div><a href="#" className="following_you" data-rel="1"
                title="Follow"><span className="follow-value">Follow</span></a>
            </div>
            <Link to={`/user/${id}`}>View Profile</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserTagDetail)
