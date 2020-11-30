import { faCaretDown, faCaretUp, faCommentAlt, faEye, faLock, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { truncateWithEllipsis } from '../../common/functions'
import { vote } from '../../redux/ducks/user'
import defaultAvatar from '../../assets/image/user_avatar_default.png'
import { addView, deletePost } from '../../redux/ducks/post'
import { Modal, Button } from 'antd'

function Question(props) {
  const [deleteModal, setDeletModal] = useState(false)
  const [resultModal, setResultModal] = useState(false)
  const isInitialMount = useRef(true)
  const { shorten, scrollToRef, modifiable, vote, loadingVote, addView, deletingIds, deleteMessage, deletePost } = props
  let history = useHistory()
  var question = props.question
  if (Object.keys(question).length === 0) {
    question = {
      user: {},
      body: ""
    }
  }
  const { user, creationDate, body, voteCount, subjectTypeName, gradeTypeName, answerCount, viewCount, id, imgUrl } = question
  const handleVote = voteType => {
    vote(id, voteType)
  }
  const shortBody = shorten ? truncateWithEllipsis(body, 250) : body;
  const formatDate = new Date(creationDate)
  const dateString = formatDate.getDate() + '/' + (formatDate.getMonth() + 1) + '/' + formatDate.getFullYear()
  const badges = user.badges && user.badges.length !== 0 ? user.badges : [{ typeName: "", typeColor: "" }]
  const parse = require('html-react-parser')
  const handleAddView = () => {
    addView(id)
  }
  const cancelDelete = () => {
    setDeletModal(false)
  }
  const confirmDelete = () => {
    deletePost(id)
  }
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (deleteModal) {
        setDeletModal(false)
      }
      setResultModal(true)
    }
  }, [deleteMessage])
  const handleOk = () => {
    if (deleteMessage === "OK") {
      history.push("/")
      setResultModal(false)
    } else {
      setResultModal(false)
    }
  }
  return (
    <article className='question-articles article-post clearfix question-answer-before'>
      <Modal
        title="Xóa câu hỏi"
        visible={deleteModal}
        footer={[
          <Button key={'cancel'} onClick={cancelDelete}>Hủy</Button>,
          <Button key={'confirm'} type='primary' danger onClick={confirmDelete}
            loading={deletingIds.includes(id)}
          >
            Xóa
          </Button>
        ]}
      //afterClose={() => setResultModal(true)}
      >
        Bạn có chắc muốn xóa câu hỏi này?
      </Modal>
      <Modal
        title="Xóa câu hỏi"
        visible={resultModal}
        footer={[
          <Button key={'ok'} type='primary' onClick={handleOk}>
            OK
          </Button>
        ]}
      >
        {deleteMessage === "OK"
          ? "Xóa thành công"
          : deleteMessage
        }
      </Modal>
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
                  <span className="badge-span" style={{ backgroundColor: `#${badges[0].typeColor}` }}>{badges[0].typeName}</span>
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
                  <a className="wpqa_vote question_vote_up vote_allow" title="Vote" onClick={() => handleVote(true)}>
                    <i className="icon-up-dir"><FontAwesomeIcon icon={faCaretUp} /></i>
                  </a>
                </li>
                <li className="vote_result" style={{ display: loadingVote.includes(id) ? "none" : "list-item" }}>{voteCount}</li>
                <li className="li_loader" style={{ display: loadingVote.includes(id) ? "inline-block" : "none" }}>
                  <span className="loader_3 fa-spin"></span>
                </li>
                <li className="question-vote-down">
                  <a className="wpqa_vote question_vote_down vote_allow" title="downVote" onClick={() => handleVote(false)}>
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
                  <Link className="meta-answer meta-answer-a" to={`/question/${id}`} onClick={handleAddView}>Chi tiết</Link>
                  :
                  <a className='meta-answer meta-answer-a' onClick={scrollToRef}>Trả lời</a>
              }
            </footer>
          </div>
          <div className='clearfix'></div>
        </div>
        {modifiable
          ? <div className="question-bottom">
            <ul className="question-link-list">
              <li>
                <Link to={`/question/${id}/edit`}><i><FontAwesomeIcon icon={faPencilAlt} /></i>Chỉnh sửa</Link>
              </li>
              <li>
                <a onClick={() => setDeletModal(true)}><i><FontAwesomeIcon icon={faTrash} /></i>Xóa</a>
              </li>
              <li>
                <a href="#"><i><FontAwesomeIcon icon={faLock} /></i>Đóng bài viết</a>
              </li>
            </ul>
            <div className="clearfix"></div>
          </div> : null}
      </div>
    </article>
  )
}

const mapStateToProps = (state) => ({
  loadingVote: state.user.loadingVote,
  deletingIds: state.post.deletingIds,
  deleteMessage: state.post.deleteMessage
})

const mapDispatchToProps = {
  vote,
  addView,
  deletePost
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)
