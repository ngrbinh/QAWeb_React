import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import defaultAvatar from '../../assets/image/user_avatar_default.png'
import { truncateWithEllipsis } from '../../common/functions'
import { Link, useLocation } from 'react-router-dom'
import { faComment, faCommentAlt, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchPopularQuestions, fetchRecommendQuestions } from '../../redux/ducks/post'
import { } from '@fortawesome/free-regular-svg-icons'

const RelateQuestions = (props) => {
  useEffect(() => {
    if (props.questionId) {
      props.fetchRecommendQuestions(props.questionId)
    }
  })
  const { recommendQuestions } = props
  const questions = recommendQuestions
  return (
    <div className='widget tabs-wrap widget-tabs relate-ques' style={{ borderBottom: 0, marginBottom: 0, marginTop: 0 }}>
      <h2 className="widget-title center-child-cross" style={{ marginBottom: 18, fontWeight: 700 }}>
        <i className="icon-folder">
          <FontAwesomeIcon icon={faQuestionCircle} />
        </i>
        Câu hỏi liên quan
      </h2>
      <div className='widget-wrap' style={{ paddingTop: 0 }}>
        <div className='widget-posts tab-inner-wrap tab-inner-wraptabs-widget-2 active-tab'>
          <div className='user-notifications user-profile-area'>
            <div>
              <ul>
                {
                  questions.map(item => {
                    const { user, body, answerCount, id } = item
                    return (
                      <li key={item.id}>
                        <div className='side-ques-info'>
                          <span className="span-icon">
                            <Link to={`/user/${user.id}`}>
                              <img className="avatar avatar-20 photo" alt={user.displayName}
                                src={user.avatarUrl ? user.avatarUrl : defaultAvatar} />
                            </Link>
                          </span>
                          {/* <div className='side-quef-info-vote'>234</div> */}
                        </div>
                        <div>
                          <h3>
                            <Link to={`/question/${id}`} rel="bookmark">{truncateWithEllipsis(body, 50)}</Link>
                          </h3>
                          <ul className="widget-post-meta">
                            <li>
                              <a className="post-meta-comment center-child-cross" style={{ fontWeight: 600 }}>
                                <i className="icon-comment" style={{ marginRight: 10 }}>
                                  <FontAwesomeIcon icon={faCommentAlt} style={{ fontSize: 15 }} />
                                </i>
                                {`${answerCount} câu trả lời`}
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  popularQuestions: state.post.popularQuestions,
  recommendQuestions: state.post.recommendQuestions
})

const mapDispatchToProps = {
  fetchPopularQuestions,
  fetchRecommendQuestions
}

export default connect(mapStateToProps, mapDispatchToProps)(RelateQuestions)
