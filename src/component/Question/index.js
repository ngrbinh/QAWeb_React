import { faCaretDown, faCaretUp, faCommentAlt, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { truncateWithEllipsis } from '../../common/functions'

export default function Question(props) {
  const { user, createdDate, body, voteCount, subject, grade, answerCount, viewCount,id } = props.question
  const shortBody = truncateWithEllipsis(body,250);
  const formatDate = new Date(createdDate)
  const dateString = formatDate.getDate() + '-' + (formatDate.getMonth() + 1) + '-' + formatDate.getFullYear()
  return (
    <article className='question-articles article-post clearfix question-answer-before'>
      <div className='single-inner-content'>
        <div className='question-inner'>
          <div className='question-top-bar'>
            <div className='question-image-vote'>
              <div className='author-image mgb0'>
                <a href="#">
                  <span className='author-image-span'>
                    <img className='avatar' width='42px' height='42px' src={user.avatarUrl} />
                  </span>
                </a>
              </div>
            </div>
            <div className='question-content question-content-first'>
              <header className='article-header'>
                <div className='question-header'>
                  <a className='post-author'>{user.name}</a>
                  <span className="badge-span" style={{ backgroundColor: '#ffbf00' }}>Pundit</span>
                  <div className='post-meta'>
                    <span className="post-date">Ngày đăng<span className="date-separator">: </span>
                      <a href="#" itemprop="url">
                        <time className="entry-date published"> {dateString}</time>
                      </a>
                    </span>
                    <span >Môn học<span className="date-separator">: </span>
                      <a href="#" itemprop="url">
                        {subject}
                      </a>
                    </span>
                    <span>Cấp bậc<span className="date-separator">: </span>
                      <a href="#" itemprop="url">
                        {grade}
                      </a>
                    </span>
                  </div>
                </div>
              </header>

            </div>
          </div>
          <div className="question-not-mobile question-image-vote question-vote-sticky">
            <div className="">
              <ul className="question-vote">
                <li className="question-vote-up">
                  <a href="#" id="question_vote_up-118" data-type="question" data-vote-type="up" className="wpqa_vote question_vote_up vote_allow" title="Like">
                    <i className="icon-up-dir"><FontAwesomeIcon icon={faCaretUp} /></i>
                  </a>
                </li>
                <li className="vote_result" style={{ display: 'list-item' }}>{voteCount}</li>
                <li className="li_loader">
                  <span className="loader_3 fa-spin"></span>
                </li>
                <li className="question-vote-down">
                  <a href="#" id="question_vote_down-118" data-type="question" data-vote-type="down" className="wpqa_vote question_vote_down vote_allow" title="Dislike">
                    <i className="icon-down-dir"><FontAwesomeIcon icon={faCaretDown} /></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="question-content question-content-second">
            <div className="post-wrap-content">
              <div className="question-content-text">
                <div className="all_not_signle_post_content">
                  <p className="excerpt-question">{shortBody}</p>
                </div>
              </div>
            </div>
            <div className="wpqa_error"></div>
            <div className="wpqa_success"></div>
            <footer className="question-footer">
              <ul className="footer-meta">
                <li className="best-answer-meta">
                  <i className="icon-comment"><FontAwesomeIcon icon={faCommentAlt} /></i>
                  <span className="question-span">{answerCount} câu trả lời</span>
                </li>
                <li className="view-stats-meta">
                  <i className="icon-eye"><FontAwesomeIcon icon={faEye} /></i>
                  <span className="question-span"> {viewCount} lượt xem</span>
                </li>
              </ul>
              <Link className="meta-answer meta-answer-a" to={`/question/${id}`} >Chi tiết</Link>
            </footer>
          </div>
          <div className='clearfix'></div>
        </div>
      </div>
    </article>
  )
}