import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { formatAMPM } from '../../common/functions'
import defaultAvatar from '../../assets/image/user_avatar_default.png'

export default function Answer(props) {
  const { showQuestionLink } = props
  const { id, user, creationDate, body, voteCount } = props.answer
  const formatDate = new Date(creationDate)
  const dateString = formatDate.getDate() + '/' + (formatDate.getMonth() + 1) + '/' + formatDate.getFullYear()
  const parse = require('html-react-parser')
  const badges = user.badges && user.badges.length !== 0 ? user.badges : [{typeName:"",typeColor:""}]
  console.log(badges)
  return (
    <li className='comment byuser comment-author-marko even thread-even depth-1' id={'li-ans' + id}>
      <div className='comment-body clearfix'>
        <div className='comment-text'>
          <div className='author-image'>
            <Link to={`/user/${user.id}`}>
              <span className='author-image-span'>
                <img className='avatar' width='42px' height='42px' src={user.avatarUrl ? user.avatarUrl : defaultAvatar} />
              </span>
            </Link>
          </div>
          <div className="author clearfix">
            <div className="comment-meta">
              <div className="comment-author">
                <span itemProp="author">
                  <Link itemProp="url" to={`/user/${user.id}`}>
                    <span itemProp="name">{user.displayName}</span>
                  </Link>
                </span>
                <span className="badge-span" style={{ backgroundColor: `#${badges[0].typeColor}` }}>{badges[0].typeName}</span>
              </div>
              <a href="#" className="comment-date" itemProp="url">
                <span className="queswer_hide" dateTime={creationDate}>{creationDate}</span>
                Đã trả lời ngày {dateString + " "} vào lúc {formatAMPM(formatDate)}
              </a>
            </div>
          </div>
          <div className='text'>
            <div>
              {parse(body)}
            </div>
            <div className='clearfix'></div>
            <div className='clearfix'></div>
            <div className='wpqa_error'></div>
            <ul className="question-vote answer-vote answer-vote-dislike">
              <li>
                <a href="#" id="comment_vote_up-64" className="wpqa_vote comment_vote_up vote_allow" title="Like">
                  <i className="icon-up-dir"><FontAwesomeIcon icon={faCaretUp} /></i>
                </a>
              </li>
              <li className="vote_result" itemProp="upvoteCount">{voteCount}</li>
              <li className="li_loader">
                <span className="loader_3 fa-spin"></span>
              </li>
              <li className="dislike_answers"><a href="#" id="comment_vote_down-64" className="wpqa_vote comment_vote_down vote_allow" title="Dislike">
                <i className="icon-down-dir"><FontAwesomeIcon icon={faCaretDown} /></i>
              </a>
              </li>
            </ul>
            {
              showQuestionLink ?
                <a className='go-to-question_btn'>Câu hỏi</a>
                :
                null
            }
          </div>
          <div className='clearfix'></div>
        </div>
      </div>
    </li>
  )
}
