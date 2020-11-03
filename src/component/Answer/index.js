import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { formatAMPM } from '../../common/functions'
export default function Answer(props) {
  const { showQuestionLink } = props
  const { id, user, createdDate, body, voteCount } = props.answer
  const formatDate = new Date(createdDate)
  const dateString = formatDate.getDate() + '/' + (formatDate.getMonth() + 1) + '/' + formatDate.getFullYear()
  const parse = require('html-react-parser')
  return (
    <li className='comment byuser comment-author-marko even thread-even depth-1' id={'li-ans' + id}>
      <div className='comment-body clearfix'>
        <div className='comment-text'>
          <div className='author-image'>
            <Link to={`/user/${user.id}`}>
              <span className='author-image-span'>
                <img className='avatar' width='42px' height='42px' src={user.avatarUrl} />
              </span>
            </Link>
          </div>
          <div class="author clearfix">
            <div class="comment-meta">
              <div class="comment-author">
                <span itemprop="author">
                  <Link itemprop="url" to={`/user/${user.id}`}>
                    <span itemprop="name">{user.name}</span>
                  </Link>
                </span>
                <span class="badge-span" style={{ backgroundColor: '#6b3de4' }}>Professional</span>
              </div>
              <a href="#" class="comment-date" itemprop="url">
                <span class="queswer_hide" datetime={createdDate}>{createdDate}</span>
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
            <ul class="question-vote answer-vote answer-vote-dislike">
              <li>
                <a href="#" id="comment_vote_up-64" class="wpqa_vote comment_vote_up vote_allow" title="Like">
                  <i class="icon-up-dir"><FontAwesomeIcon icon={faCaretUp} /></i>
                </a>
              </li>
              <li class="vote_result" itemprop="upvoteCount">{voteCount}</li>
              <li class="li_loader">
                <span class="loader_3 fa-spin"></span>
              </li>
              <li class="dislike_answers"><a href="#" id="comment_vote_down-64" class="wpqa_vote comment_vote_down vote_allow" title="Dislike">
                <i class="icon-down-dir"><FontAwesomeIcon icon={faCaretDown} /></i>
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
