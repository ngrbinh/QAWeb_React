import { faCaretDown, faCaretUp, faCommentAlt, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { truncateWithEllipsis } from '../../common/functions'
import defaultAvatar from '../../assets/image/user_avatar_default.png'
export default function Question(props) {
  // useEffect(() => {
  //   var element = document.getElementsByClassName("content-text");
  //   console.log(element[0].textContent)
  //   let mathJaxScript = document.createElement('script')
  //   mathJaxScript.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML"
  //   mathJaxScript.async = true
  //   document.body.appendChild(mathJaxScript)
  //   return () => document.body.removeChild(mathJaxScript)
  // }, [])
  const { shorten, scrollToRef } = props
  var question = props.question
  if (Object.keys(question).length === 0) {
    question = {
      user: {},
      body: ""
    }
  }
  const { user, creationDate, body, voteCount, subjectTypeName, gradeTypeName, answerCount, viewCount, id, imgUrl } = question
  const shortBody = shorten ? truncateWithEllipsis(body, 250) : body;
  const formatDate = new Date(creationDate)
  const dateString = formatDate.getDate() + '/' + (formatDate.getMonth() + 1) + '/' + formatDate.getFullYear()
  const parse = require('html-react-parser')
  return (
    <article className='question-articles article-post clearfix question-answer-before'>
      <div className='single-inner-content'>
        <div className='question-inner'>
          <div className='question-top-bar'>
            <div className='question-image-vote'>
              <div className='author-image mgb0'>
                <Link to={`/user/${user.id}`}>
                  <span className='author-image-span'>
                    <img className='avatar' src={user.avatarUrl ? user.avatarUrl : defaultAvatar} className='question' />
                  </span>
                </Link>
              </div>
            </div>
            <div className='question-content question-content-first'>
              <header className='article-header'>
                <div className='question-header'>
                  <Link className='post-author' to={`/user/${user.id}`}>{user.displayName}</Link>
                  <span className="badge-span" style={{ backgroundColor: '#ffbf00' }}>Pundit</span>
                  <div className='post-meta'>
                    <span className="post-date">Ngày đăng<span className="date-separator">: </span>
                      <a href="#" itemProp="url">
                        <time className="entry-date published"> {dateString}</time>
                      </a>
                    </span>
                    <span >Môn học<span className="date-separator">: </span>
                      <a href="#" itemProp="url">
                        {subjectTypeName}
                      </a>
                    </span>
                    <span>Cấp bậc<span className="date-separator">: </span>
                      <a href="#" itemProp="url">
                        {gradeTypeName}
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
                  {shorten ?
                    <p className="excerpt-question">{shortBody}</p>
                    : <div className='content-text'>
                      {parse(shortBody)}
                    </div>
                  }
                  {
                    imgUrl == null ?
                      null
                      : <React.Fragment>
                        <div className="featured_image_question">
                          <a href={imgUrl}>
                            <img alt="" width="260" height="185" src={imgUrl} />
                          </a>
                        </div>
                        <div className='clearfix'></div>
                      </React.Fragment>
                  }
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
              {
                shorten ?
                  <Link className="meta-answer meta-answer-a" to={`/question/${id}`} >Chi tiết</Link>
                  :
                  <a className='meta-answer meta-answer-a' onClick={scrollToRef}>Trả lời</a>
              }
            </footer>
          </div>
          <div className='clearfix'></div>
        </div>
      </div>
    </article>
  )
}
