import { faComment, faLeaf, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeModal, toggleModal } from '../../redux/ducks/modal'
import { fetchMeta } from '../../redux/ducks/meta'
import { fetchTopUser } from '../../redux/ducks/user'
import AskPanel from '../Modal/AskPanel'
import LoginPanel from '../Modal/LoginPanel'
import { Link, useLocation } from 'react-router-dom'
import defaultAvatar from '../../assets/image/user_avatar_default.png'
import RelateQuestions from './RelateQuestions'

class SideInfoBar extends Component {
  showModal = (panel) => {
    const { changeModal, toggleModal } = this.props
    changeModal(panel)
    toggleModal()
  }
  handleAddQuesClick = () => {
    if (this.props.token) {
      this.showModal(AskPanel)
    } else {
      this.showModal(LoginPanel)
    }
  }
  componentDidMount() {
    this.props.fetchMeta()
    this.props.fetchTopUser()
  }
  render() {
    const path = this.props.location.pathname
    var regex = /\/question\/\d+/
    var questionId = null
    if (regex.test(path)) {
      questionId = this.props.match.params.id
    }
    const { topUsers } = this.props
    const { viewCount, userCount, answerCount, questionCount } = this.props.meta
    return (
      <aside id='sideInfoBar' className='sidebar sidebar-width float_l fixed-sidebar .side-info-bar'>
        <div id='empty'></div>
        <div className='theiaStickySidebar side-bar'>
          <h3 className="screen-reader-text">Sidebar</h3>
          <div className='inner-sidebar' id='infoBarContent'>
            <div className="widget widget_ask">
              <a target="_self" className="button-default wpqa-question" onClick={this.handleAddQuesClick}>Đặt câu hỏi</a>
            </div>
            <section id="stats-widget-2" className="widget-no-divider widget stats-widget">
              <h3 className="screen-reader-text">Số liệu</h3>
              <div className="widget-wrap">
                <ul className="stats-inner">
                  <li className="stats-questions">
                    <div>
                      <span className="stats-text">Câu hỏi</span>
                      <span className="stats-value">{questionCount}</span>
                    </div>
                  </li>
                  <li className="stats-answers">
                    <div>
                      <span className="stats-text">Câu trả lời</span>
                      <span className="stats-value">{answerCount}</span>
                    </div>
                  </li>
                  <li className="stats-best_answers">
                    <div>
                      <span className="stats-text">Số lượt xem</span>
                      <span className="stats-value">{viewCount}</span>
                    </div>
                  </li>
                  <li className="stats-users">
                    <div>
                      <span className="stats-text">Người dùng</span>
                      <span className="stats-value">{userCount}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
            {
              questionId
                ? <RelateQuestions questionId={questionId} />
                : null
            }
            <section className='widget users-widget top-user' style={{ marginBottom: '0px' }}>
              <h2 className="widget-title center-child-cross" style={{ marginBottom: 25, fontWeight: 700 }}>
                <i className="icon-folder">
                  <FontAwesomeIcon icon={faUserFriends} />
                </i>Thành viên hàng đầu
              </h2>
              <div className='widget-wrap'>
                <div className='user-section user-section-small row user-not-normal'>
                  {
                    topUsers.map(item => {
                      return (
                        <div key={item.id} className='col col12'>
                          <div className="post-section user-area user-area-small">
                            <div className="post-inner">
                              <div className="author-image">
                                <Link to={`/user/${item.id}`}>
                                  <span className="author-image-span">
                                    <img className="avatar photo avatar-42" alt={item.displayName}
                                      src={item.avatarUrl ? item.avatarUrl : defaultAvatar} />
                                  </span>
                                </Link>
                              </div>
                              <div className="user-content">
                                <div className="user-inner">
                                  <h4><Link to={`/user/${item.id}`}>{item.displayName}</Link></h4>
                                  <div className="user-data">
                                    <ul>
                                      <li className="user-questions"><a>{`${item.followCount} theo dõi`}</a></li>
                                      <li className="user-points"><a>{`${item.point} điểm`}</a></li>
                                    </ul>
                                  </div>
                                  <span className="badge-span" style={{ backgroundColor: `#${item.badges[0].typeColor}` }}>
                                    {item.badges[0].typeName}
                                  </span>
                                </div>
                              </div>
                              <div className="clearfix"></div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </section>
          </div>
        </div>
      </aside>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.account.token,
  meta: state.meta,
  topUsers: state.user.topUsers,
})

const mapDispatchToProps = {
  changeModal,
  toggleModal,
  fetchMeta,
  fetchTopUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(SideInfoBar)
