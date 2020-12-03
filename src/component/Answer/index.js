import { faCaretDown, faCaretUp, faLock, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { formatAMPM } from '../../common/functions'
import defaultAvatar from '../../assets/image/user_avatar_default.png'
import { vote } from '../../redux/ducks/user'
import { connect } from 'react-redux'
import { Modal, Button } from 'antd'
import { deletePost } from '../../redux/ducks/post'

function Answer(props) {
  const [deleteModal, setDeleteModal] = useState(false)
  const [resultModal, setResultModal] = useState(false)
  const [deleteClicked, setDeleteClicked] = useState(false)
  const isInitialMount = useRef(true)
  let history = useHistory()
  const { showQuestionLink, vote, loadingVote, modifiable, deletePost, deletingIds, deleteMessage } = props
  const { id, user, creationDate, body, voteCount, parentPostId, imgUrl } = props.answer
  const formatDate = new Date(creationDate)
  const dateString = formatDate.getDate() + '/' + (formatDate.getMonth() + 1) + '/' + formatDate.getFullYear()
  const parse = require('html-react-parser')
  const badges = user.badges && user.badges.length !== 0 ? user.badges : [{ typeName: "", typeColor: "" }]
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (deleteClicked) {
        if (deleteModal) {
          setDeleteModal(false)
        }
        setResultModal(true)
      }
    }
  }, [deleteMessage])
  const handleVote = voteType => {
    vote(id, voteType)
  }
  const confirmDelete = () => {
    deletePost(id)
    setDeleteClicked(true)
  }
  const cancelDelete = () => {
    setDeleteModal(false)
  }
  const handleOk = () => {
    if (deleteMessage === "OK") {
      history.go(0)
      setResultModal(false)
    } else {
      setResultModal(false)
    }
  }
  return (
    <li className='comment byuser comment-author-marko even thread-even depth-1' id={'li-ans' + id}>
      <Modal
        title="Xóa câu trả lời"
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
        Bạn có chắc muốn xóa câu trả lời này?
      </Modal>
      <Modal
        title="Xóa câu trả lời"
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
      <div className='comment-body clearfix'>
        <div className='comment-text'>
          <div className='author-image'>
            <Link to={`/user/${user.id}`}>
              <span className='author-image-span'>
                <img className='avatar' style={{ width: 42, height: 42, objectFit: 'cover' }}
                  src={user.avatarUrl ? user.avatarUrl : defaultAvatar} />
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
            <div className='clearfix'></div>
            <div className='clearfix'></div>
            <div className='wpqa_error'></div>
            <ul className="answer-panel question-vote answer-vote answer-vote-dislike">
              <li>
                <a className="wpqa_vote comment_vote_up vote_allow" title="Like" onClick={() => handleVote(true)}>
                  <i className="icon-up-dir"><FontAwesomeIcon icon={faCaretUp} /></i>
                </a>
              </li>
              <li className="vote_result" style={{ display: loadingVote.includes(id) ? "none" : "list-item" }}>{voteCount}</li>
              <li className="li_loader" style={{ display: loadingVote.includes(id) ? "inline-block" : "none" }}>
                <span className="loader_3 fa-spin"></span>
              </li>
              <li className="dislike_answers">
                <a className="wpqa_vote comment_vote_down vote_allow" title="Dislike" onClick={() => handleVote(false)}>
                  <i className="icon-down-dir"><FontAwesomeIcon icon={faCaretDown} /></i>
                </a>
              </li>
            </ul>
            {
              modifiable
                ? <ul className="comment-reply comment-reply-main">
                  <li>
                    <Link to="/">
                      <i><FontAwesomeIcon icon={faPencilAlt} /></i>Chỉnh sửa
                    </Link>
                  </li>
                  <li>
                    <a onClick={() => setDeleteModal(true)}>
                      <i><FontAwesomeIcon icon={faTrash} /></i>Xóa
                    </a>
                  </li>
                  <li>
                    <a >
                      <i><FontAwesomeIcon icon={faLock} /></i>Đóng bài viết
                    </a>
                  </li>
                  <li className="clearfix last-item-answers"></li>
                </ul>
                : null
            }
            {
              showQuestionLink ?
                <Link className='go-to-question_btn' to={`/question/${parentPostId}`}>Câu hỏi</Link>
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

const mapStateToProps = (state) => ({
  loadingVote: state.user.loadingVote,
  deletingIds: state.post.deletingIds,
  deleteMessage: state.post.deleteMessage
})

const mapDispatchToProps = {
  vote,
  deletePost
}

export default connect(mapStateToProps, mapDispatchToProps)(Answer)