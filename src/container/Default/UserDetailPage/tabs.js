import { faBook, faCheck, faCommentAlt, faFlag, faGlobeAsia, faHeart, faMapMarkerAlt, faPhoneAlt, faStar, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Answer from '../../../component/Answer'
import Question from '../../../component/Question'
import UserTagDetail from '../../../component/UserTagDetail'
import defaultAvatar from '../../../assets/image/user_avatar_default.png'

export function About(props) {
  //console.log(props)
  console.log(props.user)
  const { gender, birthDate, phoneNumber, questionCount, answerCount, point,
    aboutMe, address, followingUsers, followedByUsers, voteCount } = props.user
  const date = new Date(birthDate)
  const now = new Date()
  //const url = 'https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-7-29x29.jpg'
  const url = defaultAvatar
  return (
    <div className="user-area-content wpqa-profile">
      <div className="post-section user-area user-area-advanced user-advanced user-area-head mgb0">
        <div className="post-inner">
          <div className="user-content">
            <div className="user-inner">
              <div className="bio_editor">{aboutMe}</div>
              <div className="user-data">
                <ul className="user-data-row">
                  <li className="city-country">
                    <i className="icon-location"><FontAwesomeIcon icon={faMapMarkerAlt} /></i>
                    {address ? address.city : null}
                  </li>
                  <li className="user-phone">
                    <i className="icon-phone"><FontAwesomeIcon icon={faPhoneAlt} /></i>
                    {phoneNumber}
                  </li>
                  <li className="user-gender">
                    <i className="icon-heart"><FontAwesomeIcon icon={faHeart} /></i>
                    {gender ? 'Nam' : 'Nữ'}
                  </li>
                  <li className="user-age">
                    <i className="icon-globe"><FontAwesomeIcon icon={faGlobeAsia} /></i>
                    {now.getFullYear() - date.getFullYear()} tuổi
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
      <div className="user-stats">
        <ul className="row">
          <li className="col col3 user-questions">
            <div><a href="#"></a><i className="icon-book-open"><FontAwesomeIcon icon={faBook} /></i>
              <div><span>{questionCount ? questionCount : 0}</span>
                <h4>Câu hỏi</h4>
              </div>
            </div>
          </li>
          <li className="col col3 user-answers">
            <div><a href="#"></a><i className="icon-comment"><FontAwesomeIcon icon={faCommentAlt} /></i>
              <div><span>{answerCount ? answerCount : 0}</span>
                <h4>Câu trả lời</h4>
              </div>
            </div>
          </li>
          <li className="col col3 user-best-answers">
            <div><a href="#"></a><i className="icon-graduation-cap"><FontAwesomeIcon icon={faCheck} /></i>
              <div><span>{voteCount ? voteCount : 0}</span>
                <h4>Bình chọn</h4>
              </div>
            </div>
          </li>
          <li className="col col3 user-points">
            <div><a href="#"></a><i className="icon-bucket"><FontAwesomeIcon icon={faStar} /></i>
              <div><span>{point}</span>
                <h4>Điểm</h4>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="user-follower">
        <ul className="row">
          <li className="col col6 user-followers">
            <div><a href="#"></a>
              <h4><i className="icon-users"><FontAwesomeIcon icon={faUserFriends} /></i>Người theo dõi</h4>
              <div>
                {
                  followedByUsers.map((item, i) => {
                    return i <= 3
                      ? <img className="avatar avatar-29 photo" title="" width="29" height="29" src={item.avatarUrl ? item.avatarUrl : defaultAvatar} key={item.id} />
                      : null
                  })
                }
                {
                  followedByUsers.length > 3
                    ? <span><span>+ {followedByUsers.length - 4}</span> Người khác</span>
                    : null
                }
                {
                  followedByUsers.length === 0
                    ? <div style={{ height: "29px" }}></div>
                    : null
                }
              </div>
            </div>
          </li>
          <li className="col col6 user-following">
            <div>
              <a href="#"></a>
              <h4><i className="icon-users"><FontAwesomeIcon icon={faUserFriends} /></i>Đang theo dõi</h4>
              <div>
                {
                  followingUsers.map((item, i) => {
                    return i <= 3
                      ? <img className="avatar avatar-29 photo" title="" width="29" height="29" src={item.avatarUrl ? item.avatarUrl : defaultAvatar} key={item.id} />
                      : null
                  })
                }
                {
                  followingUsers.length > 3
                    ? <span><span>+ {followingUsers.length - 4}</span> Người khác</span>
                    : null
                }
                {
                  followingUsers.length < 1
                    ? <div style={{ height: "29px" }}></div>
                    : null
                }
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export function Questions(props) {
  const { id, questions } = props
  return questions.length !== 0 ?
    (<section>
      <h2 className="screen-reader-text">Questions</h2>
      <div className="post-articles question-articles">
        {questions.map(item => {
          return <Question question={item} shorten={true} />
        })}
      </div>
      <div className='clearfix'></div>
      {/* <div className="pagination-wrap pagination-question">
        <div className="pagination-nav posts-load-more">
          <span className="load_span"><span className="loader_2"></span></span>
          <div className="load-more">
            <a href="#">Xem thêm</a>
          </div>
        </div>
      </div> */}
    </section>)
    : (<div className="alert-message warning">
      <i className="icon-flag"><FontAwesomeIcon icon={faFlag} /></i>
      <p>Chưa có câu hỏi nào</p>
    </div>)
}

export function Answers(props) {
  const { id, answers } = props
  return answers.length !== 0 ?
    (<div className='question-adv-comments question-has-comments clearfix'>
      <div id='comments' className='post-section comments-popup-share'>
        <div className='post-inner'>
          <ol className='commentlist clearfix'>
            {answers.map(item => <Answer answer={item} showQuestionLink={true} />)}
          </ol>
          <div className='clearfix'></div>
        </div>
      </div>
    </div>)
    : (<div className="alert-message warning">
      <i className="icon-flag"><FontAwesomeIcon icon={faFlag} /></i>
      <p>Chưa có câu trả lời nào</p>
    </div>)
}

export function Followers(props) {
  const { id, users } = props
  return users.length !== 0 ?
    (
      <div className='section-page-div user-section user-section-columns row user-not-normal'>
        {
          users.map(item => <UserTagDetail user={item} key={item.id} />)
        }
      </div>
    )
    : (<div className="alert-message warning">
      <i className="icon-flag"><FontAwesomeIcon icon={faFlag} /></i>
      <p>Chưa có người theo dõi nào</p>
    </div>)
}

export function Following(props) {
  const { id, users } = props
  console.log(id)

  return users.length !== 0 ?
    (
      <div className='section-page-div user-section user-section-columns row user-not-normal'>
        {
          users.map(item => <UserTagDetail user={item} key={item.id} />)
        }
      </div>
    )
    : (<div className="alert-message warning">
      <i className="icon-flag"><FontAwesomeIcon icon={faFlag} /></i>
      <p>Chưa theo dõi ai khác</p>
    </div>)
}